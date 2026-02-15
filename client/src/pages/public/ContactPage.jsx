import PublicLayout from '../../components/site/PublicLayout.jsx';

const ContactPage = () => {
  return (
    <PublicLayout>
      <section className="mx-auto max-w-3xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">Contact</h1>
        <div className="mt-4 space-y-3 text-base text-slate-700">
          <p>Shamlaji Road, Modasa, District Aravalli, Gujarat, India 383315</p>
          <p>
            Email: <a className="text-blue-700 underline" href="mailto:gec-modasa-dte@gujarat.gov.in">gec-modasa-dte@gujarat.gov.in</a>
          </p>
          <p>Phone: (+91)02774 242 633/634</p>
          <p>
            Website: <a className="text-blue-700 underline" href="http://www.gecmodasa.ac.in" target="_blank" rel="noreferrer">http://www.gecmodasa.ac.in</a>
          </p>
        </div>
      </section>
    </PublicLayout>
  );
};

export default ContactPage;
