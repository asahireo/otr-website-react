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
define('ONEPAY_AGENT_ID', ''); // TODO: set the AgentId provided by OnePay
define('ONEPAY_USERNAME', 'OTRHost');
define('ONEPAY_PASSWORD', 'F!34MD$^2Z!3B&52');

// Enable error logging (disable in production)
define('DEBUG_MODE', true);

// Allowed origins for CORS (add your domain)
$allowed_origins = [
    'http://localhost',
    'http://127.0.0.1',
    'https://yourdomain.com',  // Change this to your actual domain
    'http://yourdomain.com'
];
