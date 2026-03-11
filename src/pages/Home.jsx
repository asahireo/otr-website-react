
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Banknote, CreditCard, Landmark, ShieldCheck, Zap, Smartphone, MapPin } from 'lucide-react';
import { redirectToAppStore } from '../utils/helpers';

const API_BASE_ORIGIN = '';
const FEE_ENDPOINT = `${API_BASE_ORIGIN}/api/GetFeeLookup.php`;

const destinationMap = {
    BD: { codeCurrency: 'BGD-BDT', currency: 'BDT' },
    IN: { codeCurrency: 'IND-INR', currency: 'INR' },
    PK: { codeCurrency: 'PAK-PKR', currency: 'PKR' },
    PH: { codeCurrency: 'PHL-PHP', currency: 'PHP' },
    ID: { codeCurrency: 'IDN-IDR', currency: 'IDR' },
    NP: { codeCurrency: 'NPL-NPR', currency: 'NPR' },
    LK: { codeCurrency: 'LKA-LKR', currency: 'LKR' }
};

const payModeMap = {
    cash: 'CashPickup',
    ewallet: 'Wallet',
    bank: 'Bank'
};

const methodLabels = {
    cash: 'Cash Pickup',
    ewallet: 'e-Wallet',
    bank: 'Bank Account'
};

const demoExchangeRates = {
    BD: { cash: 24.650000, ewallet: 24.820000, bank: 24.900000 },
    IN: { cash: 18.640000, ewallet: 18.780000, bank: 18.850000 },
    PK: { cash: 78.250000, ewallet: 78.520000, bank: 78.760000 },
    PH: { cash: 12.700000, ewallet: 12.840000, bank: 12.920000 },
    ID: { cash: 3550.000000, ewallet: 3578.000000, bank: 3605.000000 },
    NP: { cash: 28.950000, ewallet: 29.120000, bank: 29.280000 },
    LK: { cash: 74.200000, ewallet: 74.650000, bank: 75.100000 }
};

const demoServiceFeeByMethod = {
    cash: 7.5,
    ewallet: 6.5,
    bank: 5.0
};

