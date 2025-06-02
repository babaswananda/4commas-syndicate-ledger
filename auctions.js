// Live Auctions JavaScript
// Initialize AOS
AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true
});

// Auction data
const auctions = {
    sonnet: {
        name: '.sonnet',
        currentBid: 1847500,
        bidders: 8,
        timeLeft: 2 * 3600 + 14 * 60 + 33, // 2h 14m 33s in seconds
        bidIncrement: 25000,
        lastBidder: 'Bidder_7x9'
    },
    commandline: {
        name: '.commandline',
        currentBid: 892000,
        bidders: 5,
        timeLeft: 5 * 3600 + 42 * 60 + 18,
        bidIncrement: 15000,
        lastBidder: 'DevOps_Master'
    },
    neuralprocessor: {
        name: '.neuralprocessor',
        currentBid: 2156000,
        bidders: 12,
        timeLeft: 1 * 3600 + 33 * 60 + 45,
        bidIncrement: 50000,
        lastBidder: 'AI_Whale_99'
    },
    memeengine: {
        name: '.memeengine',
        currentBid: 445000,
        bidders: 3,
        timeLeft: 23 * 3600 + 17 * 60 + 52,
        bidIncrement: 10000,
        lastBidder: 'Meme_Lord_42'
    }
};

// Bidder names pool
const bidderNames = [
    'Protocol_Hunter', 'Digital_Whale', 'Crypto_Baron', 'AI_Investor', 'Tech_Mogul',
    'Blockchain_King', 'Future_Builder', 'Code_Master', 'Venture_Alpha', 'Syndicate_Pro',
    'Domain_Lord', 'Neural_Net', 'Quantum_Trader', 'Meta_Investor', 'Cyber_Titan'
];

