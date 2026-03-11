
export function detectDevice() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) return 'ios';
    if (/android/i.test(userAgent)) return 'android';
    return 'desktop';
}

export function redirectToAppStore() {
    const device = detectDevice();
    switch (device) {
        case 'ios':
            window.open('https://apps.apple.com/my/app/onetransfer-remittance/id1497130506', '_blank');
            break;
        default:
            window.open('https://play.google.com/store/apps/details?id=com.mobilityone.onetransfer.android.app&pcampaignid=web_share', '_blank');
    }
}
