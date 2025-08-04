// AdSense Debugger - Helps verify implementation and troubleshoot issues
class AdSenseDebugger {
    constructor() {
        this.adBanner = document.getElementById('adBanner');
        this.debugInfo = {
            adSenseLoaded: false,
            adSlotExists: false,
            adBannerExists: false,
            pageUrl: window.location.href,
            userAgent: navigator.userAgent,
            errors: []
        };
    }

    // Run comprehensive debug check
    runDebugCheck() {
        console.log('🔍 Starting AdSense Debug Check...');
        
        this.checkAdBannerElement();
        this.checkAdSenseScript();
        this.checkAdSlot();
        this.checkEnvironment();
        this.displayResults();
        
        return this.debugInfo;
    }

    // Check if ad banner element exists
    checkAdBannerElement() {
        this.debugInfo.adBannerExists = !!this.adBanner;
        if (!this.adBanner) {
            this.debugInfo.errors.push('Ad banner element not found');
        } else {
            console.log('✅ Ad banner element found');
        }
    }

    // Check if AdSense script is loaded
    checkAdSenseScript() {
        this.debugInfo.adSenseLoaded = typeof adsbygoogle !== 'undefined';
        if (!this.debugInfo.adSenseLoaded) {
            this.debugInfo.errors.push('AdSense script not loaded');
        } else {
            console.log('✅ AdSense script loaded');
        }
    }

    // Check if ad slot exists and is configured
    checkAdSlot() {
        if (!this.adBanner) return;
        
        const adSlot = this.adBanner.querySelector('ins.adsbygoogle');
        this.debugInfo.adSlotExists = !!adSlot;
        
        if (adSlot) {
            const clientId = adSlot.getAttribute('data-ad-client');
            const slotId = adSlot.getAttribute('data-ad-slot');
            
            console.log('✅ Ad slot found');
            console.log('📋 Client ID:', clientId);
            console.log('📋 Slot ID:', slotId);
            
            if (clientId === 'ca-pub-7126582652958122') {
                console.log('✅ Correct publisher ID');
            } else {
                this.debugInfo.errors.push('Incorrect publisher ID');
            }
            
            if (slotId === '4120419191') {
                console.log('✅ Correct ad slot ID');
            } else {
                this.debugInfo.errors.push('Incorrect ad slot ID');
            }
        } else {
            this.debugInfo.errors.push('Ad slot element not found');
        }
    }

    // Check environment issues
    checkEnvironment() {
        // Check if running on localhost
        if (this.debugInfo.pageUrl.includes('localhost') || this.debugInfo.pageUrl.includes('127.0.0.1')) {
            this.debugInfo.errors.push('Running on localhost - AdSense requires live domain');
        }
        
        // Check if HTTPS
        if (!this.debugInfo.pageUrl.startsWith('https://')) {
            this.debugInfo.errors.push('Not using HTTPS - AdSense requires HTTPS');
        }
        
        // Check for ad blockers
        if (this.isAdBlockerActive()) {
            this.debugInfo.errors.push('Ad blocker detected - may prevent ads from showing');
        }
    }

    // Simple ad blocker detection
    isAdBlockerActive() {
        try {
            const testAd = document.createElement('div');
            testAd.innerHTML = '&nbsp;';
            testAd.className = 'adsbox';
            testAd.style.position = 'absolute';
            testAd.style.left = '-10000px';
            document.body.appendChild(testAd);
            
            const isBlocked = testAd.offsetHeight === 0;
            document.body.removeChild(testAd);
            
            return isBlocked;
        } catch (e) {
            return false;
        }
    }

    // Display debug results
    displayResults() {
        console.log('\n📊 AdSense Debug Results:');
        console.log('========================');
        console.log('Page URL:', this.debugInfo.pageUrl);
        console.log('User Agent:', this.debugInfo.userAgent);
        console.log('Ad Banner Exists:', this.debugInfo.adBannerExists);
        console.log('AdSense Loaded:', this.debugInfo.adSenseLoaded);
        console.log('Ad Slot Exists:', this.debugInfo.adSlotExists);
        
        if (this.debugInfo.errors.length > 0) {
            console.log('\n❌ Issues Found:');
            this.debugInfo.errors.forEach((error, index) => {
                console.log(`${index + 1}. ${error}`);
            });
        } else {
            console.log('\n✅ No issues detected');
        }
        
        console.log('\n💡 Next Steps:');
        if (this.debugInfo.errors.length === 0) {
            console.log('1. Wait 24-48 hours for ads to start showing');
            console.log('2. Check AdSense dashboard for account status');
            console.log('3. Verify domain is approved in AdSense');
        } else {
            console.log('1. Fix the issues listed above');
            console.log('2. Deploy to live HTTPS domain');
            console.log('3. Disable ad blockers for testing');
        }
    }

    // Force refresh ads
    forceRefreshAds() {
        if (typeof adsbygoogle !== 'undefined') {
            console.log('🔄 Forcing ad refresh...');
            (adsbygoogle = window.adsbygoogle || []).push({});
        } else {
            console.log('❌ AdSense not loaded, cannot refresh');
        }
    }

    // Show test ad placeholder
    showTestPlaceholder() {
        if (!this.adBanner) return;
        
        this.adBanner.innerHTML = `
            <div class="ad-placeholder" style="border: 2px dashed #007bff;">
                <div class="ad-label">TEST AD</div>
                <div class="ad-content">
                    <div class="ad-icon">🧪</div>
                    <div class="ad-text">
                        <h3>AdSense Test Mode</h3>
                        <p>Publisher ID: ca-pub-7126582652958122</p>
                        <p>Slot ID: 4120419191</p>
                        <p>Status: ${this.debugInfo.adSenseLoaded ? 'Loaded' : 'Not Loaded'}</p>
                    </div>
                </div>
            </div>
        `;
    }
}

// Initialize debugger when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.adDebugger = new AdSenseDebugger();
    
    // Run debug check after a short delay to ensure AdSense loads
    setTimeout(() => {
        window.adDebugger.runDebugCheck();
    }, 2000);
    
    // Add debug commands to console
    console.log('🔧 AdSense Debug Commands:');
    console.log('adDebugger.runDebugCheck() - Run full debug check');
    console.log('adDebugger.forceRefreshAds() - Force refresh ads');
    console.log('adDebugger.showTestPlaceholder() - Show test placeholder');
}); 