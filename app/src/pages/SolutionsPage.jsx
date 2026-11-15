import React from 'react';
import { InfoPage } from '../components/InfoPage';

const ITEMS = [
  {
    slug: 'launch-your-business-online',
    title: 'Launch your business online',
    desc: 'Build a website with AI and let it bring in customers.',
    points: ['Free domain for the first year', 'Free SSL certificate', 'One-click WordPress', 'Business email included'],
    cta: 'See web hosting plans',
    href: '/pricing?cat=web'
  },
  {
    slug: 'create-websites-with-ai',
    title: 'Create websites with AI',
    desc: 'Turn your idea into a website in minutes.',
    points: ['Describe your business and get a site', '100+ designer templates', 'Built-in staging', 'Publish in minutes'],
    cta: 'See WordPress plans',
    href: '/pricing?cat=wordpress'
  },
  {
    slug: 'ai-app-builder',
    title: 'AI app builder',
    desc: 'Build and launch web apps without coding.',
    points: ['Node.js, Python and PHP runtimes', 'Docker containers', 'Managed databases', 'One-click deploy'],
    cta: 'See container plans',
    href: '/pricing?cat=docker'
  },
  {
    slug: 'rebuild-your-site-with-ai',
    title: 'Rebuild your site with AI',
    desc: 'Recreate and improve your existing website.',
    points: ['Free migration', 'Staging environment', 'SEO-ready output', 'No downtime switch'],
    cta: 'See WordPress plans',
    href: '/pricing?cat=wordpress'
  },
  {
    slug: 'take-bookings-online',
    title: 'Take bookings online',
    desc: 'Let customers book and pay online.',
    points: ['Payment-ready hosting', 'Email notifications', 'Global CDN', 'Scale as bookings grow'],
    cta: 'See web hosting plans',
    href: '/pricing?cat=web'
  },
  {
    slug: 'start-from-a-template',
    title: 'Start from a template',
    desc: 'Start with an existing project and make it your own.',
    points: ['Ready-made site templates', 'One-click install', 'Free SSL', 'Upgrade anytime'],
    cta: 'See web hosting plans',
    href: '/pricing?cat=web'
  }
];

export const SolutionsPage = ({ slug }) => (
  <InfoPage
    base="solutions"
    label="Solutions"
    title="What do you want to build?"
    subtitle="Pick a goal and we will show you the right product and plans for it."
    items={ITEMS}
    slug={slug}
  />
);
