import PublicLayout from '../../components/site/PublicLayout.jsx';

const AboutPage = () => {
  return (
    <PublicLayout>
      <section className="mx-auto max-w-3xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">About</h1>
        <p className="mt-3 text-base text-slate-700">
          This page is under construction. Detailed portal overview and process information will be added in the next phase.
        </p>
      </section>
    </PublicLayout>
  );
};

export default AboutPage;
