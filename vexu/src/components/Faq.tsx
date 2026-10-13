import { useId, useState } from 'react';
import { Plus } from 'lucide-react';

export function Faq({ items }: { items: [string, string][] }) {
  return (
    <div className="border-t border-line">
      {items.map(([question, answer]) => (
        <FaqItem key={question} question={question} answer={answer} />
      ))}
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  return (
    <div className="border-b border-line">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={id}
          onClick={() => setOpen((value) => !value)}
          className="flex w-full items-center justify-between gap-6 py-6 text-left text-[1.08rem] font-semibold"
        >
          {question}
          <Plus className={`h-5 w-5 shrink-0 text-signal-deep transition-transform duration-300 ${open ? 'rotate-45' : ''}`} aria-hidden="true" />
        </button>
      </h3>
      <div id={id} aria-hidden={!open} className={`grid transition-[grid-template-rows] duration-300 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <p className="max-w-2xl pb-6 text-slate">{answer}</p>
        </div>
      </div>
    </div>
  );
}
