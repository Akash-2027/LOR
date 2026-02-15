import useAuth from '../../hooks/useAuth.js';
import Button from '../../components/ui/Button.jsx';

const AdminDashboard = () => {
  const { user, logout } = useAuth();

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
      <section className="mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Admin Dashboard</h1>
        <p className="mt-2 text-sm text-slate-600">Welcome, {user?.name || 'Admin'}.</p>
        <p className="mt-4 text-sm text-slate-700">Authentication completed successfully.</p>
        <Button className="mt-6" onClick={logout}>Logout</Button>
      </section>
    </main>
  );
};

export default AdminDashboard;
