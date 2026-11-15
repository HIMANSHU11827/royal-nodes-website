import React from 'react';
import { InfoPage } from '../components/InfoPage';

const ITEMS = [
  {
    slug: 'ai-coding-templates',
    title: 'AI coding templates',
    desc: 'Build with your AI coding assistant using starter templates.',
    points: ['Starter repos for common stacks', 'Ready-to-deploy configs', 'Works with any AI assistant'],
    cta: 'See container plans',
    href: '/pricing?cat=docker'
  },
  {
    slug: 'hosting-connector',
    title: 'Hosting Connector',
    desc: 'Build sites and manage hosting with your AI coding assistant.',
    points: ['Connect your assistant to hosting', 'Deploy without leaving the editor', 'Manage domains and DNS'],
    cta: 'See VPS plans',
    href: '/pricing?cat=vps'
  },
  {
    slug: 'royal-nodes-headless',
    title: 'Royal Nodes Headless',
    desc: 'Backend and hosting for your AI-built projects.',
    points: ['Headless API access', 'Managed backend services', 'Scale independently of the frontend'],
    cta: 'See web hosting plans',
    href: '/pricing?cat=web'
  },
  {
    slug: 'royal-nodes-cli',
    title: 'Royal Nodes CLI',
    desc: 'Control Royal Nodes from your terminal, scripts, and agents.',
    points: ['Create servers from the terminal', 'Automate with scripts and CI', 'JSON output for agents'],
    cta: 'See VPS plans',
    href: '/pricing?cat=vps'
  },
  {
    slug: 'royal-nodes-mail-api-cli',
    title: 'Royal Nodes Mail API & CLI',
    desc: 'Send and manage email from your terminal, scripts, and automated workflows.',
    points: ['Transactional email API', 'Send from scripts and agents', 'Delivery logs'],
    cta: 'See email plans',
    href: '/pricing?cat=email'
  },
  {
    slug: 'royal-nodes-sdk',
    title: 'Royal Nodes SDK',
    desc: 'Official Royal Nodes libraries for your language.',
    points: ['Typed client libraries', 'Built on the public REST API', 'Examples for every endpoint'],
    cta: 'See VM plans',
    href: '/pricing?cat=vm'
  }
];

export const DevelopersPage = ({ slug }) => (
  <InfoPage
    base="developers"
    label="Developers"
    title="Build on Royal Nodes"
    subtitle="APIs, CLIs and SDKs to manage infrastructure from your own tools."
    items={ITEMS}
    slug={slug}
  />
);
