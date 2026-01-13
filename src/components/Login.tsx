/**
 * Login - Modern glassmorphic login page component
 */

import { useState, useEffect } from 'react'
import './Login.css'

interface LoginProps {
  onLogin?: () => void
}

export const Login = ({ onLogin }: LoginProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string>('')
  const [rememberMe, setRememberMe] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })

  // Initialize database (localStorage) with credentials
  useEffect(() => {
    const storedCredentials = localStorage.getItem('dndconveyor_credentials')
    if (!storedCredentials) {
      // Save credentials to "database" (localStorage)
      const credentials = {
        email: 'dndconveyor@gmail.com',
        password: 'dndconveyor26'
      }
      localStorage.setItem('dndconveyor_credentials', JSON.stringify(credentials))
    }

    // Load remembered email/password if available
    const rememberedData = localStorage.getItem('dndconveyor_remembered')
    if (rememberedData) {
      try {
        const remembered = JSON.parse(rememberedData)
        if (remembered.email) {
          setFormData(prev => ({
            ...prev,
            email: remembered.email,
            password: remembered.password || ''
          }))
          setRememberMe(true)
        }
      } catch (error) {
        console.warn('Error loading remembered data:', error)
      }
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Auto-fill password when email matches remembered email
    if (name === 'email') {
      const rememberedData = localStorage.getItem('dndconveyor_remembered')
      if (rememberedData) {
        try {
          const remembered = JSON.parse(rememberedData)
          const enteredEmail = value.trim().toLowerCase()
          const rememberedEmail = remembered.email?.toLowerCase()
          
          if (enteredEmail === rememberedEmail) {
            setFormData(prev => ({
              ...prev,
              password: remembered.password || ''
            }))
          } else {
            // Clear password if email doesn't match
            setFormData(prev => ({
              ...prev,
              password: ''
            }))
          }
        } catch (error) {
          console.warn('Error checking remembered data:', error)
        }
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    // Get credentials from database (localStorage)
    const storedCredentials = localStorage.getItem('dndconveyor_credentials')
    if (!storedCredentials) {
      setError('Database error: Credentials not found')
      return
    }

    const credentials = JSON.parse(storedCredentials)

    // Validate email and password (case-insensitive email check)
    const enteredEmail = formData.email.trim().toLowerCase()
    const validEmail = credentials.email.toLowerCase()
    
    if (enteredEmail !== validEmail) {
      setError('Invalid email address')
      return
    }

    if (formData.password !== credentials.password) {
      setError('Invalid password')
      return
    }

    // Save user session
    localStorage.setItem('dndconveyor_user', JSON.stringify({
      name: formData.name,
      email: formData.email,
      loggedIn: true,
      loginTime: new Date().toISOString()
    }))

    // Save email and password if "Remember Me" is checked
    if (rememberMe) {
      localStorage.setItem('dndconveyor_remembered', JSON.stringify({
        email: formData.email.trim(),
        password: formData.password
      }))
    } else {
      // Remove remembered data if "Remember Me" is unchecked
      localStorage.removeItem('dndconveyor_remembered')
    }

    // Navigate to dashboard on successful login
    if (onLogin) {
      onLogin()
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev)
  }

  return (
    <div className="login-container">
      {/* Abstract 3D Background Shapes */}
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
        <div className="shape shape-5"></div>
      </div>

      {/* Glassmorphic Login Card */}
      <div className="login-card">
        {/* Logo/Brand Area */}
        <div className="login-header">
          <div className="logo-placeholder">LinguoSign</div>
          <p className="tagline">Bridging Silence Through Signs</p>
          <h1 className="login-title">Login</h1>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-input"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleInputChange}
              required
              aria-required="true"
            />
          </div>

          {/* Email Field */}
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-input"
              placeholder="username@gmail.com"
              value={formData.email}
              onChange={handleInputChange}
              required
              aria-required="true"
            />
          </div>

          {/* Password Field */}
          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                className="form-input password-input"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
                aria-required="true"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={togglePasswordVisibility}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="error-message-box">
              <span className="error-text">{error}</span>
            </div>
          )}

          {/* Remember Me Checkbox */}
          <div className="remember-me">
            <label className="remember-me-label">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="remember-me-checkbox"
              />
              <span className="remember-me-text">Remember Me</span>
            </label>
          </div>

          {/* Forgot Password Link */}
          <div className="forgot-password">
            <a href="#" className="forgot-link" onClick={(e) => e.preventDefault()}>
              Forgot Password?
            </a>
          </div>

          {/* Sign In Button */}
          <button type="submit" className="signin-button">
            Sign In
          </button>

          {/* Separator */}
          <div className="separator">
            <span className="separator-text">or continue with</span>
          </div>

          {/* Social Login Buttons */}
          <div className="social-login">
            <button type="button" className="social-button google-button" aria-label="Sign in with Google">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
            </button>
          </div>

          {/* Registration Link */}
          <div className="register-link">
            <p className="register-text">
              Don't have an account yet?{' '}
              <a href="#" className="register-link-text" onClick={(e) => e.preventDefault()}>
                Register for free
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}
