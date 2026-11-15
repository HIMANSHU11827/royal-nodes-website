// ROYAL NODES™ - DYNAMIC CATALOGUE & INITIAL PRICING DATA

export const SERVICE_CATEGORIES = [
  {
    id: 'minecraft', name: 'Minecraft Servers', short: 'Minecraft', desc: 'High-tickrate game nodes',
    locations: ['Mumbai', 'Singapore', 'Frankfurt', 'US East'],
    plans: [
      { tier: 'Cheap', name: 'Sand', price: 25, spec: '1 GB RAM / 1 vCPU / 15 GB NVMe' },
      { tier: 'Cheap', name: 'Clay', price: 40, spec: '2 GB RAM / 1 vCPU / 20 GB NVMe' },
      { tier: 'Cheap', name: 'Dirt', price: 60, spec: '3 GB RAM / 2 vCPU / 25 GB NVMe' },
      { tier: 'Cheap', name: 'Coal', price: 90, spec: '4 GB RAM / 2 vCPU / 40 GB NVMe' },
      { tier: 'Cheap', name: 'Iron', price: 120, spec: '5 GB RAM / 3 vCPU / 50 GB NVMe' },
      { tier: 'Cheap', name: 'Copper', price: 150, spec: '6 GB RAM / 3 vCPU / 60 GB NVMe' },

      { tier: 'Budget', name: 'Gold', price: 200, spec: '8 GB RAM / 4 vCPU / 80 GB NVMe' },
      { tier: 'Budget', name: 'Diamond', price: 280, spec: '10 GB RAM / 4 vCPU / 100 GB NVMe' },
      { tier: 'Budget', name: 'Netherite', price: 350, spec: '12 GB RAM / 5 vCPU / 120 GB NVMe' },
      { tier: 'Budget', name: 'Emerald', price: 450, spec: '14 GB RAM / 6 vCPU / 140 GB NVMe' },
      { tier: 'Budget', name: 'Obsidian', price: 550, spec: '16 GB RAM / 6 vCPU / 160 GB NVMe' },
      { tier: 'Budget', name: 'Sapphire', price: 650, spec: '18 GB RAM / 8 vCPU / 180 GB NVMe' },

      { tier: 'Premium', name: 'Ruby', price: 800, spec: '20 GB RAM / 8 vCPU / 200 GB NVMe' },
      { tier: 'Premium', name: 'Onyx', price: 1000, spec: '24 GB RAM / 10 vCPU / 240 GB NVMe' },
      { tier: 'Premium', name: 'Titan', price: 1300, spec: '32 GB RAM / 12 vCPU / 320 GB NVMe' },
      { tier: 'Premium', name: 'Colossus', price: 1800, spec: '40 GB RAM / 16 vCPU / 400 GB NVMe' },
      { tier: 'Premium', name: 'Apex', price: 2400, spec: '48 GB RAM / 20 vCPU / 480 GB NVMe' },
      { tier: 'Premium', name: 'Royal', price: 3200, spec: '64 GB RAM / 24 vCPU / 640 GB NVMe' },
    ],
  },
  {
    id: 'wordpress', hidden: true, name: 'WordPress Websites', short: 'WordPress', desc: 'Managed WordPress, builder and staging',
    locations: ['Mumbai', 'Singapore', 'Frankfurt', 'US East'],
    plans: [
      { name: 'Starter', price: 149, spec: '1 site / 50 GB SSD' },
      { name: 'Business', price: 249, spec: '100 sites / 100 GB SSD' },
      { name: 'Pro', price: 399, spec: '100 sites / 200 GB NVMe' },
      { name: 'Enterprise', price: 799, spec: '300 sites / 250 GB NVMe' },
    ],
  },
  {
    id: 'web', name: 'Web & Cloud Hosting', short: 'Web Hosting', desc: 'Websites, apps and cloud',
    locations: ['Mumbai', 'Singapore', 'Frankfurt', 'US East'],
    plans: [
      { name: 'Single', price: 149, cpu: 100, ram: 1, storage: 50, features: ['1 website', 'Free SSL'], spec: '1 site / 50 GB SSD' },
      { name: 'Agency', price: 249, cpu: 150, ram: 2, storage: 100, features: ['100 websites', 'Free SSL'], spec: '100 sites / 100 GB SSD' },
      { name: 'Business', price: 399, cpu: 200, ram: 4, storage: 200, features: ['100 websites', 'Free SSL'], spec: '100 sites / 200 GB NVMe' },
      { name: 'Cloud', price: 799, cpu: 400, ram: 8, storage: 250, features: ['300 websites', 'Free SSL'], spec: '300 sites / 250 GB NVMe' },
    ],
  },
  {
    id: 'vps', name: 'VPS', short: 'VPS', desc: 'KVM NVMe root access',
    locations: ['Mumbai', 'Frankfurt', 'Singapore', 'US East'],
    plans: [
      { tier: 'Cheap', name: 'KVM 1', price: 499, spec: '1 vCPU / 4 GB RAM / 50 GB NVMe' },
      { tier: 'Budget', name: 'KVM 2', price: 799, spec: '2 vCPU / 8 GB RAM / 100 GB NVMe' },
      { tier: 'Budget', name: 'KVM 4', price: 1499, spec: '4 vCPU / 16 GB RAM / 200 GB NVMe' },
      { tier: 'Premium', name: 'KVM 8', price: 2799, spec: '8 vCPU / 32 GB RAM / 400 GB NVMe' },
    ],
  },
  {
    id: 'vds', hidden: true, name: 'VDS', short: 'VDS', desc: 'Dedicated-class hardware',
    locations: ['Mumbai', 'Frankfurt', 'US East'],
    plans: [
      { name: 'Dedicated 1', price: 1499, spec: '4 dedicated cores / 16 GB RAM / 200 GB NVMe' },
      { name: 'Dedicated 2', price: 2799, spec: '8 dedicated cores / 32 GB RAM / 400 GB NVMe' },
      { name: 'Dedicated 3', price: 5999, spec: '16 dedicated cores / 64 GB RAM / 800 GB NVMe' },
    ],
  },
  {
    id: 'vm', hidden: true, name: 'Virtual Machines', short: 'VM', desc: 'Private virtual machines',
    locations: ['Mumbai', 'Frankfurt', 'Singapore'],
    plans: [
      { name: 'VM Small', price: 499, spec: '1 vCPU / 2 GB RAM / 40 GB SSD' },
      { name: 'VM Medium', price: 999, spec: '2 vCPU / 4 GB RAM / 80 GB SSD' },
      { name: 'VM Large', price: 1999, spec: '4 vCPU / 8 GB RAM / 160 GB NVMe' },
    ],
  },
  {
    id: 'dedicated', hidden: true, name: 'Dedicated Servers', short: 'Dedicated', desc: 'Bare-metal single-tenant machines',
    locations: ['Mumbai', 'Frankfurt'],
    plans: [
      { name: 'Entry', price: 5999, spec: '6 cores / 32 GB RAM / 1 TB NVMe' },
      { name: 'Pro', price: 9999, spec: '12 cores / 64 GB RAM / 2 TB NVMe' },
      { name: 'Enterprise', price: 15999, spec: '24 cores / 128 GB RAM / 4 TB NVMe' },
    ],
  },
  {
    id: 'docker', hidden: true, name: 'Docker Containers', short: 'Docker', desc: 'Isolated app containers',
    locations: ['Mumbai', 'Singapore', 'Frankfurt'],
    plans: [
      { name: 'Starter', price: 299, spec: '1 container / 1 vCPU / 2 GB RAM' },
      { name: 'Pro', price: 599, spec: '5 containers / 2 vCPU / 4 GB RAM' },
      { name: 'Max', price: 1199, spec: 'Unlimited containers / 4 vCPU / 8 GB RAM' },
    ],
  },
  {
    id: 'kubernetes', hidden: true, name: 'Kubernetes', short: 'Kubernetes', desc: 'Managed clusters and autoscaling',
    locations: ['Mumbai', 'Singapore', 'Frankfurt'],
    plans: [
      { name: 'Cluster Starter', price: 999, spec: '3 nodes / 2 vCPU / 8 GB RAM' },
      { name: 'Cluster Pro', price: 1999, spec: '5 nodes / 4 vCPU / 16 GB RAM' },
      { name: 'Cluster Scale', price: 3999, spec: '10 nodes / 8 vCPU / 32 GB RAM' },
    ],
  },
  {
    id: 'bot', name: 'Bot Hosting', short: 'Bots', desc: 'Always-on Discord and Telegram bots',
    locations: ['Mumbai', 'Singapore'],
    plans: [
      { tier: 'Cheap', name: 'Basic', price: 199, cpu: 100, ram: 1, storage: 10, spec: '1 bot / 512 MB RAM' },
      { tier: 'Budget', name: 'Pro', price: 399, cpu: 200, ram: 2, storage: 20, spec: '3 bots / 2 GB RAM' },
      { tier: 'Premium', name: 'Team', price: 799, cpu: 300, ram: 4, storage: 40, spec: '10 bots / 4 GB RAM' },
    ],
  },
  {
    id: 'agents', hidden: true, name: 'AI Agents', short: 'AI Agents', desc: 'Always-on autonomous agents',
    locations: ['Mumbai', 'Frankfurt'],
    plans: [
      { name: 'Lite', price: 399, spec: '500 runs/mo / 1 vCPU / 2 GB RAM' },
      { name: 'Plus', price: 899, spec: '2,000 runs/mo / 2 vCPU / 4 GB RAM' },
      { name: 'Team', price: 1799, spec: 'Unlimited runs / 4 vCPU / 8 GB RAM' },
    ],
  },
  {
    id: 'model', hidden: true, name: 'Model Hosting', short: 'Models', desc: 'Serve LLMs on dedicated GPU nodes',
    locations: ['Frankfurt', 'US East'],
    plans: [
      { name: 'Small GPU', price: 1299, spec: '1 GPU / 24 GB VRAM' },
      { name: 'Medium GPU', price: 2499, spec: '1 GPU / 48 GB VRAM' },
      { name: 'Large GPU', price: 4999, spec: '2 GPU / 80 GB VRAM' },
    ],
  },
  {
    id: 'os', hidden: true, name: 'OS Hosting', short: 'OS', desc: 'Pick any Linux or Windows image',
    locations: ['Mumbai', 'Frankfurt', 'Singapore'],
    plans: [
      { name: 'Linux', price: 499, spec: '1 vCPU / 2 GB RAM / any distro' },
      { name: 'Windows', price: 799, spec: '2 vCPU / 4 GB RAM / Windows Server' },
      { name: 'Custom Image', price: 999, spec: '4 vCPU / 8 GB RAM / custom ISO' },
    ],
  },
  {
    id: 'domain', name: 'Domains', short: 'Domains', desc: 'Register, transfer and manage domains',
    locations: ['Global'],
    plans: [
      { name: '.in', price: 99, features: ['1 year', 'Free DNS', 'WHOIS privacy'], spec: '1 year registration' },
      { name: '.com', price: 199, features: ['1 year', 'Free DNS', 'WHOIS privacy'], spec: '1 year registration' },
      { name: '.net', price: 249, features: ['1 year', 'Free DNS', 'WHOIS privacy'], spec: '1 year registration' },
      { name: '.org', price: 299, features: ['1 year', 'Free DNS', 'WHOIS privacy'], spec: '1 year registration' },
    ],
  },
  {
    id: 'email', hidden: true, name: 'Email Hosting', short: 'Email', desc: 'Business mailboxes and webmail',
    locations: ['Mumbai', 'Frankfurt'],
    plans: [
      { name: 'Starter', price: 49, spec: '1 mailbox / 5 GB' },
      { name: 'Business', price: 99, spec: '10 mailboxes / 25 GB' },
      { name: 'Pro', price: 199, spec: '50 mailboxes / 100 GB' },
    ],
  },
  {
    id: 'ssl', hidden: true, name: 'SSL Certificates', short: 'SSL', desc: 'Free and wildcard SSL',
    locations: ['Global'],
    plans: [
      { name: 'Free', price: 0, spec: '1 domain / 90 days, auto-renew' },
      { name: 'Wildcard', price: 499, spec: '*.domain / 1 year' },
      { name: 'EV', price: 1499, spec: '1 domain, business verified / 1 year' },
    ],
  },
];