// Update timers
function updateTimers() {
    Object.keys(auctions).forEach(auctionId => {
        const auction = auctions[auctionId];
        const timerElement = document.getElementById(`timer-${auctionId}`);
        
        if (auction.timeLeft > 0) {
            auction.timeLeft--;
            const hours = Math.floor(auction.timeLeft / 3600);
            const minutes = Math.floor((auction.timeLeft % 3600) / 60);
            const seconds = auction.timeLeft % 60;
            
            timerElement.textContent = 
                `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            
            // Add urgency styling for auctions ending soon
            if (auction.timeLeft < 3600) { // Less than 1 hour
                timerElement.style.color = '#EF4444';
                timerElement.style.fontWeight = 'bold';
            }
        } else {
            timerElement.textContent = 'ENDED';
            timerElement.style.color = '#EF4444';
        }
    });
}

// Simulate bid activity
function simulateBidActivity() {
    const auctionIds = Object.keys(auctions);
    const randomAuction = auctionIds[Math.floor(Math.random() * auctionIds.length)];
    const auction = auctions[randomAuction];
    
    // Random chance of new bid (higher for auctions ending soon)
    const urgencyMultiplier = auction.timeLeft < 3600 ? 3 : 1;
    const bidChance = (0.1 + (1 / auction.timeLeft * 1000)) * urgencyMultiplier;
    
    if (Math.random() < bidChance && auction.timeLeft > 0) {
        // Simulate new bid
        auction.currentBid += auction.bidIncrement;
        auction.bidders += Math.random() > 0.7 ? 1 : 0; // Sometimes new bidder
        auction.lastBidder = bidderNames[Math.floor(Math.random() * bidderNames.length)];
        
        // Update UI
        updateBidDisplay(randomAuction);
        
        // Show bid notification
        showBidNotification(auction.name, auction.currentBid, auction.lastBidder);
    }
}

// Update bid display
function updateBidDisplay(auctionId) {
    const auction = auctions[auctionId];
    const bidElement = document.getElementById(`bid-${auctionId}`);
    const biddersElement = document.getElementById(`bidders-${auctionId}`);
    
    if (bidElement) {
        bidElement.textContent = `$${auction.currentBid.toLocaleString()}`;
        // Add flash effect
        bidElement.style.color = '#10B981';
        setTimeout(() => {
            bidElement.style.color = '';
        }, 1000);
    }
    
    if (biddersElement) {
        biddersElement.textContent = auction.bidders;
    }
    
    // Update activity feed for featured auction
    if (auctionId === 'sonnet') {
        updateActivityFeed(auction);
    }
}

// Update activity feed
function updateActivityFeed(auction) {
    const activityContainer = document.querySelector(`[data-auction="sonnet"] .bid-activity`);
    if (activityContainer) {
        activityContainer.innerHTML = `
            <div class="activity-item">
                <span class="bidder">${auction.lastBidder}</span>
                <span class="bid-amount">$${auction.currentBid.toLocaleString()}</span>
                <span class="bid-time">Just now</span>
            </div>
        `;
    }
}

// Show bid notification
function showBidNotification(protocolName, bidAmount, bidder) {
    const notification = document.createElement('div');
    notification.className = 'bid-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">🔥</span>
            <div class="notification-text">
                <strong>New Bid on ${protocolName}</strong>
                <div>${bidder} bid $${bidAmount.toLocaleString()}</div>
            </div>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Place bid function
function placeBid(auctionId) {
    const auction = auctions[auctionId];
    document.getElementById('bidProtocolName').textContent = `Place bid on ${auction.name}`;
    document.getElementById('bidAmount').value = auction.currentBid + auction.bidIncrement;
    document.getElementById('bidModal').style.display = 'flex';
}

// Submit bid
function submitBid() {
    const bidAmount = parseInt(document.getElementById('bidAmount').value);
    const protocolName = document.getElementById('bidProtocolName').textContent.split(' ').pop();
    
    if (bidAmount && bidAmount > 0) {
        // Show success message
        alert(`Bid of $${bidAmount.toLocaleString()} placed successfully on ${protocolName}!\n\nNote: This is a demo. In the live system, your bid would be processed and you would receive confirmation.`);
        closeBidModal();
    } else {
        alert('Please enter a valid bid amount.');
    }
}

// Close bid modal
function closeBidModal() {
    document.getElementById('bidModal').style.display = 'none';
}

// Update stats
function updateStats() {
    const totalBidders = Object.values(auctions).reduce((sum, auction) => sum + auction.bidders, 0);
    const totalVolume = Object.values(auctions).reduce((sum, auction) => sum + auction.currentBid, 0);
    
    document.getElementById('totalBidders').textContent = totalBidders;
    document.getElementById('totalVolume').textContent = `$${(totalVolume / 1000000).toFixed(1)}M`;
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Start timers
    setInterval(updateTimers, 1000);
    
    // Start bid simulation
    setInterval(simulateBidActivity, 5000); // Check every 5 seconds
    
    // Update stats periodically
    setInterval(updateStats, 10000);
    
    // Initial stats update
    updateStats();
    
    // Close modal when clicking outside
    document.getElementById('bidModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeBidModal();
        }
    });
});

// Add CSS for notifications
const notificationStyles = `
<style>
.bid-notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: rgba(0, 0, 0, 0.9);
    border: 1px solid #A855F7;
    border-radius: 8px;
    padding: 16px;
    color: white;
    z-index: 10000;
    transform: translateX(400px);
    transition: transform 0.3s ease;
    max-width: 300px;
}

.bid-notification.show {
    transform: translateX(0);
}

.notification-content {
    display: flex;
    align-items: center;
    gap: 12px;
}

.notification-icon {
    font-size: 20px;
}

.notification-text strong {
    color: #A855F7;
    display: block;
    margin-bottom: 4px;
}

.live-indicator {
    display: flex;
    align-items: center;
    gap: 8px;
    color: #10B981;
    font-weight: 600;
}

.live-dot {
    width: 8px;
    height: 8px;
    background: #EF4444;
    border-radius: 50%;
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% { opacity: 1; }
    50% { opacity: 0.5; }
    100% { opacity: 1; }
}

.auction-card {
    background: rgba(0, 0, 0, 0.8);
    border: 1px solid rgba(168, 85, 247, 0.3);
    border-radius: 12px;
    padding: 24px;
    transition: all 0.3s ease;
}

.auction-card:hover {
    border-color: #A855F7;
    transform: translateY(-4px);
}

.auction-card.featured {
    border-color: #F59E0B;
    background: rgba(245, 158, 11, 0.1);
}

.auctions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 24px;
    margin-top: 32px;
}

.auction-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
}

.protocol-name {
    font-size: 24px;
    font-weight: 700;
    color: #A855F7;
}

.auction-badge {
    background: #EF4444;
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 600;
}

.auction-badge.featured {
    background: #F59E0B;
}

.auction-timer {
    font-family: 'JetBrains Mono', monospace;
    font-size: 18px;
    font-weight: 600;
    color: #10B981;
}

.auction-metrics {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 16px;
    margin: 16px 0;
}

.metric {
    text-align: center;
}

.metric-label {
    display: block;
    font-size: 12px;
    color: #9CA3AF;
    margin-bottom: 4px;
}

.metric-value {
    display: block;
    font-size: 16px;
    font-weight: 600;
    color: white;
}

.auction-cta {
    width: 100%;
    background: linear-gradient(135deg, #A855F7, #7C3AED);
    border: none;
    border-radius: 8px;
    color: white;
    padding: 12px 24px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.auction-cta:hover {
    background: linear-gradient(135deg, #9333EA, #6D28D9);
    transform: translateY(-2px);
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', notificationStyles);
