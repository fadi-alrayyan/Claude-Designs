import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, Lock } from 'lucide-react';
import { useActions } from '../components/Actions';
import { Logo } from '../components/Logo';
import { usePageMeta } from '../components/usePageMeta';
import { launch } from '../config/launch';

export function LoginPage() {
  const { openDemo } = useActions();
  const [showPassword, setShowPassword] = useState(false);
  const [notice, setNotice] = useState(false);
  usePageMeta('Log in to VEXU Portal');

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: replace with the Portal's real auth flow.
    if (launch.portalUrl) {
      window.location.href = launch.portalUrl;
      return;
    }
    setNotice(true);
  };

  return (
    <main id="main" className="grid min-h-screen bg-porcelain lg:grid-cols-2">
      <section className="flex flex-col px-4 py-6 sm:px-10 lg:px-16">
        <header className="flex items-center justify-between">
          <Link to="/" aria-label="VEXU home">
            <Logo />
          </Link>
          <Link to="/" className="inline-flex items-center gap-1.5 text-[15px] text-slate transition-colors hover:text-ink">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to site
          </Link>
        </header>

        <div className="mx-auto flex w-full max-w-[24rem] flex-1 flex-col justify-center py-16">
          <h1 className="h2">Welcome back.</h1>
          <p className="mt-4 text-slate">Log in to build, deploy and monitor your AI agents.</p>

          <form onSubmit={submit} className="mt-10 grid gap-5">
            <label>
              <span className="label">Work email</span>
              <input name="email" type="email" required autoComplete="email" className="field" />
            </label>
            <div>
              <div className="flex items-baseline justify-between">
                <label htmlFor="password" className="label">
                  Password
                </label>
                <Link to="/company#contact" className="text-sm text-signal-deep hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input id="password" name="password" type={showPassword ? 'text' : 'password'} required autoComplete="current-password" className="field pr-12" />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate hover:text-ink"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <label className="flex items-center gap-3 text-[15px] text-slate">
              <input type="checkbox" name="remember" defaultChecked className="h-4 w-4 rounded accent-[#00824A]" />
              Keep me logged in on this device
            </label>
            <button type="submit" className="btn-ink mt-2 w-full">
              Log in
            </button>
            {notice && (
              <p role="status" className="rounded-xl border border-line bg-paper p-4 text-[15px] text-slate">
                Portal accounts open with your onboarding. <button type="button" onClick={openDemo} className="link">Book a demo</button> to get yours.
              </p>
            )}
          </form>

          <p className="mt-8 text-[15px] text-slate">
            New to VEXU Portal?{' '}
            <button type="button" onClick={openDemo} className="link">
              Book a demo
            </button>
          </p>
          <p className="mt-10 flex items-center gap-2 text-sm text-slate/80">
            <Lock className="h-3.5 w-3.5" aria-hidden="true" /> Encrypted session. Every conversation logged.
          </p>
        </div>
      </section>

      <aside className="relative hidden overflow-hidden bg-ink p-16 text-paper lg:flex lg:flex-col lg:justify-center" aria-hidden="true">
        <div className="pointer-events-none absolute -right-32 -top-32 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(closest-side,rgba(0,200,100,0.22),transparent)]" />
        <div className="relative w-full max-w-md rounded-[24px] border border-white/10 bg-ink-2 p-6">
          <div className="flex items-center justify-between">
            <p className="font-semibold">Acme Clinic</p>
            <p className="flex items-center gap-2 text-sm text-signal-soft">
              <span className="h-1.5 w-1.5 rounded-full bg-signal shadow-[0_0_10px_rgba(0,200,100,0.9)]" /> Live call
            </p>
          </div>
          <p className="mt-1 text-sm text-paper/50">Forwarded business line</p>
          <p className="mt-6 text-lg leading-snug">“Thursday afternoon is open. Shall I send the invite?”</p>
          <p className="mt-6 text-sm text-paper/50">Front desk agent, answering on phone, WhatsApp and web chat</p>
        </div>
        <div className="relative mt-16 max-w-md">
          <p className="display text-[2.6rem]">Work that moves while you do.</p>
          <p className="mt-4 max-w-md text-paper/60">One layer for every customer conversation: one team, one context, one clear next step.</p>
        </div>
      </aside>
    </main>
  );
}
