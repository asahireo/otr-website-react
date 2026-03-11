// Exchange rates data
const exchangeRates = {
    'MYR-BDT': 28.7,
    'MYR-INR': 20.5,
    'MYR-PKR': 62.3,
    'MYR-PHP': 12.8,
    'MYR-NPR': 32.8,
    'USD-BDT': 120.5,
    'USD-INR': 83.2,
    'USD-PKR': 278.5,
    'USD-PHP': 56.2,
    'USD-NPR': 134.8,
    'SGD-BDT': 90.2,
    'SGD-INR': 62.1,
    'SGD-PKR': 207.8,
    'SGD-PHP': 41.5,
    'SGD-NPR': 99.6
};

// Transfer fees data (standard fees for different currency pairs)
const transferFees = {
    'MYR-BDT': 10.00,
    'MYR-INR': 12.00,
    'MYR-PKR': 15.00,
    'MYR-PHP': 8.00,
    'MYR-NPR': 10.00,
    'USD-BDT': 5.00,
    'USD-INR': 6.00,
    'USD-PKR': 7.00,
    'USD-PHP': 4.00,
    'USD-NPR': 5.00,
    'SGD-BDT': 8.00,
    'SGD-INR': 9.00,
    'SGD-PKR': 10.00,
    'SGD-PHP': 6.00,
    'SGD-NPR': 8.00
};

// At the top of your JS file
const transferState = {
    amountValid: false,
    countrySelected: false,
    methodSelected: false,
    ratesChecked: false
};

// Device detection and app store redirection
function detectDevice() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return 'ios';
    }
    
    if (/android/i.test(userAgent)) {
        return 'android';
    }
    
    return 'desktop';
}

function redirectToAppStore() {
    const device = detectDevice();
    
    switch(device) {
        case 'ios':
            window.open('https://apps.apple.com/my/app/onetransfer-remittance/id1497130506', '_blank');
            break;
        case 'android':
            window.open('https://play.google.com/store/apps/details?id=com.mobilityone.onetransfer.android.app&pcampaignid=web_share', '_blank');
            break;
        default:
            window.open('https://play.google.com/store/apps/details?id=com.mobilityone.onetransfer.android.app&pcampaignid=web_share', '_blank');
    }
}

// Calculator functionality
//function updateCalculation() {
//    const sendAmount = parseFloat(document.getElementById('sendAmount').value) || 0;
//    const fromCurrency = document.getElementById('fromCurrency').value;
//    const toCurrency = document.getElementById('toCurrency').value;
    
//    const rateKey = `${fromCurrency}-${toCurrency}`;
//    const rate = exchangeRates[rateKey] || 1;
//    const fee = transferFees[rateKey] || 10;
    
//    const receiveAmount = (sendAmount * rate).toFixed(2);
    
//    document.getElementById('currentRate').textContent = `1.00 ${fromCurrency} = ${rate} ${toCurrency}`;
//    document.getElementById('receiveAmount').textContent = `${parseFloat(receiveAmount).toLocaleString()} ${toCurrency}`;
//    document.getElementById('transferFee').textContent = `${fee.toFixed(2)} ${fromCurrency}`;
//}

function startTransfer() {
    redirectToAppStore();
}

function scrollToCalculator() {
    document.getElementById('calculator').scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
    });
}

// Enhanced scroll effect for header
function handleHeaderScroll() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(20px)';
        header.style.boxShadow = '0 8px 32px rgba(31, 38, 135, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.15)';
        header.style.backdropFilter = 'blur(20px)';
        header.style.boxShadow = '0 8px 32px rgba(31, 38, 135, 0.1)';
    }
}

// Intersection Observer for animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe sections for animation
    const sections = document.querySelectorAll('section, .benefit-card, .transfer-card, .location-card');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Initialize page functionality
function initializePage() {
    // Set up app store button
    const appStoreBtn = document.getElementById('appStoreBtn');
    if (appStoreBtn) {
        appStoreBtn.addEventListener('click', function(e) {
            e.preventDefault();
            redirectToAppStore();
        });
    }
    
    // Set up calculator event listeners
    const sendAmountInput = document.getElementById('sendAmount');
    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');
    
    //if (sendAmountInput) sendAmountInput.addEventListener('input', updateCalculation);
    //if (fromCurrencySelect) fromCurrencySelect.addEventListener('change', updateCalculation);
    //if (toCurrencySelect) toCurrencySelect.addEventListener('change', updateCalculation);
    
    // Initial calculation
    //updateCalculation();
    
    // Initialize animations
    initializeAnimations();
    
    // Add scroll listener for header
    window.addEventListener('scroll', handleHeaderScroll);
}

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', initializePage);


