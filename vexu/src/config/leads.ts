// Form submissions. Set VITE_LEADS_ENDPOINT (e.g. a Formspree, HubSpot or your own
// API URL) and every form on the site POSTs JSON there. Without it, submissions
// succeed locally so the flows can be previewed.
export type LeadKind = 'early-access' | 'demo' | 'contact';

export async function submitLead(kind: LeadKind, data: Record<string, string>) {
  const endpoint = import.meta.env.VITE_LEADS_ENDPOINT as string | undefined;
  if (!endpoint) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return;
  }
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ kind, ...data, page: window.location.pathname }),
  });
  if (!response.ok) throw new Error(`Lead submission failed with ${response.status}`);
}