const Home = () => {
    const [selectedMethod, setSelectedMethod] = useState(null);
    const [receiverCountry, setReceiverCountry] = useState('');
    const [amount, setAmount] = useState('MYR 100.00');
    const [rawAmount, setRawAmount] = useState('100.00');
    const [isLoading, setIsLoading] = useState(false);
    const [calcError, setCalcError] = useState('');
    const [results, setResults] = useState(null);

    const handleAmountBlur = () => {
        let value = rawAmount.replace(/[^0-9.]/g, '');
        if (value) {
            value = parseFloat(value).toFixed(2);
            setRawAmount(value);
            setAmount(`MYR ${value}`);
        }
    };

    const handleAmountFocus = () => {
        setAmount(rawAmount);
    };

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
        setRawAmount(e.target.value);
    };

    const buildDemoResult = (countryCode, method, numericAmount) => {
        const destination = destinationMap[countryCode];
        const rate = demoExchangeRates[countryCode]?.[method] ?? 1;
        const serviceFee = demoServiceFeeByMethod[method] ?? 0;
        const recipientAmountVal = numericAmount * rate;

        return {
            provider: `${methodLabels[method]} (Demo Quote)`,
            recipientAmount: `${recipientAmountVal.toFixed(2)} ${destination.currency}`,
            exchangeRate: `${rate.toFixed(6)} : ${destination.currency}`,
            serviceFee: `${parseFloat(serviceFee).toFixed(2)} MYR`,
            totalFees: `${parseFloat(serviceFee).toFixed(2)} MYR`
        };
    };

    const handleCalculate = async () => {
        setCalcError('');
        setResults(null);

        if (!receiverCountry) {
            setCalcError('Please select a destination country.');
            return;
        }

        if (!selectedMethod) {
            setCalcError('Please select a payment method.');
            return;
        }

        const numericAmount = parseFloat(rawAmount.replace(/[^0-9.]/g, ''));
        if (!numericAmount || numericAmount <= 0) {
            setCalcError('Please enter a valid transfer amount.');
            return;
        }

        setIsLoading(true);

        try {
            const destination = destinationMap[receiverCountry];
            const payMode = payModeMap[selectedMethod];

            const payload = {
                CodeCurrency: destination.codeCurrency,
                Amount: numericAmount,
                PayMode: payMode
            };

            const response = await fetch(FEE_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const json = await response.json();
            if (!response.ok) throw new Error(json.message || 'API request failed.');
            if (json.success === false) throw new Error(json.message || 'API returned an error.');

            const data = json.data || {};
            const exchangeRate = data.validExchangeRate ?? data.exchangeRate ?? 0;
            if (!exchangeRate) throw new Error('Exchange rate unavailable.');

            const serviceFee = data.totalSendFees ?? data.fee ?? 0;
            const recipientAmountVal = numericAmount * exchangeRate;

            setResults({
                provider: data.provider || methodLabels[selectedMethod],
                recipientAmount: `${recipientAmountVal.toFixed(2)} ${destination.currency}`,
                exchangeRate: `${exchangeRate.toFixed(6)} : ${destination.currency}`,
                serviceFee: `${parseFloat(serviceFee).toFixed(2)} MYR`,
                totalFees: `${parseFloat(serviceFee).toFixed(2)} MYR`
            });

        } catch (err) {
            console.error('API Error:', err);
            setResults(buildDemoResult(receiverCountry, selectedMethod, numericAmount));
            setCalcError('Live rates are unavailable right now. Showing estimated demo rates.');
        } finally {
            setIsLoading(false);
        }
    };

    const MethodIcon = ({ method }) => {
        if (method === 'cash') return <Banknote />;
        if (method === 'ewallet') return <CreditCard />;
        if (method === 'bank') return <Landmark />;
        return null;
    };

    return (
        <>
            <section className="hero">
                <div className="container">
                    <div className="hero-grid">
                        <div className="hero-content animate-in">
                            <h1>Fast, Secure & Affordable Money Transfer</h1>
                            <p className="hero-subtitle">Licensed by Bank Negara Malaysia since 2006. Serving customers across
                                200+ countries with competitive rates and instant transfers through our OTR mobile app.</p>
                        </div>

                        {/* Exchange Calculator Card */}
                        <div className="calculator-card">
                            <div className="calculator-header">Exchange Rate Calculator</div>

                            <div className="calculator-content">
                                {/* Receiver Country Selection */}
                                <div className="section-label">Destination Country</div>
                                <select
                                    className="country-selector"
                                    id="receiverCountry"
                                    value={receiverCountry}
                                    onChange={(e) => setReceiverCountry(e.target.value)}
                                >
                                    <option value="">-- Select country --</option>
                                    <option value="BD">BANGLADESH</option>
                                    <option value="IN">INDIA</option>
                                    <option value="PK">PAKISTAN</option>
                                    <option value="PH">PHILIPPINES</option>
                                    <option value="ID">INDONESIA</option>
                                    <option value="NP">NEPAL</option>
                                    <option value="LK">SRI LANKA</option>
                                </select>

                                {/* Receiver Methods */}
                                <div className="receiver-methods-label">Payment Method:</div>
                                <div className="receiver-methods">
                                    {['cash', 'ewallet', 'bank'].map((method) => (
                                        <div
                                            key={method}
                                            className={`method-option ${selectedMethod === method ? 'selected' : ''}`}
                                            onClick={() => setSelectedMethod(method)}
                                        >
                                            <div className="method-icon"><MethodIcon method={method} /></div>
                                            <div className="method-label">{methodLabels[method]}</div>
                                        </div>
                                    ))}
                                </div>

                                {/* Amount */}
                                <div className="section-label">Transfer Amount</div>
                                <div className="amount-input-wrapper">
                                    <input
                                        type="text"
                                        className="amount-input"
                                        id="sendAmount"
                                        placeholder="MYR 100.00"
                                        value={amount}
                                        onChange={handleAmountChange}
                                        onFocus={handleAmountFocus}
                                        onBlur={handleAmountBlur}
                                    />
                                </div>

                                {/* Convert Button */}
                                <button
                                    className={`convert-button ${isLoading ? 'loading' : ''}`}
                                    id="convertBtn"
                                    onClick={handleCalculate}
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Calculating' : 'Calculate Exchange Rate'}
                                </button>
                                {calcError && (
                                    <div id="calcError" style={{ display: 'block', color: '#c0392b', fontSize: '0.9rem', marginTop: '10px' }}>
                                        {calcError}
                                    </div>
                                )}

                                {/* Results Section */}
                                {results && (
                                    <div className="results-section visible" id="resultsSection">
                                        <div className="results-header">Transfer Summary:</div>
                                        <div className="result-item">
                                            <div className="result-icon-box">
                                                <div className="result-icon" id="resultIcon">
                                                    <MethodIcon method={selectedMethod} />
                                                </div>
                                            </div>
                                            <div className="result-details">
                                                <div className="result-provider" id="resultProvider">{results.provider}</div>
                                                <div className="result-info">
                                                    <div>Recipient Gets: <strong id="recipientAmount">{results.recipientAmount}</strong></div>
                                                    <div>Exchange Rate: <strong id="exchangeRate">{results.exchangeRate}</strong></div>
                                                    <div>Service Fee: <strong id="serviceFee">{results.serviceFee}</strong></div>
                                                    <div>Total: <strong id="totalFees">{results.totalFees}</strong></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                { /* Send Money Button */}
                                <button
                                    className={`send-money-button ${results ? 'active' : ''}`}
                                    id="sendMoneyBtn"
                                    disabled={!results}
                                    onClick={() => redirectToAppStore()}
                                >
                                    Proceed to Send Money
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Quick Links Section */}
            <section className="quick-links">
                <div className="container">
                    <div className="quick-links-grid">
                        <Link to="/services" className="quick-link-card">
                            <div className="quick-link-icon"><ShieldCheck /></div>
                            <h3 className="quick-link-title">Our Services</h3>
                            <p className="quick-link-desc">Discover why thousands trust OTR for money transfers</p>
                        </Link>
                        <Link to="/how-it-works" className="quick-link-card">
                            <div className="quick-link-icon"><Zap /></div>
                            <h3 className="quick-link-title">How It Works</h3>
                            <p className="quick-link-desc">Learn how easy it is to send money with OTR</p>
                        </Link>
                        <Link to="/app" className="quick-link-card">
                            <div className="quick-link-icon"><Smartphone /></div>
                            <h3 className="quick-link-title">Download App</h3>
                            <p className="quick-link-desc">Get the OTR app for instant transfers anytime</p>
                        </Link>
                        <Link to="/branches" className="quick-link-card">
                            <div className="quick-link-icon"><MapPin /></div>
                            <h3 className="quick-link-title">Find Branch</h3>
                            <p className="quick-link-desc">Locate an OTR branch near you</p>
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;
