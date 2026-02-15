import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import collegeLogo from '../../../assets/Clg_logo.png';

const navLinkClass = ({ isActive }) => {
  const base = 'rounded-md px-3 py-1.5 text-sm font-medium transition';
  return isActive
    ? `${base} bg-blue-100 text-blue-700`
    : `${base} text-slate-700 hover:bg-slate-100`;
};

const PublicLayout = ({ children, showNotice = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-4 sm:px-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src={collegeLogo}
                alt="Government Engineering College, Modasa logo"
                className="h-20 w-20 rounded-md border border-slate-200 object-contain bg-white p-1 shadow-sm"
              />
              <div>
                <p className="text-xl font-bold leading-tight">Government Engineering College, Modasa</p>
                <p className="text-sm text-slate-600">(Affiliated to GTU)</p>
                <p className="text-base text-slate-700">Computer Engineering Department</p>
              </div>
            </div>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 md:hidden"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? 'Close' : 'Menu'}
            </button>
          </div>

          <nav className="mt-4 hidden flex-wrap gap-2 md:flex">
            <NavLink to="/" className={navLinkClass}>Home</NavLink>
            <NavLink to="/about" className={navLinkClass}>About</NavLink>
            <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
            <NavLink to="/help" className={navLinkClass}>Help</NavLink>
          </nav>

          <nav className={`${mobileMenuOpen ? 'mt-4 grid gap-2' : 'hidden'} md:hidden`}>
            <NavLink to="/" className={navLinkClass} onClick={closeMobileMenu}>Home</NavLink>
            <NavLink to="/about" className={navLinkClass} onClick={closeMobileMenu}>About</NavLink>
            <NavLink to="/contact" className={navLinkClass} onClick={closeMobileMenu}>Contact</NavLink>
            <NavLink to="/help" className={navLinkClass} onClick={closeMobileMenu}>Help</NavLink>
          </nav>
        </div>
      </header>

      {showNotice && (
        <div className="border-b border-blue-100 bg-blue-50">
          <div className="mx-auto w-full max-w-6xl overflow-hidden px-4 py-2 sm:px-6">
            <p className="notice-marquee whitespace-nowrap text-sm font-medium text-blue-800">
              Notice: Important announcements and college circulars will appear here in the next phase.
            </p>
          </div>
        </div>
      )}

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6">
        {children}
      </main>

      <footer className="border-t border-slate-800 bg-slate-900">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="text-sm leading-7 text-slate-300">
            Government Engineering College, Modasa was established in 1984 under the Directorate of Technical
            Education, Gujarat State, Gandhinagar in North Gujarat region with a view to spread out technical
            education in the region and hence promote industrial development. The institute was affiliated with
            Hemchandracharaya North Gujarat University (HNGU), Patan from 1984 to 2007. The institute is affiliated
            to Gujarat Technological University, Ahmedabad from 2008. It is recognized by All India Council for
            Technical Education (AICTE), New Delhi.
          </div>
          <div className="space-y-3 text-sm text-slate-200">
            <p className="text-base font-semibold text-white">Useful Links</p>
            <NavLink className="block hover:text-white" to="/contact">Contact Support</NavLink>
            <NavLink className="block hover:text-white" to="/help">Help</NavLink>
            <p className="text-slate-300">LOR Guidelines (Coming Soon)</p>
            <p className="text-slate-300">FAQ (Coming Soon)</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
