/**
 * All page copy and data, in one place.
 *
 * The FAQ and the price list are consumed twice — once by the rendered section and
 * once by the JSON-LD in `app/layout.tsx`. Google requires FAQPage markup to match
 * the visible text, so keeping a single array is what guarantees they cannot drift.
 */

export type Value = { title: string; body: string };

export const values: Value[] = [
  { title: 'Direct', body: 'No account layer, no jargon: you work with the people actually doing the work.' },
  { title: 'Accountable', body: 'Every campaign reports back to leads, activation or revenue, not vanity metrics.' },
  { title: 'Senior, not junior', body: 'Built on in-house leadership experience, not a template agency playbook.' },
  { title: 'Built to last', body: 'Sites and brand assets handed over in a state your team can actually run.' },
];

export type TrustLogo = { src: string; alt: string; width: number; height: number };

export const trustLogos: TrustLogo[] = [
  { src: '/images/logo-biachem.png', alt: 'Biachem', width: 838, height: 140 },
  { src: '/images/logo-bestinvest.png', alt: 'Bestinvest by Evelyn Partners', width: 421, height: 140 },
  { src: '/images/logo-liberty.png', alt: 'Liberty Specialty Markets', width: 296, height: 120 },
  { src: '/images/logo-fluid.png', alt: 'fluid.co.uk', width: 174, height: 100 },
  { src: '/images/logo-citi.png', alt: 'Citi', width: 177, height: 120 },
  { src: '/images/logo-3ntt.png', alt: '3NTT Group', width: 149, height: 140 },
];

export type Service = { num: string; title: string; body: string; items: string[] };

export const services: Service[] = [
  {
    num: '01',
    title: 'Performance marketing',
    body: "Google Ads campaigns, lead generation through comparison sites & bloggers, and growing your firm's positioning on Google, all built to be measured against pipeline, not clicks.",
    items: [
      'Google Ads & paid search',
      'Lead generation through comparison sites & bloggers',
      "Growing your firm's positioning on Google",
      'Reporting tied to leads and revenue',
    ],
  },
  {
    num: '02',
    title: 'Graphic design',
    body: 'Brand identity work that scales from a logo to a brochure to a full web presence, consistent wherever it’s seen.',
    items: ['Logos & branding', 'Brochures and Annual Reports', 'Web & landing page design', 'Creative campaigns'],
  },
  {
    num: '03',
    title: 'Web build',
    body: 'WordPress builds that a marketing team can actually run: fast, editable, and set up to support the campaigns above.',
    items: [
      'WordPress design & build',
      'Site migrations & rebuilds',
      'Built so Google can find you from day one',
      'Ongoing site management',
    ],
  },
];

export type Price = { title: string; from: number; note?: string };

export const prices: Price[] = [
  { title: 'Logo design / refresh', from: 1000 },
  { title: 'Brand refresh', from: 2000 },
  { title: 'Google Ads set-up', from: 750, note: '3 adverts and tracking set up' },
  { title: 'Lead generation 12 month plan', from: 1000, note: 'Actionable media plan for a range of budgets' },
  { title: 'New website: design & build on WordPress', from: 1000, note: 'Onwards, scoped to your project' },
  {
    title: 'Social media 12 month plan',
    from: 750,
    note: 'Action plan across LinkedIn to promote your business, including a competitor review',
  },
];

export const formatPrice = (n: number) => `£${n.toLocaleString('en-GB')}`;

export type Stat = { value: string; label: string };
export type CaseStudy = {
  name: string;
  sector: string;
  role: string;
  desc: string;
  stats?: Stat[];
  shot?: { src: string; alt: string; width: number; height: number; chrome: boolean };
  compare?: { src: string; alt: string; width: number; height: number };
  link?: { href: string; label: string };
};

