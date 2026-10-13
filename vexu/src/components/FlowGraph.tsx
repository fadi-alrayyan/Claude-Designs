import { useReducedMotion } from 'framer-motion';
import { Bot, CalendarCheck, Database, Globe2, Mail, MessageCircle, Phone, Send, Webhook, type LucideIcon } from 'lucide-react';

type Node = { icon: LucideIcon; title: string; detail: string };

const inputs: Node[] = [
  { icon: Phone, title: 'Phone call', detail: 'Forwarded business line' },
  { icon: MessageCircle, title: 'WhatsApp', detail: 'Business API' },
  { icon: Globe2, title: 'Website', detail: 'Chat and voice widget' },
  { icon: Webhook, title: 'Webhook', detail: 'Any system event' },
];

const outputs: Node[] = [
  { icon: CalendarCheck, title: 'Book meeting', detail: 'Wed, 3:00 PM' },
  { icon: Mail, title: 'Send email', detail: 'Proposal follow-up' },
  { icon: Send, title: 'WhatsApp reply', detail: 'Confirmation sent' },
  { icon: Database, title: 'Update CRM', detail: 'Lead qualified' },
];

// Coordinate system shared by the SVG wires and the HTML nodes (percent of 1000 x 540).
const W = 1000;
const H = 540;
const rows = [96, 216, 336, 456];
const IN_X = 130;
const OUT_X = 870;
const NODE_HALF = 100;
const AGENT = { x: 500, y: 276, half: 110 };

const inPaths = rows.map((y) => `M ${IN_X + NODE_HALF} ${y} C ${IN_X + 210} ${y}, ${AGENT.x - 200} ${AGENT.y}, ${AGENT.x - AGENT.half} ${AGENT.y}`);
const outPaths = rows.map((y) => `M ${AGENT.x + AGENT.half} ${AGENT.y} C ${AGENT.x + 200} ${AGENT.y}, ${OUT_X - 210} ${y}, ${OUT_X - NODE_HALF} ${y}`);

const pct = (value: number, of: number) => `${(value / of) * 100}%`;

function NodeCard({ node, accent = false }: { node: Node; accent?: boolean }) {
  const Icon = node.icon;
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-ink-2/95 px-3.5 py-3 backdrop-blur">
      <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${accent ? 'bg-signal text-ink' : 'bg-white/[0.07] text-signal-soft'}`}>
        <Icon className="h-4 w-4" />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-medium text-paper">{node.title}</span>
        <span className="block truncate text-xs text-paper/50">{node.detail}</span>
      </span>
    </div>
  );
}

function AgentCard() {
  return (
    <div className="rounded-[22px] border border-signal/40 bg-ink-2 p-4 shadow-[0_0_0_6px_rgba(0,200,100,0.06),0_20px_50px_-20px_rgba(0,200,100,0.45)]">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-signal text-ink">
          <Bot className="h-5 w-5" />
        </span>
        <span>
          <span className="block text-[15px] font-semibold text-paper">Front desk agent</span>
          <span className="flex items-center gap-1.5 text-xs text-signal-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-signal" /> Live on 4 channels
          </span>
        </span>
      </div>
      <dl className="mt-4 grid gap-1.5 text-xs">
        <div className="flex justify-between rounded-lg bg-white/[0.05] px-2.5 py-2">
          <dt className="text-paper/50">Knowledge</dt>
          <dd className="text-paper/85">3 documents</dd>
        </div>
        <div className="flex justify-between rounded-lg bg-white/[0.05] px-2.5 py-2">
          <dt className="text-paper/50">Calendar</dt>
          <dd className="text-paper/85">Outlook, Google</dd>
        </div>
      </dl>
    </div>
  );
}

export function FlowGraph({ caption = true }: { caption?: boolean }) {
  const reducedMotion = useReducedMotion();
  const label = 'A VEXU Portal workflow: phone, WhatsApp, website and webhook channels feed one AI agent, which books meetings, sends emails and WhatsApp replies, and updates the CRM.';

  return (
    <figure className="instrument p-4 sm:p-6" aria-label={label}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-[0.35] [background-image:radial-gradient(rgba(139,230,180,0.25)_1px,transparent_1px)] [background-size:22px_22px]" />

      {/* Desktop: wired canvas */}
      <div className="relative hidden aspect-[1000/540] lg:block" aria-hidden="true">
        <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" fill="none">
          {[...inPaths, ...outPaths].map((d, index) => (
            <path key={index} d={d} stroke="rgba(139,230,180,0.35)" strokeWidth="1.5" strokeDasharray="4 6" />
          ))}
          {!reducedMotion &&
            [...inPaths, ...outPaths].map((d, index) => (
              <circle key={`pulse-${index}`} r="3.5" fill="#00C864">
                <animateMotion dur="2.6s" repeatCount="indefinite" begin={`${(index % 4) * 0.65 + (index >= 4 ? 1.3 : 0)}s`} path={d} />
                <animate attributeName="opacity" values="0;1;1;0" dur="2.6s" repeatCount="indefinite" begin={`${(index % 4) * 0.65 + (index >= 4 ? 1.3 : 0)}s`} />
              </circle>
            ))}
        </svg>
        {rows.map((y, index) => (
          <div key={`in-${index}`} className="absolute w-[20%] -translate-x-1/2 -translate-y-1/2" style={{ left: pct(IN_X, W), top: pct(y, H) }}>
            <NodeCard node={inputs[index]} />
          </div>
        ))}
        <div className="absolute w-[22%] -translate-x-1/2 -translate-y-1/2" style={{ left: pct(AGENT.x, W), top: pct(AGENT.y, H) }}>
          <AgentCard />
        </div>
        {rows.map((y, index) => (
          <div key={`out-${index}`} className="absolute w-[20%] -translate-x-1/2 -translate-y-1/2" style={{ left: pct(OUT_X, W), top: pct(y, H) }}>
            <NodeCard node={outputs[index]} accent={index === 0} />
          </div>
        ))}
      </div>

      {/* Mobile and tablet: the same flow, stacked */}
      <div className="relative grid gap-3 lg:hidden" aria-hidden="true">
        <p className="text-xs text-paper/50">Channels</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {inputs.map((node) => (
            <NodeCard key={node.title} node={node} />
          ))}
        </div>
        <span className="mx-auto h-8 w-px bg-gradient-to-b from-signal-soft/10 to-signal-soft/60" />
        <AgentCard />
        <span className="mx-auto h-8 w-px bg-gradient-to-b from-signal-soft/60 to-signal-soft/10" />
        <p className="text-xs text-paper/50">Actions</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {outputs.map((node, index) => (
            <NodeCard key={node.title} node={node} accent={index === 0} />
          ))}
        </div>
      </div>

      {caption && <figcaption className="relative mt-4 text-center text-xs text-paper/45 lg:mt-2">One agent. Every channel. Real actions.</figcaption>}
    </figure>
  );
}