//changees
function getSelectedCurrencyCodeFromSelect(selectElement) {
    if (!selectElement) return "";
    const opt = selectElement.options[selectElement.selectedIndex];
    if (!opt) return "";

    // Priority:
    // 1) data-currency (e.g. "PKR")
    // 2) data-country-currency (e.g. "PAK-PKR") -> take second segment
    // 3) value (if it's already a currency code like "PKR")
    const datasetCurrency = opt.dataset ? (opt.dataset.currency || "").trim() : "";
    if (datasetCurrency) return datasetCurrency.toUpperCase();

    const dataCountryCurrency = opt.dataset ? (opt.dataset.countryCurrency || "").trim() : "";
    if (dataCountryCurrency && dataCountryCurrency.includes('-')) {
        const parts = dataCountryCurrency.split('-').map(p => p.trim());
        if (parts.length >= 2 && parts[1]) return parts[1].toUpperCase();
    }

    // If option value contains '-', maybe it's "PAK-PKR"
    const val = (opt.value || "").trim();
    if (val.includes('-')) {
        const parts = val.split('-').map(p => p.trim());
        if (parts.length >= 2 && parts[1]) return parts[1].toUpperCase();
    }

    // fallback: if value looks like a currency code (3 letters), return it
    if (/^[A-Z]{3}$/i.test(val)) return val.toUpperCase();

    return ""; // unknown
}


function ensureResultBlocksVisible() {
    const blocks = ['currentRate', 'receiveAmount', 'transferFee'];
    blocks.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            // show element (in case CSS set display:none)
            el.closest('.rate-display, .calc-result, .transfer-fee')?.style?.setProperty('display', '');
            el.style.visibility = 'visible';
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const toSel = document.getElementById('toCurrency');
    if (toSel) toSel.addEventListener('change', hideResultBlocksOnly);
});


// Minimal: only hide the three result blocks when To select changes
function hideResultBlocksOnly() {
    const wrappers = document.querySelectorAll('.rate-display, .calc-result, .transfer-fee');
    wrappers.forEach(w => {
        if (!w.classList.contains('hidden-by-default')) {
            w.classList.add('hidden-by-default');
        }
    });
}

// Utility: show inline error
function _showCheckRatesError(message) {
    let err = document.getElementById('checkRatesError');
    if (!err) {
        // fallback: alert if container not present
        //alert(message);
        return;
    }
    err.textContent = message;
    err.style.display = 'block';
}

// Utility: clear error
function _clearCheckRatesError() {
    const err = document.getElementById('checkRatesError');
    if (err) {
        err.textContent = '';
        err.style.display = 'none';
    }
}
function onCheckRatesClick(e) {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();

    const sendInput = document.getElementById('sendAmount');
    const toSel = document.getElementById('toCurrency');
    const methodInput = document.getElementById('selectedMethod');
    const paymentMethod = (methodInput?.value || "").trim(); // ✅ re-read current value here

    // Basic presence checks
    if (!sendInput) {
        _showCheckRatesError('Amount input not found.');
        return null;
    }
    if (!toSel) {
        _showCheckRatesError('Destination select not found.');
        return null;
    }

    // Parse amount and validate
    const sendAmount = parseFloat(sendInput.value);
    if (isNaN(sendAmount) || sendAmount <= 0) {
        _showCheckRatesError('Please enter an amount greater than 0.');
        return null;
    }

    // Validate toCurrency selection
    const optIndex = toSel.selectedIndex;
    if (optIndex < 0) {
        _showCheckRatesError('Please select a destination country.');
        return null;
    }
    const opt = toSel.options[optIndex];
    // If your first option is placeholder with empty value, also treat as not selected
    if (!opt || !(opt.value || (opt.dataset && (opt.dataset.countryCurrency || opt.dataset.currency)))) {
        _showCheckRatesError('Please select a destination country.');
        return null;
    }

    // ✅ Validate payment method
    //const paymentMethod = methodInput?.value || "";
    if (!paymentMethod) {
        _showCheckRatesError('Please select a payment method (Cash Pickup, e-Wallet, or Bank).');
        return;
    }

    // All validated — clear error
    _clearCheckRatesError();

    // Collect attributes (same as before)
    const data = {
        sendAmount: sendAmount,
        toValue: (opt.value || '').trim(),                         // Code3 (option value)
        codeCurrency: (opt.dataset && opt.dataset.countryCurrency) ? opt.dataset.countryCurrency.trim() : '', // PAK-PKR
        currencyOnly: (opt.dataset && opt.dataset.currency) ? opt.dataset.currency.trim() : '',             // PKR
        id: opt.getAttribute('data-id') || '',
        code2: opt.getAttribute('data-code2') || '',
        phone: opt.getAttribute('data-phone') || '',
        PayMode: paymentMethod || '', // ✅ include pay mode,
        // optionally include selected countrySelect value if present
        selectedCountry: (document.getElementById('countrySelect') ? document.getElementById('countrySelect').value : '')
    };

    // expose for debugging / later use
    window.lastCheckRatesData = data;

    console.log('CheckRates clicked — validated and collected data:', data);

    // ✅ Update transfer state
    transferState.amountValid = sendAmount > 0;
    transferState.countrySelected = !!data.toValue;
    transferState.methodSelected = !!paymentMethod;
    transferState.ratesChecked = false; // reset until API confirms
    // Add:
    callFeeLookupApi(data.codeCurrency, data.sendAmount, data.PayMode);
    return data;
}


