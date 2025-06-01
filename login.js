// Supabase Configuration
const SUPABASE_URL = 'https://dznaeogribeswzhvefwt.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR6bmFlb2dyaWJlc3d6aHZlZnd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4MDQxNjIsImV4cCI6MjA2NDM4MDE2Mn0.lQrKDrFHxq3gzub7SKpZpGzu6ZukiM3smzCuI6sH_Ew'

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// DOM Elements
const loginForm = document.getElementById('loginForm')
const loginBtn = document.getElementById('loginBtn')
const successModal = document.getElementById('successModal')
const errorModal = document.getElementById('errorModal')
const errorMessage = document.getElementById('errorMessage')

// Login Form Handler
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    
    // Show loading state
    loginBtn.innerHTML = '<span>AUTHENTICATING...</span>'
    loginBtn.disabled = true
    
    try {
        // Attempt login with Supabase
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })
        
        if (error) {
            throw error
        }
        
        // Success - show modal and redirect
        showSuccessModal()
        
        // Store user session
        localStorage.setItem('syndicate_user', JSON.stringify(data.user))
        
        // Redirect to dashboard after 2 seconds
        setTimeout(() => {
            window.location.href = 'dashboard.html'
        }, 2000)
        
    } catch (error) {
        console.error('Login error:', error)
        showErrorModal(error.message)
    } finally {
        // Reset button
        loginBtn.innerHTML = '<span>ACCESS DASHBOARD</span>'
        loginBtn.disabled = false
    }
})

// Show Success Modal
function showSuccessModal() {
    successModal.style.display = 'flex'
    setTimeout(() => {
        successModal.style.display = 'none'
    }, 3000)
}

// Show Error Modal
function showErrorModal(message) {
    errorMessage.textContent = message || 'Invalid credentials. Please try again.'
    errorModal.style.display = 'flex'
}

// Close Error Modal
function closeErrorModal() {
    errorModal.style.display = 'none'
}

// Reset Password Function
async function resetPassword() {
    const email = document.getElementById('email').value
    
    if (!email) {
        showErrorModal('Please enter your email address first.')
        return
    }
    
    try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: window.location.origin + '/reset-password.html'
        })
        
        if (error) {
            throw error
        }
        
        showSuccessModal()
        errorMessage.textContent = 'Password reset email sent! Check your inbox.'
        
    } catch (error) {
        showErrorModal('Failed to send reset email. Please try again.')
    }
}

// Check if user is already logged in
window.addEventListener('load', async () => {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (user) {
        // User is already logged in, redirect to dashboard
        window.location.href = 'dashboard.html'
    }
})

// Demo Login (for testing without Supabase setup)
function demoLogin() {
    // Demo credentials for testing
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    
    if (email === 'demo@4commas.com' && password === 'syndicate2024') {
        // Demo success
        localStorage.setItem('syndicate_user', JSON.stringify({
            id: 'demo-user',
            email: 'demo@4commas.com',
            tier: 'Architect',
            tier_level: 3
        }))
        
        showSuccessModal()
        setTimeout(() => {
            window.location.href = 'dashboard.html'
        }, 2000)
    } else {
        showErrorModal('Demo credentials: demo@4commas.com / syndicate2024')
    }
}

// Add demo login option for testing
document.addEventListener('DOMContentLoaded', () => {
    const demoBtn = document.createElement('button')
    demoBtn.type = 'button'
    demoBtn.className = 'demo-login-btn'
    demoBtn.innerHTML = '🧪 Demo Login'
    demoBtn.onclick = demoLogin
    
    const forgotSection = document.querySelector('.forgot-password')
    forgotSection.appendChild(demoBtn)
})
