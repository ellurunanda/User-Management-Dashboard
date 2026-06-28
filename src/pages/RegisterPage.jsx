import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/useAuth';
import { validateRegisterForm } from '../utils/validators';
import '../styles/auth.css';

function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
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

    const nextErrors = validateRegisterForm(form);
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await register({
        fullName: form.fullName,
        email: form.email,
        password: form.password,
      });
      navigate('/', { replace: true });
    } catch (err) {
      setSubmitError(err.message || 'Unable to register.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="auth-shell">
      <section className="auth-card" aria-labelledby="register-title">
        <p className="eyebrow">Get Started</p>
        <h1 id="register-title">Create Account</h1>
        <p className="auth-subtext">Register to access the user management dashboard.</p>

        {submitError ? (
          <div className="alert" role="alert">
            <span>{submitError}</span>
          </div>
        ) : null}

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <label>
            Full Name
            <input
              type="text"
              value={form.fullName}
              aria-invalid={Boolean(errors.fullName)}
              onChange={(event) => updateField('fullName', event.target.value)}
            />
            {errors.fullName ? <span className="form-error">{errors.fullName}</span> : null}
          </label>

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

          <label>
            Confirm Password
            <input
              type="password"
              value={form.confirmPassword}
              aria-invalid={Boolean(errors.confirmPassword)}
              onChange={(event) => updateField('confirmPassword', event.target.value)}
            />
            {errors.confirmPassword ? <span className="form-error">{errors.confirmPassword}</span> : null}
          </label>

          <div className="auth-actions">
            <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
              {isSubmitting ? 'Creating account...' : 'Register'}
            </button>
          </div>
        </form>

        <p className="auth-footer">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </section>
    </main>
  );
}

export default RegisterPage;
