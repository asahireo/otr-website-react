<?php
/**
 * OTR API Configuration
 * MoneyGram/OnePay API credentials
 */

// Prevent direct access
if (!defined('OTR_API')) {
    die('Direct access not permitted');
}

// API Configuration
define('ONEPAY_BASE_URL', 'https://aquilaconnect.onepay.com.my/');
define('ONEPAY_AGENT_ID', 'OTRHost'); // Provisional: using Username as AgentId
define('ONEPAY_USERNAME', 'OTRHost');
define('ONEPAY_PASSWORD', 'F!34MD$^2Z!3B&52');

// Enable error logging (disable in production)
define('DEBUG_MODE', true);

// Allowed origins for CORS (add your domain)
$allowed_origins = [
    'http://localhost',
    'http://127.0.0.1',
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'https://yourdomain.com'
];
