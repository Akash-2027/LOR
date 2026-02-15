import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../../components/ui/Card.jsx';
import Input from '../../../components/ui/Input.jsx';
import Button from '../../../components/ui/Button.jsx';
import { loginAdmin } from '../auth.api.js';
import useAuth from '../../../hooks/useAuth.js';
import { getDashboardPath, mapAuthPayload } from '../utils/authHelpers.js';

const AdminLoginCard = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (key) => (event) => {
    setForm((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await loginAdmin(form);
      const payload = mapAuthPayload(response.data.data, 'admin');
      auth.login(payload);
      navigate(getDashboardPath(payload.role));
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="space-y-4">
      <h2 className="text-2xl font-semibold">Admin Login</h2>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <Input label="Admin Email" type="email" placeholder="admin@college.edu" value={form.email} onChange={handleChange('email')} />
        <Input label="Password" type="password" placeholder="Admin password" value={form.password} onChange={handleChange('password')} />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button type="submit" disabled={loading}>{loading ? 'Signing in...' : 'Login'}</Button>
      </form>
    </Card>
  );
};

export default AdminLoginCard;