const each = (plans, category) => plans.map(p => ({ ...p, category }));

export const DOCKER_PLANS = each([
  {
    id: 'docker-starter', name: 'Container Starter', price: 299, priceAnnual: 239,
    cpu: '1 vCPU', ram: '2 GB RAM', disk: '25 GB NVMe', bandwidth: '1 TB Transfer',
    idealFor: 'Single app or bot, n8n, small APIs', recommended: false, badge: 'Starter',
    features: ['1 Docker Container', '2 GB RAM / 1 vCPU', '25 GB NVMe', '1 TB bandwidth', 'Private registry pull', 'Docker Compose support', 'Auto-restart on crash', 'Daily snapshots', 'Instant deploy (<30s)']
  },
  {
    id: 'docker-pro', name: 'Container Pro', price: 599, priceAnnual: 479,
    cpu: '2 vCPU', ram: '4 GB RAM', disk: '50 GB NVMe', bandwidth: '3 TB Transfer',
    idealFor: 'Production apps, agents, automation stacks', recommended: true, badge: 'Popular',
    features: ['Up to 5 Containers', '4 GB RAM / 2 vCPU', '50 GB NVMe', '3 TB bandwidth', 'Secret & env management', 'Custom Dockerfile build', 'Health checks', '6-hour snapshots', 'Zero-downtime redeploy']
  },
  {
    id: 'docker-max', name: 'Container Max', price: 1199, priceAnnual: 959,
    cpu: '4 vCPU', ram: '8 GB RAM', disk: '100 GB NVMe', bandwidth: 'Unlimited',
    idealFor: 'Teams, microservices, high-traffic apps', recommended: false, badge: 'Team',
    features: ['Unlimited Containers', '8 GB RAM / 4 vCPU', '100 GB NVMe', 'Unlimited bandwidth', 'Private registry + push', 'Dedicated CPU pinning', 'Priority support queue', 'Weekly full backups', '99.9% uptime SLA']
  },
], 'docker');

