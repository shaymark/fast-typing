# Ad Integration Guide for Fast Typing Game

## 🎯 **Ad Banner Implementation**

The game now includes a professional ad banner system with multiple integration options.

### **Current Implementation:**

1. **Top Banner (728x90)**: Positioned above the game container
2. **Responsive Design**: Hidden on mobile devices (< 768px)
3. **Professional Styling**: Matches the game's design theme
4. **Fallback System**: Shows placeholder when ads aren't loaded

## 📊 **Ad Placement Options**

### **Option 1: Top Banner (Current)**
- **Position**: Above game container
- **Size**: 728x90 (leaderboard)
- **Pros**: High visibility, standard placement, doesn't interfere with gameplay
- **Best for**: Desktop users, high CPM rates

### **Option 2: Side Banner**
- **Position**: Right side of game container
- **Size**: 300x250 (medium rectangle)
- **Pros**: Good visibility, higher CPM, doesn't block game area
- **Best for**: Desktop users with wider screens

### **Option 3: Responsive Banner**
- **Desktop**: 728x90 top banner
- **Mobile**: 320x50 banner
- **Pros**: Optimized for all devices
- **Best for**: Cross-platform monetization

## 🛠️ **Integration Options**

### **1. Google AdSense (Recommended)**

Add this code to your HTML `<head>` section:

```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID"
     crossorigin="anonymous"></script>
```

Update the ad manager with your publisher ID:

```javascript
// In js/ad-manager.js, update these lines:
data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
data-ad-slot="YOUR_AD_SLOT_ID"
```

### **2. Custom Ads**

Replace the placeholder with your own ads:

```javascript
// In js/ad-manager.js, modify loadCustomAd() method
loadCustomAd() {
    this.adBanner.innerHTML = `
        <div class="ad-placeholder">
            <div class="ad-label">Sponsored</div>
            <div class="ad-content">
                <div class="ad-icon">🎮</div>
                <div class="ad-text">
                    <h3>Your Ad Title</h3>
                    <p>Your ad description</p>
                    <button class="ad-btn" onclick="window.open('YOUR_LINK', '_blank')">Learn More</button>
                </div>
            </div>
        </div>
    `;
}
```

### **3. Other Ad Networks**

#### **Media.net**
```html
<script type="text/javascript">
window._mNHandle = window._mNHandle || {};
window._mNHandle.queue = window._mNHandle.queue || [];
medianet_versionId = "3121199";
</script>
<script src="//contextual.media.net/dmedianet.js?cid=YOUR_CID" async="async"></script>
```

#### **Amazon Associates**
```html
<script type="text/javascript">
amzn_assoc_ad_type = "banner";
amzn_assoc_marketplace = "amazon";
amzn_assoc_region = "US";
amzn_assoc_placement = "assoc_banner_placement_default";
amzn_assoc_campaigns = "YOUR_CAMPAIGN";
amzn_assoc_banner_type = "category";
amzn_assoc_p = "YOUR_PID";
amzn_assoc_isresponsive = "true";
amzn_assoc_banner_id = "YOUR_BANNER_ID";
amzn_assoc_tracking_id = "YOUR_TRACKING_ID";
</script>
<script src="//z-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&Operation=GetScript&ID=OneJS&WS=1"></script>
```

## 📱 **Mobile Optimization**

The current implementation automatically hides ads on mobile devices. To enable mobile ads:

1. **Remove the mobile hiding CSS**:
```css
/* Remove or comment out this section */
@media (max-width: 768px) {
    .ad-banner-container {
        display: none;
    }
}
```

2. **Add mobile-specific ad sizes**:
```css
@media (max-width: 768px) {
    .ad-banner {
        width: 320px;
        height: 50px;
    }
}
```

## 🎮 **Game Integration Features**

### **Ad Manager Methods**

```javascript
// Access the ad manager
const adManager = window.adManager;

// Hide ads during gameplay
adManager.hideAd();

// Show ads between levels
adManager.showAd();

// Refresh ads
adManager.refreshAd();

// Get ad statistics
console.log(adManager.getAdStats());
```

### **Integration with Game Events**

Add this to your game logic:

```javascript
// Hide ads when game starts
gameState.onGameStart = () => {
    adManager.hideAd();
};

// Show ads when game ends
gameState.onGameOver = () => {
    adManager.showAd();
    adManager.refreshAd();
};

// Show ads between levels
gameState.onLevelUp = () => {
    adManager.showAd();
    setTimeout(() => adManager.hideAd(), 3000); // Hide after 3 seconds
};
```

## 💰 **Monetization Tips**

### **Best Practices:**

1. **Don't Overload**: Limit to 1-2 ads per page
2. **Strategic Placement**: Position ads where users naturally pause
3. **Mobile-Friendly**: Ensure ads work well on all devices
4. **User Experience**: Don't let ads interfere with gameplay
5. **A/B Testing**: Test different ad placements and sizes

### **Revenue Optimization:**

1. **High-Value Positions**: Top banner typically has highest CPM
2. **Relevant Content**: Gaming-related ads perform better
3. **Timing**: Show ads between levels, not during active gameplay
4. **Frequency**: Balance revenue with user experience

## 🔧 **Customization Options**

### **Change Ad Position**

To move the ad to the side:

```css
/* Add this to styles.css */
.game-container {
    display: flex;
    gap: 20px;
    max-width: 1200px;
    margin: 0 auto;
}

.ad-banner-container {
    order: 2; /* Move to right side */
    align-self: flex-start;
    margin-top: 20px;
}
```

### **Add Multiple Ad Units**

```html
<!-- Add more ad containers -->
<div class="ad-banner-container">
    <div class="ad-banner" id="adBanner1"></div>
</div>
<div class="ad-banner-container">
    <div class="ad-banner" id="adBanner2"></div>
</div>
```

## 📈 **Analytics Integration**

Add ad performance tracking:

```javascript
// Track ad impressions
function trackAdImpression(adType) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'ad_impression', {
            'ad_type': adType,
            'game_level': gameState.level
        });
    }
}

// Track ad clicks
function trackAdClick(adType) {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'ad_click', {
            'ad_type': adType,
            'game_level': gameState.level
        });
    }
}
```

## 🚀 **Next Steps**

1. **Choose Ad Network**: Select Google AdSense, Media.net, or custom ads
2. **Get Publisher ID**: Apply for ad network approval
3. **Update Configuration**: Replace placeholder IDs with real ones
4. **Test Implementation**: Verify ads load correctly
5. **Monitor Performance**: Track revenue and user engagement
6. **Optimize**: A/B test different placements and timing

## 📞 **Support**

For ad integration issues:
- Check browser console for errors
- Verify ad network approval status
- Test on different devices and browsers
- Monitor ad network dashboard for performance

---

**Note**: Always comply with ad network policies and respect user experience when implementing advertisements. 