export const caseStudies: CaseStudy[] = [
  {
    name: 'Biachem',
    sector: 'UK chemical distributor',
    role: 'Freelance · web, design & ads',
    desc: "Owned the end-to-end delivery of Biachem's new global website, briefing and directing developers and designers for the CEO and board, then launched the Google Ads campaigns and SEO programme to put it to work.",
    stats: [
      { value: '+20%', label: 'sales leads from Google Ads' },
      { value: '+40%', label: 'web traffic from SEO & content' },
    ],
    shot: { src: '/images/work-biachem-website.jpg', alt: 'Biachem website homepage', width: 640, height: 380, chrome: true },
  },
  {
    name: 'Bestinvest',
    sector: 'Retail investment platform, Evelyn Partners',
    role: 'In-house · growth & proposition',
    desc: 'Led growth and proposition strategy across ISAs, SIPPs and managed portfolios for a £3bn+ platform, and built partnership marketing with Vanguard, HSBC and Artemis, all within FCA financial promotion rules.',
    stats: [
      { value: '£3bn+', label: 'platform AUM marketed' },
      { value: '3', label: 'major asset-manager partnerships' },
    ],
    shot: { src: '/images/work-bestinvest-website.jpg', alt: 'Bestinvest website homepage', width: 776, height: 460, chrome: true },
  },
  {
    name: 'Liberty Specialty Markets',
    sector: 'Commercial & specialty insurance, Liberty Mutual',
    role: 'In-house · digital marketing lead',
    desc: 'Ran broker-facing marketing across Europe, covering thought leadership, website and social content, while coaching a small team spanning Europe and APAC and improving board-level reporting.',
    stats: [
      { value: '+30%', label: 'digital engagement' },
      { value: 'EU/APAC', label: 'team & markets led' },
    ],
    shot: { src: '/images/work-liberty-website.jpg', alt: 'Liberty Specialty Markets website homepage', width: 754, height: 446, chrome: true },
  },
  {
    name: 'fluid.co.uk',
    sector: 'Balance transfer credit card, NewDay',
    role: 'In-house · partnerships & acquisition',
    desc: 'Owned P&L and acquisition strategy for the Fluid card, negotiating exclusive partner marketing with ClearScore and Experian and rebuilding the on-site balance-transfer journey.',
    stats: [
      { value: '+10%', label: 'acquisition record broken' },
      { value: '+15%', label: 'card activation rate' },
    ],
    shot: { src: '/images/work-fluid-website.jpg', alt: 'Fluid balance transfer credit card website', width: 720, height: 336, chrome: true },
  },
  {
    name: 'Biachem: brand and print',
    sector: 'UK chemical distributor',
    role: 'Design by Ludo · brand identity',
    desc: 'Replaced a dated, text-only website and print pack with a cohesive identity system, including a refreshed hexagon mark, trifold brochures and warehouse & supplier location maps that match the new site.',
    compare: { src: '/images/work-biachem-brand.jpg', alt: 'New Biachem brand collateral and brochure', width: 640, height: 480 },
  },
  {
    name: '3NTT Group',
    sector: 'International defence & security',
    role: 'Design by Ludo · brand identity',
    desc: 'Full brand identity refresh for an international defence and security company: logo restyling, visual identity and website, delivered 2021–2024.',
    shot: { src: '/images/work-3ntt-stationery.jpg', alt: '3NTT Group stationery and letterhead', width: 800, height: 475, chrome: false },
    link: { href: 'https://designedbyludo.com/project/3ntt-group-security-solutions/', label: 'View the case study →' },
  },
];

export type TeamMember = {
  name: string;
  role: string;
  bio: string;
  aside?: string;
  tags: string[];
  photo?: { src: string; alt: string; width: number; height: number };
  link?: { href: string; label: string };
};

export const team: TeamMember[] = [
  {
    name: 'William Pointing',
    role: 'Co-Founder & Performance Marketing',
    bio: 'Over a decade leading marketing inside regulated financial services brands. Runs strategy, Google Ads and lead-gen partnerships for every Pointing Forward client.',
    aside:
      '“Outside of work, I run a money-saving blog, GreatDealsMadeEasy.com, and enjoy writing about marketing trends and human behaviour.”',
    tags: ['Google Ads', 'Strategy', 'Comparison sites & bloggers', 'Campaign management'],
    photo: { src: '/images/team-william-pointing.jpg', alt: 'William Pointing', width: 500, height: 666 },
    link: { href: 'https://greatdealsmadeeasy.com', label: 'greatdealsmadeeasy.com →' },
  },
  {
    name: 'Ludovica “Ludo” Quaranta',
    role: 'Co-Founder, Brand & Design Partner',
    bio: "Started her career in Milan before moving to London, where she's spent close to a decade building brand identity, including logos, brochures and visual systems, for organisations that need to close the gap between what they do and how they're perceived.",
    aside:
      '“Alongside client work, I co-founded Eco Around, helped build Engineering Minds, and facilitate environmental workshops including Climate Fresk and Plastic Collage.”',
    tags: ['Brand identity', 'Logo design', 'Print'],
    photo: { src: '/images/team-ludo-quaranta.jpg', alt: 'Ludovica Quaranta', width: 400, height: 400 },
    link: { href: 'https://designedbyludo.com', label: 'designedbyludo.com →' },
  },
  {
    name: 'Rahib',
    role: 'Web Developer',
    bio: 'Builds and maintains the WordPress sites behind every campaign: fast, editable themes that a marketing team can update without calling a developer every time.',
    tags: ['WordPress', 'Site builds', 'Maintenance'],
    photo: { src: '/images/team-rahib.jpg', alt: 'Rahib', width: 400, height: 400 },
  },
  {
    name: 'The wider network',
    role: 'Freelance Partners',
    bio: 'Beyond the core team, we work with a trusted bench of freelance project managers, photographers and marketing strategists, brought in project by project so every client gets the right specialist, without carrying agency overhead.',
    tags: ['Project management', 'Photography', 'Strategy'],
  },
];