async function callFeeLookupApi(codeCurrency, sendAmount, PayMode) {
    try {
        const response = await fetch('/Transfer/GetFeeLookup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                CodeCurrency: codeCurrency,
                Amount: sendAmount,
                PayMode: PayMode 
            })
        });

        const result = await response.json();
        //console.log('API Fee Lookup Response:', result);

        if (!response.ok || !result.success) {
            //alert(result.message || 'Failed to fetch fee lookup.');
            return;
        }
        // Extract values
        const { totalSendFees, validExchangeRate } = result.data;
        //debugger;
        // Elements
        const rateBlock = document.querySelector('.rate-display');
        const receiveBlock = document.querySelector('.calc-result');
        const feeBlock = document.querySelector('.transfer-fee');

        const rateValueEl = document.getElementById('currentRate');
        const receiveAmountEl = document.getElementById('receiveAmount');
        const transferFeeEl = document.getElementById('transferFee');

        // Compute receive amount (sendAmount * rate)
        const receiveAmount = sendAmount * validExchangeRate;

        // Update UI text
        rateValueEl.textContent = `1.00 MYR = ${validExchangeRate.toFixed(2)} ${codeCurrency.split('-')[1]}`;
        receiveAmountEl.textContent = `${receiveAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${codeCurrency.split('-')[1]}`;
        transferFeeEl.textContent = `${totalSendFees.toFixed(2)} MYR`;

        // Show the hidden blocks
        [rateBlock, receiveBlock, feeBlock].forEach(block => {
            block.classList.remove('hidden-by-default');
        });

        // Mark as converted and enable send money button
        //isConverted = true;
        //updateSendMoneyButtonState();
        // ✅ Enable the Proceed button now
        //const proceedBtn = document.getElementById('sendMoneyBtn');
        //if (proceedBtn) proceedBtn.disabled = false;
        transferState.ratesChecked = true;
        updateSendMoneyButton();
        //updateSendMoneyButtonState();
        // Example: Show result in console or update UI later
        //alert('Fee Lookup successful! Check console for details.');
    } catch (error) {
        console.error('Error calling Fee Lookup API:', error);
        //alert('Something went wrong while fetching fee lookup.');
    }
}

// Function to update send money button state
function updateSendMoneyButtonState() {
    const hasCountry = receiverCountry.value !== '';
    const hasAmount = parseFloat(sendAmount.value.replace(/[^0-9.]/g, '')) > 0;
    const hasMethod = selectedMethod !== null;

    // Only enable if all required fields are filled AND calculation is done
    const shouldEnable = hasCountry && hasAmount && hasMethod && isConverted;
    debugger;

    if (shouldEnable) {
        sendMoneyBtn.disabled = false;
        sendMoneyBtn.classList.add('active');
    } else {
        sendMoneyBtn.disabled = true;
        sendMoneyBtn.classList.remove('active');
    }
}

function updateSendMoneyButton() {
    const proceedBtn = document.getElementById('sendMoneyBtn');
    if (!proceedBtn) return;

    // enable only if all conditions are true
    const canProceed = transferState.amountValid &&
        transferState.countrySelected &&
        transferState.methodSelected &&
        transferState.ratesChecked;

    proceedBtn.disabled = !canProceed;

    // Optional: add visual cue
    if (canProceed) {
        proceedBtn.classList.add('active');
    } else {
        proceedBtn.classList.remove('active');
    }
}

//function updateCalculation() {
//    debugger;
//    const sendAmount = parseFloat(document.getElementById('sendAmount').value) || 0;
//    const fromSelect = document.getElementById('fromCurrency');
//    const toSelect = document.getElementById('toCurrency');

//    // get currency codes
//    const fromCurrency = getSelectedCurrencyCodeFromSelect(fromSelect) || (fromSelect.value || "").toUpperCase();
//    const toCurrency = getSelectedCurrencyCodeFromSelect(toSelect) || (toSelect.value || "").toUpperCase();

//    // Compose rate lookup key
//    const rateKey = `${fromCurrency}-${toCurrency}`;

//    const rate = exchangeRates[rateKey] || 0; // use 0 to show no rate if missing
//    const fee = transferFees[rateKey] ?? 0;

//    if (rate <= 0) {
//        // If rate missing, show placeholder text and unhide blocks
//        document.getElementById('currentRate').textContent = `Rate unavailable for ${fromCurrency} → ${toCurrency}`;
//        document.getElementById('receiveAmount').textContent = `- ${toCurrency || ''}`;
//        document.getElementById('transferFee').textContent = `${fee.toFixed(2)} ${fromCurrency || ''}`;
//        ensureResultBlocksVisible();
//        return;
//    }

//    const receiveAmount = (sendAmount * rate).toFixed(2);

//    document.getElementById('currentRate').textContent = `1.00 ${fromCurrency} = ${rate} ${toCurrency}`;
//    document.getElementById('receiveAmount').textContent = `${parseFloat(receiveAmount).toLocaleString()} ${toCurrency}`;
//    document.getElementById('transferFee').textContent = `${fee.toFixed(2)} ${fromCurrency}`;

//    // ensure visible
//    ensureResultBlocksVisible();
//}
