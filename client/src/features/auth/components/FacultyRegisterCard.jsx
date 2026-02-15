import { useState } from 'react';
import Card from '../../../components/ui/Card.jsx';
import Input from '../../../components/ui/Input.jsx';
import Button from '../../../components/ui/Button.jsx';
import { registerFaculty } from '../auth.api.js';

const FacultyRegisterCard = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    collegeEmail: '',
    department: '',
    mobile: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (key) => (event) => {
    setForm((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await registerFaculty(form);
      setSuccess('Request submitted. Admin approval required before login.');
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to submit request');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="space-y-4">
      <h2 className="text-2xl font-semibold">Faculty Register</h2>
      <form className="space-y-3" onSubmit={handleSubmit}>
        <Input label="Name" placeholder="Faculty name" value={form.name} onChange={handleChange('name')} />
        <Input label="Personal Email" type="email" placeholder="name@gmail.com" value={form.email} onChange={handleChange('email')} />
        <Input label="College Email" type="email" placeholder="faculty@college.edu" value={form.collegeEmail} onChange={handleChange('collegeEmail')} />
        <Input label="Department" placeholder="Computer Science" value={form.department} onChange={handleChange('department')} />
        <Input label="Mobile" placeholder="+91 90000 00000" value={form.mobile} onChange={handleChange('mobile')} />
        <Input label="Password" type="password" placeholder="Set password" value={form.password} onChange={handleChange('password')} />
        {error && <p className="text-sm text-red-600">{error}</p>}
        {success && <p className="text-sm text-green-600">{success}</p>}
        <Button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Request Access'}</Button>
      </form>
    </Card>
  );
};

export default FacultyRegisterCard;
