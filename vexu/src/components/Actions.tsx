import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { Dialog } from './Dialog';
import { DemoForm, EarlyAccessForm } from './Forms';
import { launch } from '../config/launch';

type Actions = { openEarlyAccess: () => void; openDemo: () => void };
const ActionsContext = createContext<Actions | null>(null);

export function useActions() {
  const actions = useContext(ActionsContext);
  if (!actions) throw new Error('useActions must be used inside ActionsProvider');
  return actions;
}

export function ActionsProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState<'early' | 'demo' | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const actions = useMemo<Actions>(
    () => ({ openEarlyAccess: () => setOpen('early'), openDemo: () => setOpen('demo') }),
    [],
  );

  return (
    <ActionsContext.Provider value={actions}>
      {children}
      <Dialog
        open={open === 'early'}
        onClose={close}
        title="Be first on your phone"
        description={`VEXU arrives on the App Store and Google Play in ${launch.market} first. Leave your email and you'll get the download link before anyone else, with launch pricing locked for your first year.`}
      >
        <EarlyAccessForm onDone={close} />
      </Dialog>
      <Dialog
        open={open === 'demo'}
        onClose={close}
        title="See your AI front line"
        description="Tell us a little about your business. We'll come back with a demo built around your channels and the calls you get."
      >
        <DemoForm onDone={close} />
      </Dialog>
    </ActionsContext.Provider>
  );
}
