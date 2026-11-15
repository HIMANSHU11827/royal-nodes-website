import React from 'react';
import { InfoPage } from '../components/InfoPage';

const ITEMS = [
  {
    slug: 'blog',
    title: 'Blog',
    desc: 'Expert tips, product updates, and customer stories.',
    body: 'Product updates, hosting guides and notes from the team.\n\nNew posts are published here as they are written. Until then, the knowledge base covers the most common setup questions.'
  },
  {
    slug: 'changelog',
    title: 'Changelog',
    desc: 'Latest releases and new features.',
    body: 'Every release with what changed and why.\n\nEntries are ordered newest first, so the most recent platform changes are always at the top.'
  },
  {
    slug: 'roadmap',
    title: 'Roadmap',
    desc: "What we're building next.",
    body: 'What we are working on next and what is planned after that.\n\nPriorities can change as we learn from customers, so this is a direction, not a promise of dates.'
  },
  {
    slug: 'about',
    title: 'About',
    desc: 'Meet the people and platform behind your success.',
    body: 'Royal Nodes is a hosting and infrastructure company.\n\nWe run game servers, web hosting and compute services from one control panel, with a single account and a single invoice.'
  },
  {
    slug: 'careers',
    title: 'Careers',
    desc: 'Explore open roles at Royal Nodes.',
    body: 'Open roles are listed here when we are hiring.\n\nIf you want to build infrastructure and support, send us your work and tell us what you want to own.'
  },
  {
    slug: 'contact',
    title: 'Contact',
    desc: 'How to reach us.',
    body: 'Reach support from your client area, or join the community Discord.\n\nSales and billing questions go to the same place and are answered in order of arrival.'
  },
  {
    slug: 'knowledge-base',
    title: 'Knowledge Base',
    desc: 'Help articles and guides for every service.',
    body: 'Setup guides and answers for each service, organised by product.\n\nStart here for deployment, domains, email, backups and control-panel questions.'
  },
  {
    slug: 'tutorials',
    title: 'Tutorials',
    desc: 'Articles to help you achieve your online success.',
    body: 'Step-by-step articles for common tasks.\n\nDeploying a server, connecting a domain, enabling SSL, restoring a backup and moving a site are covered first.'
  },
  {
    slug: 'royal-nodes-academy',
    title: 'Royal Nodes Academy',
    desc: 'Practical video guides to help you build and grow.',
    body: 'Short video walkthroughs for building, launching and running services.\n\nEach video follows one task from start to finish so you can pause and follow along.'
  },
  {
    slug: 'learning-lab',
    title: 'Learning lab',
    desc: 'Guided paths to build, launch, and grow online.',
    body: 'Guided paths that walk through a full setup from start to finish.\n\nPick a path such as launching a Minecraft community or shipping a first web app, then work through it in order.'
  },
  {
    slug: 'newsroom',
    title: 'Newsroom',
    desc: 'Official news and press releases.',
    body: 'Official announcements and press information.\n\nFor media enquiries, use the contact page and include your deadline.'
  },
  {
    slug: 'ai-visibility-checker',
    title: 'AI Visibility Checker',
    desc: 'Free tool to check if AI can access and read your site.',
    body: 'Check whether AI crawlers can read your site and what they see.\n\nThe checker reads your robots rules and page structure, then reports what an assistant could access.'
  }
];

export const ResourcesPage = ({ slug }) => (
  <InfoPage
    base="resources"
    label="Resources"
    title="Guides, updates and company info"
    subtitle="Everything about Royal Nodes in one place — documentation, updates, tools and company information."
    items={ITEMS}
    slug={slug}
  />
);