export const AGENT_PLANS = each([
  {
    id: 'agent-lite', name: 'Agent Lite', price: 399, priceAnnual: 319,
    cpu: '1 vCPU', ram: '2 GB RAM', disk: '20 GB NVMe', executions: '500 runs / mo',
    idealFor: 'Personal automation, reminders, simple bots', recommended: false, badge: 'Starter',
    features: ['Royal Nodes Agent access', '500 agent executions / mo', 'Scheduled tasks (cron)', '1 connected app', 'Chat + email triggers', 'Daily run logs', 'Community support']
  },
  {
    id: 'agent-plus', name: 'Agent Plus', price: 899, priceAnnual: 719,
    cpu: '2 vCPU', ram: '4 GB RAM', disk: '40 GB NVMe', executions: '2,000 runs / mo',
    idealFor: 'Business workflows, OpenClaw, Hermes Agent', recommended: true, badge: 'Popular',
    features: ['OpenClaw + Hermes Agent', '2,000 runs / mo', '5 connected apps', 'Webhooks + API access', 'Persistent memory', 'Long-term task queue', 'Priority support']
  },
  {
    id: 'agent-team', name: 'Agent Team', price: 1799, priceAnnual: 1439,
    cpu: '4 vCPU', ram: '8 GB RAM', disk: '80 GB NVMe', executions: 'Unlimited runs',
    idealFor: 'Teams running 24/7 autonomous operations', recommended: false, badge: 'Team',
    features: ['Unlimited executions', 'Unlimited apps', 'Multi-agent teams', 'Dedicated agent VM', 'Custom tools & skills', 'SSO & team seats', 'Dedicated manager']
  },
], 'agents');

