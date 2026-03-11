<?php
/**
 * OTR API Router
 * Routes /Transfer/GetFeeLookup to the correct PHP file
 */

// Get the request URI
$requestUri = $_SERVER['REQUEST_URI'];

// Route to appropriate handler
if (strpos($requestUri, '/Transfer/GetFeeLookup') !== false || 
    strpos($requestUri, '/api/GetFeeLookup') !== false) {
    require_once __DIR__ . '/GetFeeLookup.php';
    exit();
}

// Default response for unknown routes
header('Content-Type: application/json');
http_response_code(404);
echo json_encode([
    'success' => false,
    'message' => 'Endpoint not found',
    'available_endpoints' => [
        '/api/GetFeeLookup' => 'POST - Get fee lookup for transfers',
        '/Transfer/GetFeeLookup' => 'POST - Get fee lookup (legacy route)'
    ]
]);
