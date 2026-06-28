import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import { validateLoginForm } from '../utils/validators';
import '../styles/auth.css';

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((previousErrors) => ({ ...previousErrors, [field]: '' }));
    }
    if (submitError) {
      setSubmitError('');
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const nextErrors = validateLoginForm(form);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await login(form);
      navigate('/', { replace: true });
    } catch (err) {
      setSubmitError(err.message || 'Unable to login.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="auth-shell">
      <section className="auth-card" aria-labelledby="login-title">
        <p className="eyebrow">Welcome Back</p>
        <h1 id="login-title">Login</h1>
        <p className="auth-subtext">Use your registered credentials to access the dashboard.</p>

        {submitError ? (
          <div className="alert" role="alert">
            <span>{submitError}</span>
          </div>
        ) : null}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <label>
            Email
            <input
              type="email"
              value={form.email}
              aria-invalid={Boolean(errors.email)}
              onChange={(event) => updateField('email', event.target.value)}
            />
            {errors.email ? <span className="form-error">{errors.email}</span> : null}
          </label>
          <label>
            Password
            <input
              type="password"
              value={form.password}
              aria-invalid={Boolean(errors.password)}
              onChange={(event) => updateField('password', event.target.value)}
            />
            {errors.password ? <span className="form-error">{errors.password}</span> : null}
          </label>

          <div className="auth-actions">
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
        </form>

        <p className="auth-footer">
          Don&apos;t have an account? <Link to="/register">Create one</Link>
        </p>
      </section>
    </main>
  );
}

export default LoginPage;