export const VM_PLANS = each([
  {
    id: 'vm-1', name: 'VM Small', price: 499, priceAnnual: 399,
    cpu: '1 vCPU', ram: '2 GB RAM', disk: '40 GB SSD', bandwidth: '2 TB Transfer',
    idealFor: 'Test projects, bots, game servers', recommended: false, badge: 'Starter',
    features: ['1 vCPU / 2 GB RAM', '40 GB SSD', '2 TB bandwidth', 'Ubuntu / Debian install', 'Console access', 'Weekly snapshots']
  },
  {
    id: 'vm-2', name: 'VM Medium', price: 999, priceAnnual: 799,
    cpu: '2 vCPU', ram: '4 GB RAM', disk: '80 GB SSD', bandwidth: '4 TB Transfer',
    idealFor: 'Web apps, staging, small production', recommended: true, badge: 'Popular',
    features: ['2 vCPU / 4 GB RAM', '80 GB SSD', '4 TB bandwidth', 'Full root access', 'Dedicated IPv4', 'Daily snapshots', 'Free SSL']
  },
  {
    id: 'vm-4', name: 'VM Large', price: 1999, priceAnnual: 1599,
    cpu: '4 vCPU', ram: '8 GB RAM', disk: '160 GB NVMe', bandwidth: '8 TB Transfer',
    idealFor: 'Busy apps, databases, Minecraft hosts', recommended: false, badge: 'Large',
    features: ['4 vCPU / 8 GB RAM', '160 GB NVMe', '8 TB bandwidth', '1 Gbps port', 'Custom ISO install', 'Priority support']
  },
], 'vm');