export type Testimonial = { quote: string; author: string; org: string };

export const testimonials: Testimonial[] = [
  {
    quote:
      "William rebuilt our website from the ground up and had the new Google Ads campaigns live within weeks. Leads went up within the first month and haven't dropped off since.",
    author: 'Managing Director',
    org: 'Biachem',
  },
  {
    quote:
      'Ludo and I have been working together for 5 years now, and she has helped me transform Monty as an organisation. She initially refreshed my brand to give it more impact for my target audience and made it look more modern and relevant. She created a fantastic, usable and visually appealing website that has really helped push my business forward.',
    author: 'Jon Edwards',
    org: 'Director at Monty English',
  },
  {
    quote:
      "Super easy to work with. Rahib's biggest strengths are his knowledge of the technology, being self-driven, and his willingness to communicate about the pros and cons of any change/project.",
    author: 'Meteorologist',
    org: 'Client',
  },
];

/**
 * FAQ — DRAFTED FOR SIGN-OFF.
 * Every answer is assembled from statements already made elsewhere on the page
 * (services, prices, founder background, the free consultation offer). Nothing is
 * invented, but nothing has been approved either. William should read all eight
 * before launch, in particular the pricing summary and the regulated-industry claims.
 */
export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: 'What does Pointing Forward Marketing do?',
    a: 'Three things: performance marketing (Google Ads, paid search and lead generation), brand and graphic design (logos, brochures, annual reports and campaign creative), and website design and build on WordPress. Most clients take a combination: a brand refresh and the site that carries it, or a new site and the ad campaigns that feed it.',
  },
  {
    q: 'Where are you based?',
    a: 'South London. We work with clients across the UK, and both founders have run marketing across European and international markets.',
  },
  {
    q: 'How much does it cost to work with you?',
    a: 'Logo design or refresh starts at £1,000 and a full brand refresh at £2,000. Google Ads set-up starts at £750, including three adverts and tracking. A 12-month lead generation plan starts at £1,000 and a 12-month social plan at £750. A new WordPress site starts at £1,000, scoped to the project. Every project is quoted after a free 30 minute consultation.',
  },
  {
    q: 'Who actually does the work?',
    a: 'William Pointing and Ludo Quaranta, the two founders. William runs strategy, Google Ads and lead-generation partnerships; Ludo runs brand identity, logo design and print. Rahib builds and maintains the WordPress sites. There is no account layer and no handover to a junior team.',
  },
  {
    q: 'What industries do you specialise in?',
    a: "William has over a decade's experience leading marketing in insurance, retail investment platforms, commodities and consumer credit, including work delivered inside FCA financial promotion rules. Ludo brings a decade of independent brand identity work across different sectors, with a focus on purpose-driven organisations.",
  },
  {
    q: 'Can you run Google Ads for a regulated business?',
    a: 'Yes. William led growth and proposition marketing for a £3bn+ retail investment platform and ran broker-facing marketing for a commercial and specialty insurer, both under financial promotion rules. Campaigns are built to survive a compliance review, not just an ad auction.',
  },
  {
    q: 'Do you work with businesses that have no marketing team?',
    a: 'That is most of our work. Pointing Forward exists to bring in-house rigour to businesses that do not have an in-house team, which means reporting tied to leads, activation and revenue rather than vanity metrics.',
  },
  {
    q: 'How do we get started?',
    a: 'Book a free 30 minute consultation. We will talk through what you are dealing with and what it would take, and you will get an accurate quote afterwards. There is no obligation and no pitch deck.',
  },
];

export const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#work', label: 'Work' },
  { href: '#team', label: 'Team' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' },
] as const;
