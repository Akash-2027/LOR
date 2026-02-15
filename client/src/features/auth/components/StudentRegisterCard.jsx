import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../../../components/ui/Card.jsx';
import Input from '../../../components/ui/Input.jsx';
import Button from '../../../components/ui/Button.jsx';
import { registerStudent } from '../auth.api.js';
import useAuth from '../../../hooks/useAuth.js';
import { getDashboardPath, mapAuthPayload } from '../utils/authHelpers.js';

const StudentRegisterCard = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    enrollment: '',
    mobile: ''
  });
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
      const response = await registerStudent(form);
      const payload = mapAuthPayload(response.data.data, 'student');
      auth.login(payload);
      navigate(getDashboardPath(payload.role));
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to register student');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="space-y-4">
      <h2 className="text-2xl font-semibold">Student Register</h2>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <Input label="Name" placeholder="Full name" value={form.name} onChange={handleChange('name')} />
        <Input label="Email" type="email" placeholder="student@college.edu" value={form.email} onChange={handleChange('email')} />
        <Input label="Enrollment ID" placeholder="19BCE1234" value={form.enrollment} onChange={handleChange('enrollment')} />
        <Input label="Mobile" placeholder="+91 90000 00000" value={form.mobile} onChange={handleChange('mobile')} />
        <Input label="Password" type="password" placeholder="Create password" value={form.password} onChange={handleChange('password')} />
        {error && <p className="text-sm text-red-600">{error}</p>}
        <Button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Register Student'}</Button>
      </form>
    </Card>
  );
};

export default StudentRegisterCard;
