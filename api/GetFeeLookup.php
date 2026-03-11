<?php
/**
 * OTR Fee Lookup API
 * Connects to OnePay/MoneyGram to get live rates and fees
 */

// Define access constant
define('OTR_API', true);

// Include config
require_once __DIR__ . '/config.php';

// Set headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');  // Change to your domain in production
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// Get POST data
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Validate input
if (!$data) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid JSON input']);
    exit();
}

$codeCurrency = $data['CodeCurrency'] ?? '';
$amount = floatval($data['Amount'] ?? 0);
$payMode = $data['PayMode'] ?? '';

// Validate required fields
if (empty($codeCurrency)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'CodeCurrency is required']);
    exit();
}

if ($amount <= 0) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Amount must be greater than 0']);
    exit();
}

if (empty($payMode)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'PayMode is required']);
    exit();
}

// Call the OnePay API
$result = callOnePayFeeLookup($codeCurrency, $amount, $payMode);

echo json_encode($result);

/**
 * Call OnePay Fee Lookup API
 */
function callOnePayFeeLookup($codeCurrency, $amount, $payMode) {
    // Require AgentId before attempting a lookup
    if (empty(ONEPAY_AGENT_ID)) {
        return ['success' => false, 'message' => 'AgentId is not configured. Please set ONEPAY_AGENT_ID in api/config.php'];
    }

    // Split CodeCurrency (e.g., BGD-BDT) into country and currency
    $parts = explode('-', $codeCurrency);
    if (count($parts) !== 2) {
        return ['success' => false, 'message' => 'Invalid CodeCurrency format. Expected e.g. BGD-BDT'];
    }
    [$toCountry, $toCurrency] = $parts;

    // Get Bearer token from OnePay
    $tokenResult = getOnePayToken();
    if (!$tokenResult['success']) {
        return $tokenResult;
    }
    $token = $tokenResult['token'];

    // Build query params for GET /api/otrapi/GetFeeLookUp
    $query = http_build_query([
        'request.agentId' => ONEPAY_AGENT_ID,
        'request.sendingAmount' => $amount,
        'request.fromCountry' => 'MYS',
        'request.toCountry' => $toCountry,
        'request.fromCurrency' => 'MYR',
        'request.toCurrency' => $toCurrency,
        'request.payMode' => $payMode
    ]);

    $apiUrl = ONEPAY_BASE_URL . 'api/otrapi/GetFeeLookUp?' . $query;

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $apiUrl,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPGET => true,
        CURLOPT_HTTPHEADER => [
            'Accept: application/json',
            'Authorization: Bearer ' . $token
        ],
        CURLOPT_TIMEOUT => 30,
        CURLOPT_SSL_VERIFYPEER => true
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    // curl_close($ch); // Deprecated in PHP 8.0+, has no effect via this wrapper in 8.5

    if ($error) {
        if (DEBUG_MODE) {
            return ['success' => false, 'message' => 'API Error: ' . $error];
        }
        return ['success' => false, 'message' => 'Unable to connect to payment service'];
    }

    $responseData = json_decode($response, true);

    if ($httpCode !== 200) {
        if (DEBUG_MODE) {
            return ['success' => false, 'message' => 'API returned HTTP ' . $httpCode, 'debug' => $responseData];
        }
        return ['success' => false, 'message' => 'Service temporarily unavailable'];
    }

    if (!$responseData) {
        return ['success' => false, 'message' => 'Invalid response from payment service'];
    }

    // Normalize expected fields
    $data = $responseData['data'] ?? $responseData;

    if (isset($data['validExchangeRate']) || isset($data['totalSendFees'])) {
        return [
            'success' => true,
            'data' => $data
        ];
    }

    // If the API already signals success, pass through
    if (isset($responseData['success']) && $responseData['success']) {
        return $responseData;
    }

    return ['success' => false, 'message' => $responseData['message'] ?? 'Unexpected response from payment service', 'debug' => DEBUG_MODE ? $responseData : null];
}

/**
 * Get Bearer token from OnePay /api/otrapi/GetToken
 */
function getOnePayToken() {
    $tokenUrl = ONEPAY_BASE_URL . 'api/otrapi/GetToken';
    $payload = json_encode([
        'AgentId' => ONEPAY_AGENT_ID,
        'Username' => ONEPAY_USERNAME,
        'Password' => ONEPAY_PASSWORD
    ]);

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $tokenUrl,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $payload,
        CURLOPT_HTTPHEADER => [
            'Content-Type: application/json',
            'Accept: application/json'
        ],
        CURLOPT_TIMEOUT => 30,
        CURLOPT_SSL_VERIFYPEER => true
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    // curl_close($ch); // Deprecated in PHP 8.0+, has no effect via this wrapper in 8.5

    if ($error) {
        return ['success' => false, 'message' => 'Token request error: ' . $error];
    }

    $responseData = json_decode($response, true);
    if ($httpCode !== 200) {
        return ['success' => false, 'message' => 'Token endpoint returned HTTP ' . $httpCode, 'debug' => DEBUG_MODE ? $responseData : null];
    }

    if (isset($responseData['ErrorMessage'])) {
        return ['success' => false, 'message' => $responseData['ErrorMessage']];
    }

    $token = $responseData['token'] ?? $responseData['Token'] ?? $responseData['access_token'] ?? null;

    // If the API returns a raw string token instead of an object
    if (!$token && is_string($responseData)) {
        $token = $responseData;
    }

    if (!$token) {
        return ['success' => false, 'message' => 'Token not returned by authentication service', 'debug' => DEBUG_MODE ? $responseData : null];
    }

    return ['success' => true, 'token' => $token];
}
