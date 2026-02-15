import { useEffect, useMemo, useState } from 'react';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth.js';
import { getDashboardPath, mapAuthPayload } from '../features/auth/utils/authHelpers.js';
import {
  forgotPassword,
  loginAdmin,
  loginFaculty,
  loginStudent,
  registerFaculty,
  registerStudent,
  resetPassword
} from '../features/auth/auth.api.js';
import Card from '../components/ui/Card.jsx';
import Button from '../components/ui/Button.jsx';
import Input from '../components/ui/Input.jsx';
import { getApiErrorMessages } from '../features/auth/utils/apiError.js';
import PublicLayout from '../components/site/PublicLayout.jsx';
import heroVector from '../../assets/vector_image.png';

const AuthGateway = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [searchParams] = useSearchParams();

  const [role, setRole] = useState('student');
  const [mode, setMode] = useState('login');
  const [panel, setPanel] = useState('auth');

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    enrollment: '',
    mobile: '',
    collegeEmail: '',
    department: ''
  });

  const [forgotEmail, setForgotEmail] = useState('');
  const [resetForm, setResetForm] = useState({
    email: '',
    token: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const urlPanel = searchParams.get('panel');
    const urlEmail = searchParams.get('email') || '';
    const urlToken = searchParams.get('token') || '';

    if (urlPanel === 'reset') {
      setPanel('reset');
      setResetForm((prev) => ({
        ...prev,
        email: urlEmail || prev.email,
        token: urlToken || prev.token
      }));
    }
  }, [searchParams]);

  if (auth.isAuthenticated) {
    return <Navigate to={getDashboardPath(auth.role)} replace />;
  }

  const isRegister = mode === 'register' && role !== 'admin';

  const heading = useMemo(() => {
    if (panel === 'forgot') return 'Forgot Password';
    if (panel === 'reset') return 'Reset Password';
    if (role === 'admin') return 'Admin Login';
    if (role === 'faculty') return isRegister ? 'Faculty Register' : 'Faculty Login';
    return isRegister ? 'Student Register' : 'Student Login';
  }, [panel, role, isRegister]);

  const resetMessages = () => {
    setErrors([]);
    setSuccess('');
    setPreviewUrl('');
  };

  const setRoleAndMode = (nextRole) => {
    setRole(nextRole);
    if (nextRole === 'admin') {
      setMode('login');
    }
    resetMessages();
    setPanel('auth');
  };

  const handleChange = (key) => (event) => {
    setForm((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const handleResetChange = (key) => (event) => {
    setResetForm((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    resetMessages();
    setLoading(true);

    try {
      if (role === 'student' && mode === 'register') {
        const response = await registerStudent({
          name: form.name,
          email: form.email,
          password: form.password,
          enrollment: form.enrollment,
          mobile: form.mobile
        });
        const payload = mapAuthPayload(response.data.data, 'student');
        auth.login(payload);
        navigate(getDashboardPath(payload.role));
        return;
      }

      if (role === 'student' && mode === 'login') {
        const response = await loginStudent({ email: form.email, password: form.password });
        const payload = mapAuthPayload(response.data.data, 'student');
        auth.login(payload);
        navigate(getDashboardPath(payload.role));
        return;
      }

      if (role === 'faculty' && mode === 'register') {
        await registerFaculty({
          name: form.name,
          email: form.email,
          collegeEmail: form.collegeEmail,
          department: form.department,
          mobile: form.mobile,
          password: form.password
        });
        setSuccess('Request submitted. Admin approval required before login.');
        return;
      }

      if (role === 'faculty' && mode === 'login') {
        const response = await loginFaculty({ email: form.email, password: form.password });
        const payload = mapAuthPayload(response.data.data, 'faculty');
        auth.login(payload);
        navigate(getDashboardPath(payload.role));
        return;
      }

      const response = await loginAdmin({ email: form.email, password: form.password });
      const payload = mapAuthPayload(response.data.data, 'admin');
      auth.login(payload);
      navigate(getDashboardPath(payload.role));
    } catch (err) {
      setErrors(getApiErrorMessages(err, 'Authentication request failed'));
    } finally {
      setLoading(false);
    }
  };

  const submitForgotPassword = async (event) => {
    event.preventDefault();
    resetMessages();
    setLoading(true);

    try {
      const response = await forgotPassword({ email: forgotEmail });
      setSuccess('If the email exists, a reset link has been sent.');
      if (response.data?.data?.previewUrl) {
        setPreviewUrl(response.data.data.previewUrl);
      }
    } catch (err) {
      setErrors(getApiErrorMessages(err, 'Unable to process forgot password'));
    } finally {
      setLoading(false);
    }
  };

  const submitResetPassword = async (event) => {
    event.preventDefault();
    resetMessages();

    if (resetForm.newPassword !== resetForm.confirmPassword) {
      setErrors(['New password and confirm password must match']);
      return;
    }

    setLoading(true);

    try {
      await resetPassword({
        email: resetForm.email,
        token: resetForm.token,
        newPassword: resetForm.newPassword
      });

      setSuccess('Password reset successful. Please login with your new password.');
      setPanel('auth');
      setMode('login');
    } catch (err) {
      setErrors(getApiErrorMessages(err, 'Unable to reset password'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <PublicLayout showNotice>
      <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr]">
        <section className="relative min-h-[280px] lg:min-h-[520px]">
          <img
            src={heroVector}
            alt="LOR portal visual"
            className="absolute inset-0 h-full w-full object-contain"
          />
        </section>

        <Card className="space-y-6">
          {panel === 'auth' && (
            <>
              <div className="space-y-3">
                <p className="text-sm font-semibold text-slate-800">Select Role</p>
                <div className="flex flex-wrap gap-2">
                  <Button variant={role === 'student' ? 'primary' : 'secondary'} onClick={() => setRoleAndMode('student')}>Student</Button>
                  <Button variant={role === 'faculty' ? 'primary' : 'secondary'} onClick={() => setRoleAndMode('faculty')}>Faculty</Button>
                  <Button variant={role === 'admin' ? 'primary' : 'secondary'} onClick={() => setRoleAndMode('admin')}>Admin</Button>
                </div>
              </div>

              {role !== 'admin' && (
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-slate-800">Select Action</p>
                  <div className="flex gap-2">
                    <Button variant={mode === 'login' ? 'primary' : 'secondary'} onClick={() => { setMode('login'); resetMessages(); }}>Login</Button>
                    <Button variant={mode === 'register' ? 'primary' : 'secondary'} onClick={() => { setMode('register'); resetMessages(); }}>Register</Button>
                  </div>
                </div>
              )}

              <form className="space-y-3" onSubmit={onSubmit}>
                <h2 className="text-xl font-semibold">{heading}</h2>
                {isRegister && <Input label="Name" value={form.name} onChange={handleChange('name')} />}
                <Input label="Email" type="email" value={form.email} onChange={handleChange('email')} />

                {role === 'student' && isRegister && (
                  <>
                    <Input label="Enrollment ID" value={form.enrollment} onChange={handleChange('enrollment')} />
                    <Input label="Mobile" value={form.mobile} onChange={handleChange('mobile')} />
                  </>
                )}

                {role === 'faculty' && isRegister && (
                  <>
                    <Input label="College Email" type="email" value={form.collegeEmail} onChange={handleChange('collegeEmail')} />
                    <Input label="Department" value={form.department} onChange={handleChange('department')} />
                    <Input label="Mobile" value={form.mobile} onChange={handleChange('mobile')} />
                  </>
                )}

                <Input label="Password" type="password" value={form.password} onChange={handleChange('password')} />

                {errors.length > 0 && (
                  <ul className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    {errors.map((message) => (
                      <li key={message}>- {message}</li>
                    ))}
                  </ul>
                )}
                {success && <p className="text-sm text-green-600">{success}</p>}

                <div className="flex flex-wrap items-center gap-3">
                  <Button type="submit" disabled={loading}>{loading ? 'Please wait...' : isRegister ? 'Submit' : 'Login'}</Button>
                  <Button type="button" variant="ghost" onClick={() => { resetMessages(); setForgotEmail(form.email || ''); setPanel('forgot'); }}>
                    Forgot Password?
                  </Button>
                </div>
              </form>
            </>
          )}

          {panel === 'forgot' && (
            <form className="space-y-3" onSubmit={submitForgotPassword}>
              <h2 className="text-xl font-semibold">{heading}</h2>
              <p className="text-sm text-slate-600">Enter your account email. For demo mode, you will get an Ethereal preview link in the response.</p>
              <Input label="Account Email" type="email" value={forgotEmail} onChange={(event) => setForgotEmail(event.target.value)} />

              {errors.length > 0 && (
                <ul className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  {errors.map((message) => (
                    <li key={message}>- {message}</li>
                  ))}
                </ul>
              )}
              {success && <p className="text-sm text-green-600">{success}</p>}
              {previewUrl && (
                <p className="text-sm text-blue-700 break-all">Preview Email: <a className="underline" href={previewUrl} target="_blank" rel="noreferrer">{previewUrl}</a></p>
              )}

              <div className="flex flex-wrap items-center gap-3">
                <Button type="submit" disabled={loading}>{loading ? 'Sending...' : 'Send Reset Link'}</Button>
                <Button type="button" variant="secondary" onClick={() => setPanel('reset')}>I Have Reset Token</Button>
                <Button type="button" variant="ghost" onClick={() => setPanel('auth')}>Back to Login</Button>
              </div>
            </form>
          )}

          {panel === 'reset' && (
            <form className="space-y-3" onSubmit={submitResetPassword}>
              <h2 className="text-xl font-semibold">{heading}</h2>
              <Input label="Email" type="email" value={resetForm.email} onChange={handleResetChange('email')} />
              <Input label="Reset Token" value={resetForm.token} onChange={handleResetChange('token')} />
              <Input label="New Password" type="password" value={resetForm.newPassword} onChange={handleResetChange('newPassword')} />
              <Input label="Confirm Password" type="password" value={resetForm.confirmPassword} onChange={handleResetChange('confirmPassword')} />

              {errors.length > 0 && (
                <ul className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                  {errors.map((message) => (
                    <li key={message}>- {message}</li>
                  ))}
                </ul>
              )}
              {success && <p className="text-sm text-green-600">{success}</p>}

              <div className="flex flex-wrap items-center gap-3">
                <Button type="submit" disabled={loading}>{loading ? 'Resetting...' : 'Reset Password'}</Button>
                <Button type="button" variant="ghost" onClick={() => setPanel('auth')}>Back to Login</Button>
              </div>
            </form>
          )}
        </Card>
      </div>
    </PublicLayout>
  );
};

export default AuthGateway;