export const VDS_PLANS = each([
  {
    id: 'vds-1', name: 'VDS Dedicated 1', price: 1499, priceAnnual: 1199,
    cpu: '4 Dedicated Cores', ram: '16 GB RAM', disk: '200 GB NVMe', bandwidth: '16 TB Transfer',
    idealFor: 'High-traffic apps, large Minecraft networks', recommended: false, badge: 'Dedicated',
    features: ['4 dedicated cores (no sharing)', '16 GB ECC RAM', '200 GB NVMe Gen4', '16 TB bandwidth', 'Dedicated IPv4 + IPv6', 'Bare-metal performance', 'Daily backups']
  },
  {
    id: 'vds-2', name: 'VDS Dedicated 2', price: 2799, priceAnnual: 2239,
    cpu: '8 Dedicated Cores', ram: '32 GB RAM', disk: '400 GB NVMe', bandwidth: '32 TB Transfer',
    idealFor: 'Enterprise workloads, proxies, big communities', recommended: true, badge: 'Popular',
    features: ['8 dedicated cores', '32 GB ECC DDR5', '400 GB NVMe Gen4', '32 TB bandwidth', '10 Gbps uplink', 'Custom ISO + VNC', '99.99% uptime SLA']
  },
  {
    id: 'vds-3', name: 'VDS Dedicated 3', price: 5999, priceAnnual: 4799,
    cpu: '16 Dedicated Cores', ram: '64 GB RAM', disk: '800 GB NVMe', bandwidth: 'Unlimited',
    idealFor: 'Networks, enterprises, virtualisation hosts', recommended: false, badge: 'Enterprise',
    features: ['16 dedicated cores', '64 GB ECC DDR5', '800 GB NVMe RAID', 'Unlimited bandwidth', 'Nested virtualisation', 'Dedicated account manager', '99.99% uptime SLA']
  },
], 'vds');

export const MINECRAFT_PLANS = [
  {
    id: 'dirt',
    name: 'Dirt',
    ram: '2 GB',
    ramMb: 2048,
    cpu: '1 vCPU (AMD Ryzen 9 / EPYC)',
    disk: '25 GB Gen4 NVMe',
    price: 50,
    priceMonthly: 50,
    priceAnnual: 40,
    players: '1 - 5 Players',
    idealFor: 'Vanilla Survival with Friends, Small Spigot Server',
    features: [
      '2 GB DDR5 / DDR4 ECC RAM',
      'Unmetered 1 Gbps Port',
      'Free Subdomain (yourname.royalnodes.net)',
      'Automated Daily Backups',
      'Standard DDoS Mitigation (4.8 Tbps)',
      'Full Pterodactyl Control Panel',
      'Instant Provisioning (<15s)'
    ],
    recommended: false,
    badge: 'Starter'
  },
  {
    id: 'coal',
    name: 'Coal',
    ram: '4 GB',
    ramMb: 4096,
    cpu: '2 vCPU (AMD Ryzen 9 / EPYC)',
    disk: '50 GB Gen4 NVMe',
    price: 150,
    priceMonthly: 150,
    priceAnnual: 120,
    players: '5 - 15 Players',
    idealFor: 'Paper/Purpur with 20+ plugins, Small SMP',
    features: [
      '4 GB High-Frequency RAM',
      '2 Dedicated CPU Threads',
      'Full SFTP & Database Access',
      '1-Click Plugin & Mod Installer',
      'Automated Daily Backups',
      'Bedrock / Geyser Crossplay Support',
      'Sub-15ms Low Latency Routing'
    ],
    recommended: false,
    badge: 'Popular'
  },
  {
    id: 'iron',
    name: 'Iron',
    ram: '6 GB',
    ramMb: 6144,
    cpu: '3 vCPU (AMD Ryzen 9 / EPYC)',
    disk: '75 GB Gen4 NVMe',
    price: 150,
    priceMonthly: 150,
    priceAnnual: 120,
    players: '15 - 30 Players',
    idealFor: 'Fabric SMP, Light Modpacks, Dynmap enabled',
    features: [
      '6 GB High-Frequency RAM',
      '3 Dedicated CPU Threads',
      'Unlimited MySQL Databases',
      'Free Dedicated Port Allocation',
      'Advanced Chunk Pre-gen Optimization',
      '24/7 Server Watchdog Auto-Restart',
      'Zero Swap Overcommit'
    ],
    recommended: false,
    badge: 'Value'
  },
  {
    id: 'gold',
    name: 'Gold',
    ram: '8 GB',
    ramMb: 8192,
    cpu: '4 vCPU (AMD Ryzen 9 / EPYC)',
    disk: '100 GB Gen4 NVMe',
    price: 200,
    priceMonthly: 200,
    priceAnnual: 160,
    players: '30 - 60 Players',
    idealFor: 'All The Mods (ATM9), Better MC, Cobblemon Modpacks',
    features: [
      '8 GB Ultra-Fast RAM',
      '4 Dedicated CPU Threads',
      'Pre-configured Aikar’s JVM Flags',
      'Automated 6-Hour Snapshot Backups',
      'Custom Java 8/11/17/21 Version Selector',
      'Direct Pterodactyl WebSocket Console',
      'Enterprise DDoS Layer 7 Shield'
    ],
    recommended: true,
    badge: 'Best For Modpacks'
  },
  {
    id: 'diamond',
    name: 'Diamond',
    ram: '10 GB',
    ramMb: 10240,
    cpu: '5 vCPU (AMD Ryzen 9 / EPYC)',
    disk: '150 GB Gen4 NVMe',
    price: 350,
    priceMonthly: 350,
    priceAnnual: 280,
    players: '60 - 100 Players',
    idealFor: 'Large Public Communities, Minigames Hub',
    features: [
      '10 GB Dedicated RAM',
      '5 High-Performance Threads',
      'Free Dedicated IPv4 Address',
      'Unlimited Backups Retention',
      'Priority Support Queue',
      'Multi-port Bungee/Velocity Proxy Ready',
      'Redis & MySQL Managed Clusters'
    ],
    recommended: false,
    badge: 'Community Pro'
  },
  {
    id: 'netherite',
    name: 'Netherite',
    ram: '12 GB',
    ramMb: 12288,
    cpu: '6 vCPU (AMD Ryzen 9 / EPYC)',
    disk: '200 GB Gen4 NVMe Enterprise',
    price: 400,
    priceMonthly: 400,
    priceAnnual: 320,
    players: '100+ Players',
    idealFor: 'Enterprise Networks, Heavy Factions, High-Tickrate SMP',
    features: [
      '12 GB Guaranteed Dedicated RAM',
      '6 Dedicated Core Threads (Pinned)',
      'Free Dedicated IPv4 Included',
      '10 Gbps Uplink Connection',
      'Bespoke Tickrate & Memory Tuning',
      'Dedicated Account Manager on Discord',
      '99.99% Hardware Uptime SLA'
    ],
    recommended: false,
    badge: 'Enterprise Tier'
  }
];

