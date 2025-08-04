// Ad Manager for handling advertisements
class AdManager {
    constructor() {
        this.adBanner = document.getElementById('adBanner');
        this.isAdLoaded = false;
        this.adProviders = {
            googleAdsense: false,
            customAd: false
        };
    }

    // Initialize ad manager
    init() {
        this.setupAdPlaceholder();
        this.loadAd();
    }

    // Setup ad placeholder
    setupAdPlaceholder() {
        if (!this.adBanner) return;
        
        // Add loading animation
        this.adBanner.innerHTML = `
            <div class="ad-placeholder">
                <div class="ad-label">Advertisement</div>
                <div class="ad-content">
                    <div class="ad-icon">📢</div>
                    <div class="ad-text">
                        <h3>Ad Space Available</h3>
                        <p>728x90 Leaderboard Banner</p>
                        <p>Perfect for game monetization</p>
                    </div>
                </div>
            </div>
        `;
    }

    // Load advertisement
    loadAd() {
        // Try to load Google AdSense first
        if (this.loadGoogleAdsense()) {
            this.adProviders.googleAdsense = true;
            return;
        }
    }

    // Load Google AdSense
    loadGoogleAdsense() {
        try {
            // Check if Google AdSense is available
            if (typeof adsbygoogle !== 'undefined') {
                this.adBanner.innerHTML = `
                    <ins class="adsbygoogle"
                         style="display:inline-block;width:728px;height:90px"
                         data-ad-client="ca-pub-7126582652958122"
                         data-ad-slot="4120419191"
                         data-ad-format="auto"></ins>
                    <script>
                        (adsbygoogle = window.adsbygoogle || []).push({});
                    </script>
                `;
                this.isAdLoaded = true;
                return true;
            }
        } catch (error) {
            console.log('Google AdSense not available:', error);
        }
        return false;
    }

    // Refresh ad
    refreshAd() {
        if (this.adProviders.googleAdsense) {
            // Refresh Google AdSense
            if (typeof adsbygoogle !== 'undefined') {
                (adsbygoogle = window.adsbygoogle || []).push({});
            }
        }
    }

    // Hide ad banner
    hideAd() {
        if (this.adBanner) {
            this.adBanner.style.display = 'none';
        }
    }

    // Show ad banner
    showAd() {
        if (this.adBanner) {
            this.adBanner.style.display = 'flex';
        }
    }

    // Check if ad is visible
    isAdVisible() {
        return this.adBanner && this.adBanner.style.display !== 'none';
    }

    // Get ad statistics
    getAdStats() {
        return {
            isLoaded: this.isAdLoaded,
            providers: this.adProviders,
            isVisible: this.isAdVisible()
        };
    }
}

// Initialize ad manager when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.adManager = new AdManager();
    window.adManager.init();
}); 