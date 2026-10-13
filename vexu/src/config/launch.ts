// Single source of truth for launch status. Flip `status` to 'available' and add
// store URLs when the app ships; every CTA and badge on the site follows it.
export type LaunchStatus = 'prelaunch' | 'available';

export const launch = {
  status: 'prelaunch' as LaunchStatus,
  market: 'the USA',
  date: 'August 2026',
  appStoreUrl: '',
  googlePlayUrl: '',
  // Where Portal customers sign in (e.g. 'https://app.vexu.ai'). Empty = sign-in not open yet.
  portalUrl: '',
};

export const isAvailable = launch.status === 'available';

export const company = {
  legalName: 'VEXU AI Labs Technologies L.L.C.',
  addressLines: ['Dubai CommerCity, Building B1, Office 501', 'Umm Ramool, Dubai, United Arab Emirates'],
  socials: [
    { label: 'X', href: 'https://x.com/vexuai' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/vexuai' },
    { label: 'Instagram', href: 'https://www.instagram.com/vexuai' },
    { label: 'Facebook', href: 'https://www.facebook.com/vexuai' },
    { label: 'TikTok', href: 'https://www.tiktok.com/@vexuai' },
  ],
};