export const WEB_PLANS = [
  {
    id: 'web-single',
    name: 'Single Cloud',
    price: 149,
    originalPrice: 399,
    discount: '62% OFF',
    desc: 'Ideal solution for beginners launching personal sites.',
    sites: '1 Website',
    storage: '50 GB SSD Storage',
    bandwidth: '100 GB Bandwidth',
    freeDomain: false,
    features: ['1 Website', '50 GB SSD', '~10 000 Visits Monthly', '1 Email Account', 'Free SSL', 'Git Integration']
  },
  {
    id: 'web-premium',
    name: 'Agency Startup',
    price: 249,
    originalPrice: 599,
    discount: '75% OFF',
    desc: 'Everything you need to create your personal or agency website.',
    sites: '100 Websites',
    storage: '100 GB SSD Storage',
    bandwidth: 'Unlimited Bandwidth',
    freeDomain: true,
    recommended: true,
    features: ['100 Websites', '100 GB SSD', '~25 000 Visits Monthly', 'Free Domain ($9.99 value)', 'Free Email', 'Unlimited Free SSL', 'WordPress Staging']
  },
  {
    id: 'web-business',
    name: 'Business Ultimate',
    price: 399,
    originalPrice: 899,
    discount: '71% OFF',
    desc: 'Level up with more power and enhanced security features.',
    sites: '100 Websites',
    storage: '200 GB NVMe Storage',
    bandwidth: 'Unlimited Bandwidth',
    freeDomain: true,
    features: ['100 Websites', '200 GB NVMe Storage', '~100 000 Visits Monthly', 'Free CDN Included', 'Dedicated IP Option', 'Daily Backups ($25 value)', 'Enhanced DDoS Protection']
  },
  {
    id: 'web-cloud',
    name: 'Cloud Enterprise',
    price: 799,
    originalPrice: 1999,
    discount: '60% OFF',
    desc: 'Enjoy isolated cloud resources and top-tier speed.',
    sites: '300 Websites',
    storage: '250 GB NVMe Storage',
    bandwidth: 'Unlimited Bandwidth',
    freeDomain: true,
    features: ['300 Websites', '250 GB NVMe Storage', '12 GB RAM / 4 CPU Cores', 'Dedicated IP Address', 'Standard Priority Support', 'Isolated Container Environment']
  }
];

