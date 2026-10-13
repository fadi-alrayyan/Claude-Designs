import { Link } from 'react-router-dom';
import { usePageMeta } from '../components/usePageMeta';

export function NotFoundPage() {
  usePageMeta('Page not found: VEXU');
  return (
    <section className="flex min-h-[80vh] items-center pb-20 pt-32">
      <div className="shell">
        <p className="text-slate">Error 404</p>
        <h1 className="h1 mt-4 max-w-3xl">This number isn't in service.</h1>
        <p className="lede mt-6">The page you're looking for has moved or never existed. Try one of these instead.</p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link to="/" className="btn-primary">
            Go to the homepage
          </Link>
          <Link to="/company#contact" className="btn-secondary">
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
