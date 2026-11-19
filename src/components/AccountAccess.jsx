
import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import {
  Mail,
  Lock,
  User,
  Phone,
  Eye,
  EyeOff,
  ArrowRight,
  LoaderCircle,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
} from 'lucide-react'

export default function AccountAccess({ onClose, onLogin }) {
  const [mode, setMode] = useState('login')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const clearMessages = () => {
    setMessage('')
    setError('')
  }

  const switchMode = (nextMode) => {
    setMode(nextMode)
    clearMessages()
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    clearMessages()

    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.')
      return
    }

    if (mode === 'signup') {
      if (!fullName.trim()) {
        setError('Please enter your full name.')
        return
      }

      if (password.length < 8) {
        setError('Password must contain at least 8 characters.')
        return
      }
    }

    setLoading(true)

    try {
      if (mode === 'signup') {
        const { data, error: signupError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: {
            data: {
              full_name: fullName.trim(),
              phone: phone.trim(),
            },
            emailRedirectTo: window.location.origin,
          },
        })

        if (signupError) throw signupError

        if (data.session) {
          setMessage('Your account has been created successfully.')
          onLogin?.(data.session.user)
        } else {
          setMessage(
            'Registration successful! Please check your email and click the verification link before signing in.'
          )
          setMode('login')
        }
      }

      if (mode === 'login') {
        const { data, error: loginError } =
          await supabase.auth.signInWithPassword({
            email: email.trim(),
            password,
          })

        if (loginError) throw loginError

        setMessage('Welcome back! You are signed in.')
        onLogin?.(data.user)
      }

      if (mode === 'forgot') {
        const { error: resetError } =
          await supabase.auth.resetPasswordForEmail(email.trim(), {
            redirectTo: `${window.location.origin}/?reset-password=true`,
          })

        if (resetError) throw resetError

        setMessage(
          'Password reset instructions have been sent to your email.'
        )
      }
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    setLoading(true)
    clearMessages()

    const { error: logoutError } = await supabase.auth.signOut()

    setLoading(false)

    if (logoutError) {
      setError(logoutError.message)
      return
    }

    setMessage('You have successfully signed out.')
  }

  return (
    <div className="account-overlay" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose?.()
    }}>
      <div className="account-card">
        <button
          type="button"
          className="account-close"
          onClick={onClose}
          aria-label="Close account window"
        >
          ×
        </button>

        <div className="account-brand">
          <span className="account-brand-icon">
            <User size={22} />
          </span>
          <span>ABHILASHA</span>
          <small>LADIES BEAUTY PARLOUR</small>
        </div>

        <div className="account-heading">
          <p className="account-eyebrow">YOUR PERSONAL SPACE</p>

          <h2>
            {mode === 'signup'
              ? 'Create Your Account'
              : mode === 'forgot'
                ? 'Reset Password'
                : 'Welcome Back'}
          </h2>

          <p>
            {mode === 'signup'
              ? 'Join us and manage your appointments and beauty courses.'
              : mode === 'forgot'
                ? 'Enter your registered email to receive a password reset link.'
                : 'Sign in to manage your appointments and bookings.'}
          </p>
        </div>

        {message && (
          <div className="account-message success">
            <CheckCircle2 size={18} />
            <span>{message}</span>
          </div>
        )}

        {error && (
          <div className="account-message error">
            <AlertCircle size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="account-form">
          {mode === 'signup' && (
            <>
              <label>Full Name</label>
              <div className="account-input">
                <User size={18} />
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  autoComplete="name"
                  required
                />
              </div>

              <label>Phone Number</label>
              <div className="account-input">
                <Phone size={18} />
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  autoComplete="tel"
                />
              </div>
            </>
          )}

          <label>Email Address</label>
          <div className="account-input">
            <Mail size={18} />
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </div>

          {mode !== 'forgot' && (
            <>
              <label>Password</label>
              <div className="account-input">
                <Lock size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete={
                    mode === 'signup' ? 'new-password' : 'current-password'
                  }
                  minLength={mode === 'signup' ? 8 : undefined}
                  required
                />
                <button
                  type="button"
                  className="account-password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </>
          )}

          {mode === 'login' && (
            <button
              type="button"
              className="account-forgot"
              onClick={() => switchMode('forgot')}
            >
              Forgot password?
            </button>
          )}

          <button
            type="submit"
            className="account-submit"
            disabled={loading}
          >
            {loading ? (
              <LoaderCircle className="account-spinner" size={19} />
            ) : (
              <>
                {mode === 'signup'
                  ? 'Create Account'
                  : mode === 'forgot'
                    ? 'Send Reset Link'
                    : 'Sign In'}
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </form>

        {mode === 'login' && (
          <div className="account-switch">
            Don't have an account?{' '}
            <button onClick={() => switchMode('signup')}>
              Create Account
            </button>
          </div>
        )}

        {mode === 'signup' && (
          <div className="account-switch">
            Already registered?{' '}
            <button onClick={() => switchMode('login')}>
              Sign In
            </button>
          </div>
        )}

        {mode === 'forgot' && (
          <div className="account-switch">
            <button onClick={() => switchMode('login')}>
              <ArrowLeft size={15} /> Back to Sign In
            </button>
          </div>
        )}

        <p className="account-security">
          <Lock size={13} />
          Secure authentication powered by Supabase
        </p>
      </div>
    </div>
  )
}