export const VPS_PLANS = [
  {
    id: 'vps-kvm1',
    name: 'KVM 1',
    vCpu: '1 vCPU Core',
    ram: '4 GB RAM',
    disk: '50 GB NVMe Disk',
    bandwidth: '4 TB Bandwidth',
    price: 499,
    features: ['Full Root Access', 'Dedicated IPv4 & IPv6', 'Weekly Automated Snapshots', 'Proxmox KVM Virtualization']
  },
  {
    id: 'vps-kvm2',
    name: 'KVM 2',
    vCpu: '2 vCPU Cores',
    ram: '8 GB RAM',
    disk: '100 GB NVMe Disk',
    bandwidth: '8 TB Bandwidth',
    price: 799,
    recommended: true,
    features: ['Full Root Access', 'Dedicated IPv4 & IPv6', '1 Gbps Port Speed', 'Docker & Kubernetes Ready']
  },
  {
    id: 'vps-kvm4',
    name: 'KVM 4',
    vCpu: '4 vCPU Cores',
    ram: '16 GB RAM',
    disk: '200 GB NVMe Disk',
    bandwidth: '16 TB Bandwidth',
    price: 1499,
    features: ['Dedicated AMD EPYC Cores', '16 GB ECC DDR5', 'NVMe PCIe 4.0 Storage', 'Enterprise Firewall Control']
  },
  {
    id: 'vps-kvm8',
    name: 'KVM 8',
    vCpu: '8 vCPU Cores',
    ram: '32 GB RAM',
    disk: '400 GB NVMe Disk',
    bandwidth: '32 TB Bandwidth',
    price: 2799,
    features: ['8 Dedicated Threads', '32 GB DDR5 RAM', 'Custom ISO Installation', 'Direct VNC / Serial Console']
  }
];

export const FAQS = [
  {
    q: "What is Royal Nodes?",
    a: "Royal Nodes is an Indian hosting and infrastructure company providing Minecraft game servers, KVM VPS and VDS, web and cloud hosting, bot hosting, AI agent hosting, model hosting and Docker containers — all managed from a single control panel."
  },
  {
    q: "Who is Royal Nodes for?",
    a: "Royal Nodes is built for gamers running Minecraft communities, developers shipping apps, agencies hosting client sites, and businesses that need reliable servers without operational overhead."
  },
  {
    q: "Is Royal Nodes only a web hosting company?",
    a: "No. Royal Nodes runs nine product lines: web hosting, Minecraft hosting, VPS, VDS, dedicated servers, bot hosting, AI agent hosting, model hosting and Docker hosting — plus domains, email and developer APIs."
  },
  {
    q: "Do I need to know how to code to use Royal Nodes?",
    a: "Not at all. Every service is deployed from a point-and-click dashboard with one-click installers for Minecraft, WordPress, bots and Docker images. Developers can drop to SSH and the API whenever they want more control."
  },
  {
    q: "How fast is server provisioning?",
    a: "Minecraft nodes deploy automatically in under 15 seconds once payment is verified. VPS and VDS instances provision within a few minutes depending on the operating system image and node capacity."
  },
  {
    q: "Can I upgrade my plan later?",
    a: "Yes. You can upgrade RAM, CPU, disk or bandwidth at any time from your dashboard. Upgrades are applied without downtime, and you are billed only for the difference for the remainder of your billing cycle."
  },
  {
    q: "How much does Royal Nodes cost?",
    a: "Minecraft plans start at ₹50/mo, web and cloud hosting at ₹149/mo, KVM VPS at ₹499/mo, Docker containers at ₹299/mo, AI agents at ₹399/mo and VDS at ₹1499/mo. Annual billing saves up to 20%."
  },
  {
    q: "Is my data secure with Royal Nodes?",
    a: "Security is built into every layer: isolated containers, automated daily backups, dual-layer DDoS mitigation, free SSL certificates, encrypted credentials and a full audit log for every admin action."
  },
  {
    q: "Do you offer DDoS protection?",
    a: "Yes. All game and web nodes sit behind multi-terabit DDoS mitigation with Layer 7 filtering. Minecraft traffic is protected by default, including Bedrock and crossplay via Geyser."
  },
  {
    q: "How do I get support?",
    a: "Open a ticket from your client area or join our Discord. Paid plans include priority support, and Enterprise plans include a dedicated account manager with an uptime SLA."
  }
];

