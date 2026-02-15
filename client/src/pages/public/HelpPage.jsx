import PublicLayout from '../../components/site/PublicLayout.jsx';

const HelpPage = () => {
  return (
    <PublicLayout>
      <section className="mx-auto max-w-3xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">Help</h1>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-base text-slate-700">
          <li>Use a valid personal email and strong password (minimum 8 characters).</li>
          <li>Students should keep enrollment ID and mobile number ready during registration.</li>
          <li>Faculty registration requires valid college email and department details.</li>
          <li>Faculty accounts can login only after admin approval.</li>
          <li>Use "Forgot Password" if you cannot login, and reset via the link sent to your email.</li>
          <li>Verify all details before submitting LOR-related requests in upcoming modules.</li>
        </ul>
      </section>
    </PublicLayout>
  );
};

export default HelpPage;
