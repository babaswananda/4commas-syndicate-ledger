// Supabase Configuration
const SUPABASE_URL = 'https://dznaeogribeswzhvefwt.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6bmFlb2dyaWJlc3d6aHZlZnd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4MDQxNjIsImV4cCI6MjA2NDM4MDE2Mn0.lQrKDrFHxq3gzub7SKpZpGzu6ZukiM3smzCuI6sH_Ew'

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Check authentication on page load
window.addEventListener('load', async () => {
    await checkAuth()
    loadUserData()
})

// Check if user is authenticated
async function checkAuth() {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
        // No user logged in, redirect to login
        window.location.href = 'login.html'
        return
    }
    
    // User is authenticated, load their data
    displayUserInfo(user)
}

// Display user information
function displayUserInfo(user) {
    const userGreeting = document.getElementById('userGreeting')
    const email = user.email
    const firstName = email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1)
    
    userGreeting.textContent = `Welcome, ${firstName}`
}

// Load user data from localStorage or Supabase
function loadUserData() {
    // Try to get user data from localStorage first (for demo)
    const storedUser = localStorage.getItem('syndicate_user')
    
    if (storedUser) {
        const userData = JSON.parse(storedUser)
        updateDashboard(userData)
    } else {
        // Load from Supabase user metadata
        loadUserProfile()
    }
}

// Load user profile from Supabase
async function loadUserProfile() {
    try {
        const { data: { user } } = await supabase.auth.getUser()
        
        if (user) {
            // Get user profile from database
            const { data: profile, error } = await supabase
                .from('user_profiles')
                .select('*')
                .eq('user_id', user.id)
                .single()
            
            if (profile) {
                updateDashboard(profile)
            } else {
                // Default data for new users
                updateDashboard({
                    tier: 'Angel',
                    tier_level: 1,
                    contribution: 100,
                    member_since: new Date().toLocaleDateString()
                })
            }
        }
    } catch (error) {
        console.error('Error loading profile:', error)
    }
}

// Update dashboard with user data
function updateDashboard(userData) {
    // Update tier badge
    const tierBadge = document.getElementById('tierBadge')
    if (tierBadge) {
        tierBadge.textContent = userData.tier || 'ANGEL'
        tierBadge.className = `tier-badge tier-${(userData.tier || 'angel').toLowerCase()}`
    }
    
    // Update status values
    const memberSince = document.getElementById('memberSince')
    const contribution = document.getElementById('contribution')
    const protocolAccess = document.getElementById('protocolAccess')
    const profitShare = document.getElementById('profitShare')
    
    if (memberSince) memberSince.textContent = userData.member_since || 'December 2024'
    if (contribution) contribution.textContent = `$${userData.contribution || 100}`
    
    // Set protocol access based on tier
    const tierAccess = {
        1: '1 Protocol',
        2: '3 Protocols', 
        3: '8 Protocols',
        4: '15+ Protocols',
        5: 'All Protocols'
    }
    
    if (protocolAccess) protocolAccess.textContent = tierAccess[userData.tier_level] || '1 Protocol'
    
    // Set profit share based on tier
    const tierProfits = {
        1: '0%',
        2: '0%',
        3: '1%',
        4: '2%', 
        5: '3%'
    }
    
    if (profitShare) profitShare.textContent = tierProfits[userData.tier_level] || '0%'
}

// Logout function
async function logout() {
    try {
        const { error } = await supabase.auth.signOut()
        
        if (error) {
            console.error('Logout error:', error)
        }
        
        // Clear local storage
        localStorage.removeItem('syndicate_user')
        
        // Redirect to login page
        window.location.href = 'login.html'
        
    } catch (error) {
        console.error('Logout error:', error)
        // Force logout even if Supabase fails
        localStorage.removeItem('syndicate_user')
        window.location.href = 'login.html'
    }
}

// Demo data for testing
function loadDemoData() {
    const demoUser = {
        tier: 'Architect',
        tier_level: 3,
        contribution: 500,
        member_since: 'December 2024'
    }
    
    updateDashboard(demoUser)
}

// Initialize demo data if no real user data
document.addEventListener('DOMContentLoaded', () => {
    // Check if this is a demo session
    const storedUser = localStorage.getItem('syndicate_user')
    if (storedUser) {
        const userData = JSON.parse(storedUser)
        if (userData.id === 'demo-user') {
            loadDemoData()
        }
    }
})