export const MEGA_MENU_PRODUCTS = [
  ...SERVICE_CATEGORIES.map((c) => ({
    title: c.name,
    badge: '',
    desc: c.desc,
    href: `/pricing?cat=${c.id}`
  })),
  {
    title: 'Royal Nodes Agent',
    badge: 'New',
    desc: 'Ready-to-use AI team for daily business tasks.',
    href: '/agent'
  },
  {
    title: 'OpenClaw',
    badge: '',
    desc: 'Personal, always-on AI assistant for everyday automation.',
    href: '/managed-openclaw'
  },
  {
    title: 'Hermes Agent',
    badge: 'New',
    desc: 'Persistent, context-aware AI agent for continuous automations.',
    href: '/managed-hermes-agent'
  }
];

export const MEGA_MENU_SOLUTIONS = [
  {
    title: 'Launch your business online',
    desc: 'Build a website with AI and let it bring in customers.',
    href: '/solutions/launch-your-business-online'
  },
  {
    title: 'Create websites with AI',
    desc: 'Turn your idea into a website in minutes.',
    href: '/solutions/create-websites-with-ai'
  },
  {
    title: 'AI app builder',
    desc: 'Build and launch web apps without coding.',
    href: '/solutions/ai-app-builder'
  },
  {
    title: 'Rebuild your site with AI',
    desc: 'Recreate and improve your existing website.',
    href: '/solutions/rebuild-your-site-with-ai'
  },
  {
    title: 'Take bookings online',
    desc: 'Let customers book and pay online.',
    href: '/solutions/take-bookings-online'
  },
  {
    title: 'Start from a template',
    desc: 'Start with an existing project and make it your own.',
    href: '/solutions/start-from-a-template'
  }
];

export const MEGA_MENU_DEVELOPERS = [
  {
    title: 'AI coding templates',
    desc: 'Build with your AI coding assistant using starter templates.',
    href: '/developers/ai-coding-templates'
  },
  {
    title: 'Hosting Connector',
    desc: 'Build sites and manage hosting with your AI coding assistant.',
    href: '/developers/hosting-connector'
  },
  {
    title: 'Royal Nodes Headless',
    desc: 'Backend and hosting for your AI-built projects.',
    href: '/developers/royal-nodes-headless'
  },
  {
    title: 'Royal Nodes CLI',
    desc: 'Control Royal Nodes from your terminal, scripts, and agents.',
    href: '/developers/royal-nodes-cli'
  },
  {
    title: 'Royal Nodes Mail API & CLI',
    desc: 'Send and manage email from your terminal, scripts, and automated workflows.',
    href: '/developers/royal-nodes-mail-api-cli'
  },
  {
    title: 'Royal Nodes SDK',
    desc: 'Official Royal Nodes libraries for your language.',
    href: '/developers/royal-nodes-sdk'
  }
];

export const MEGA_MENU_RESOURCES = [
  { title: 'Blog', desc: 'Expert tips, product updates, and customer stories.', href: '/resources/blog' },
  { title: 'Changelog', desc: 'Latest releases and new features.', href: '/resources/changelog' },
  { title: 'Roadmap', desc: 'What we’re building next.', href: '/resources/roadmap' },
  { title: 'About', desc: 'Meet the people and platform behind your success.', href: '/resources/about' },
  { title: 'Careers', desc: 'Explore open roles at Royal Nodes.', href: '/resources/careers' },
  { title: 'Contact', desc: 'How to reach us.', href: '/resources/contact' },
  { title: 'Knowledge Base', desc: 'Help articles and guides for every service.', href: '/resources/knowledge-base' },
  { title: 'Tutorials', desc: 'Articles to help you achieve your online success.', href: '/resources/tutorials' },
  { title: 'Royal Nodes Academy', desc: 'Practical video guides to help you build and grow.', href: '/resources/royal-nodes-academy' },
  { title: 'Learning lab', desc: 'Guided paths to build, launch, and grow online.', href: '/resources/learning-lab' },
  { title: 'Newsroom', desc: 'Official news and press releases.', href: '/resources/newsroom' },
  { title: 'AI Visibility Checker', desc: 'Free tool to check if AI can access and read your site.', href: '/resources/ai-visibility-checker' }
];
