// src/components/Layout/Layout.tsx

import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from './Header';
import Footer from './Footer';
import AdminSidebar from './AdminSidebar';
import ClientSidebar from './ClientSidebar';
import { useAuth } from '../../context/AuthContext';

/** Aligns with server 404 rules for junk / crawler URLs (SPA fallback in dev). */
function isJunkPublicUrl(pathname: string, search: string): boolean {
  if (search.includes('wpr_templates') || search.includes('academicLevel')) return true;
  if (pathname.endsWith('/feed/') || pathname.endsWith('/feed')) return true;
  const qm = pathname.match(/^\/question\/([^/]+)/);
  if (qm && !/^\d+$/.test(qm[1])) return true;
  return false;
}

export default function Layout() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const { user, isLoading } = useAuth(); // This gets the logged-in user

  // Determine which sidebar to show based on the route and user role
  const isDashboardPage = location.pathname.startsWith('/dashboard');

  const isAdmin = user?.role === 'admin';  // Or whatever your role field is (e.g., user.isAdmin if it's a boolean)

  const isAdminPage = isDashboardPage && isAdmin;
  const isClientDashboard = isDashboardPage && !isAdmin;

  // Debug logging
  // console.log('Path:', location.pathname, 'isAdminPage:', isAdminPage, 'isClientDashboard:', isClientDashboard, 'User Role:', user?.role);

  const handleToggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // --- Centralized SEO: set title and meta description based on route ---
  useEffect(() => {
    const path = location.pathname;

    type Meta = { title: string; description: string };
    const metaByPrefix: Array<[string, Meta]> = [
      ['/', { title: 'Essay Embassy — Professional Academic Writing Services', description: 'Hire expert academic writers for essays, research papers, assignments, and dissertations. Original work, on‑time delivery, and friendly support at Essay Embassy.' }],
      ['/about', { title: 'About Essay Embassy', description: 'Learn about Essay Embassy’s mission, values, and expert team delivering high‑quality academic writing services worldwide.' }],
      ['/contact', { title: 'Contact Essay Embassy', description: 'Have questions or need a quote? Contact Essay Embassy’s support team for fast, friendly help 24/7.' }],
      ['/services', { title: 'Our Services — Essay Embassy', description: 'Explore our full range of academic writing services: essays, research papers, homework help, programming help, and more.' }],
      ['/writers', { title: 'Our Writers — Essay Embassy', description: 'Meet experienced academic writers skilled across disciplines—carefully vetted for quality, communication, and expertise.' }],
      ['/samples', { title: 'Samples — Essay Embassy', description: 'View academic writing samples that demonstrate structure, clarity, research depth, and proper formatting.' }],
      ['/reviews', { title: 'Reviews — Essay Embassy', description: 'Read genuine client reviews about Essay Embassy’s writing quality, communication, and on‑time delivery.' }],
      ['/blog', { title: 'Blog — Essay Embassy', description: 'Read practical guides on academic writing, research, formatting, and study tips from Essay Embassy experts.' }],
      ['/privacy-policy', { title: 'Privacy Policy — Essay Embassy', description: 'Understand how Essay Embassy protects your personal data and keeps your information secure and confidential.' }],
      ['/terms-and-conditions', { title: 'Terms & Conditions — Essay Embassy', description: 'Read the terms that govern the use of Essay Embassy’s website and services.' }],
      ['/refund-policy', { title: 'Refund Policy — Essay Embassy', description: 'See our fair and transparent refund policy for orders at Essay Embassy.' }],
      ['/honor-code', { title: 'Honor Code — Essay Embassy', description: 'Our academic integrity policy explains how to responsibly use model papers and learning resources.' }],
      ['/order-now', { title: 'Place an Order — Essay Embassy', description: 'Order custom academic writing—secure checkout, fast turnaround, and professional quality guaranteed.' }],
      ['/checkout', { title: 'Checkout — Essay Embassy', description: 'Secure checkout for your academic writing order with Essay Embassy.' }],
      // Essay writing categories
      ['/essay-writing', { title: 'Essay Writing Services — Essay Embassy', description: 'High‑quality custom essays for all subjects and levels: argumentative, narrative, admission, scholarship, and more.' }],
      ['/essay-writing/admission', { title: 'Admission Essay Writing — Essay Embassy', description: 'Stand out with a compelling admission essay tailored to your story and target program.' }],
      ['/essay-writing/reflective', { title: 'Reflective Essay Writing — Essay Embassy', description: 'Thoughtful reflective essays that balance personal experience with critical analysis and theory.' }],
      ['/essay-writing/compare-contrast', { title: 'Compare and Contrast Essays — Essay Embassy', description: 'Clear, structured compare‑and‑contrast essays with strong thesis, organization, and evidence.' }],
      ['/essay-writing/narrative', { title: 'Narrative Essay Writing — Essay Embassy', description: 'Engaging narrative essays with vivid storytelling, clear structure, and authentic voice.' }],
      ['/essay-writing/argumentative', { title: 'Argumentative Essay Writing — Essay Embassy', description: 'Persuasive argumentative essays with strong claims, evidence, and academic sources.' }],
      ['/essay-writing/scholarship', { title: 'Scholarship Essay Writing — Essay Embassy', description: 'Win scholarships with persuasive, authentic scholarship essays tailored to each prompt.' }],
      // Legacy shortcuts
      ['/argumentative-essay', { title: 'Argumentative Essay Service — Essay Embassy', description: 'Get help crafting persuasive argumentative essays backed by credible research.' }],
      ['/narrative-essay', { title: 'Narrative Essay Service — Essay Embassy', description: 'Work with experts to create compelling narrative essays with strong structure and voice.' }],
      // Assignment help
      ['/assignment-help', { title: 'Assignment Help — Essay Embassy', description: 'Reliable assignment help across subjects including management, computer science, law, science, engineering, and more.' }],
      ['/usa/assignment-help', { title: 'Trusted Online Assignment Help USA | Essay Embassy', description: 'Affordable assignment help USA from $10/page. Native writers, university formatting, essays through dissertations—trusted by US students.' }],
      ['/uk/assignment-help', { title: 'UK Assignment Help | Essay Embassy', description: 'Dedicated UK assignment help from Essay Embassy—full regional page launching soon.' }],
      ['/assignment-help/management', { title: 'Management Assignment Help — Essay Embassy', description: 'Well‑researched management assignments covering strategy, marketing, HR, operations, and analytics.' }],
      ['/assignment-help/programming', { title: 'Programming Assignment Help — Essay Embassy', description: 'Assistance with programming assignments, algorithms, data structures, and more.' }],
      ['/assignment-help/humanities', { title: 'Humanities Assignment Help — Essay Embassy', description: 'Clear, critical writing for history, literature, philosophy, sociology, and more.' }],
      ['/assignment-help/math', { title: 'Math Assignment Help — Essay Embassy', description: 'Accurate, step‑by‑step math solutions for algebra, calculus, statistics, and beyond.' }],
      ['/assignment-help/law', { title: 'Law Assignment Help — Essay Embassy', description: 'Case analyses and legal writing aligned with jurisdictional requirements and citation style.' }],
      ['/assignment-help/science', { title: 'Science Assignment Help — Essay Embassy', description: 'Well‑structured lab reports and scientific writing with clear methods and results.' }],
      ['/assignment-help/engineering', { title: 'Engineering Assignment Help — Essay Embassy', description: 'Engineering reports, designs, and calculations prepared to academic standards.' }],
      ['/assignment-help/biotechnology', { title: 'Biotechnology Assignment Help — Essay Embassy', description: 'Biotech writing support covering genetics, molecular biology, bioinformatics, and ethics.' }],
      // Other services
      ['/homework-help', { title: 'Homework Help — Essay Embassy', description: 'Timely, reliable homework assistance across subjects and levels.' }],
      ['/paper-writing-services', { title: 'Paper Writing Services — Essay Embassy', description: 'Custom research papers, essays, and academic papers written to your requirements with proper research and citations.' }],
      ['/dissertation-writing-services', { title: 'Dissertation Writing Services — Essay Embassy', description: 'Dissertation and chapter support from proposal through final editing, aligned with your field and guidelines.' }],
      ['/thesis-writing-services', { title: 'Thesis Writing Help — Essay Embassy', description: 'Thesis assistance from proposal to final editing, tailored to your field and guidelines.' }],
      // Programming help
      ['/programming-help', { title: 'Programming Help — Essay Embassy', description: 'Coding assignments, debugging, and code reviews in Python, Java, C/C++, JavaScript, MATLAB, and more.' }],
      ['/programming-help/python', { title: 'Python Programming Help — Essay Embassy', description: 'Python assignments, scripts, data analysis, and automation help.' }],
      ['/programming-help/java', { title: 'Java Programming Help — Essay Embassy', description: 'Java assignments, OOP, data structures, and application development support.' }],
      ['/programming-help/js', { title: 'JavaScript Programming Help — Essay Embassy', description: 'JavaScript/TypeScript help for web apps, frontend logic, and node.js scripts.' }],
      ['/programming-help/c', { title: 'C Programming Help — Essay Embassy', description: 'C language assignments, memory management, pointers, and systems programming.' }],
      ['/programming-help/csharp', { title: 'C# Programming Help — Essay Embassy', description: 'C# and .NET assignments, OOP patterns, and application structure guidance.' }],
      ['/programming-help/ruby', { title: 'Ruby Programming Help — Essay Embassy', description: 'Ruby scripts, Rails basics, and general Ruby programming assignments.' }],
      ['/programming-help/cpp', { title: 'C++ Programming Help — Essay Embassy', description: 'C++ assignments, templates, STL, and performance‑minded solutions.' }],
      ['/programming-help/matlab', { title: 'MATLAB Programming Help — Essay Embassy', description: 'MATLAB scripts, data analysis, visualization, and algorithm development.' }],
    ];

    const match = metaByPrefix
      .sort((a, b) => b[0].length - a[0].length) // prefer the most specific prefix
      .find(([prefix]) => path === prefix || path.startsWith(prefix + '/'));

    const meta = match ? match[1] : metaByPrefix[0][1];

    try {
      if (meta && typeof document !== 'undefined' && document.head) {
        document.title = meta.title;
        const setMeta = (name: string, content: string) => {
          let tag = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
          if (!tag) {
            tag = document.createElement('meta');
            tag.setAttribute('name', name);
            document.head.appendChild(tag);
          }
          tag.setAttribute('content', content);
        };
        setMeta('description', meta.description);
      }
    } catch (e) {
      // no-op: never block rendering due to meta errors
    }

    // --- Structured Data (JSON-LD) ---
    const setJsonLd = (id: string, data: object) => {
      if (typeof document === 'undefined' || !document.head) return;
      try {
        let el = document.getElementById(id) as HTMLScriptElement | null;
        if (!el) {
          el = document.createElement('script');
          el.type = 'application/ld+json';
          el.id = id;
          document.head.appendChild(el);
        }
        el.textContent = JSON.stringify(data);
      } catch (e) {
        // ignore
      }
    };

    // Organization
    setJsonLd('ld-org', {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Essay Embassy',
      url: 'https://essayembassy.com/',
      logo: 'https://essayembassy.com/images/logo.png',
      sameAs: [
        'https://x.com/essayembassy/',
        'https://www.instagram.com/essayembassy/',
        'https://www.linkedin.com/company/essay-embassy'
      ],
      contactPoint: [{
        '@type': 'ContactPoint',
        contactType: 'customer support',
        url: 'https://essayembassy.com/contact'
      }]
    });

    // WebSite (add SearchAction later if/when search exists)
    setJsonLd('ld-website', {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'Essay Embassy',
      url: 'https://essayembassy.com/'
      // potentialAction can be added when a site search is implemented
    });

    // Primary navigation (helps sitelinks comprehension)
    setJsonLd('ld-sitenav', {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      itemListElement: [
        { '@type': 'SiteNavigationElement', position: 1, name: 'Home', url: 'https://essayembassy.com/' },
        { '@type': 'SiteNavigationElement', position: 2, name: 'Services', url: 'https://essayembassy.com/services' },
        { '@type': 'SiteNavigationElement', position: 3, name: 'Writers', url: 'https://essayembassy.com/writers' },
        { '@type': 'SiteNavigationElement', position: 4, name: 'Samples', url: 'https://essayembassy.com/samples' },
        { '@type': 'SiteNavigationElement', position: 5, name: 'Reviews', url: 'https://essayembassy.com/reviews' },
        { '@type': 'SiteNavigationElement', position: 6, name: 'Blog', url: 'https://essayembassy.com/blog' },
        { '@type': 'SiteNavigationElement', position: 7, name: 'Contact', url: 'https://essayembassy.com/contact' }
      ]
    });

    // Breadcrumbs per route
    const crumbs: Array<{ name: string; url: string }> = [{ name: 'Home', url: 'https://essayembassy.com/' }];
    const parts = path.split('/').filter(Boolean);
    let accum = '';
    parts.forEach((seg) => {
      accum += '/' + seg;
      // Human-friendly labels
      const label = seg
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (m) => m.toUpperCase());
      crumbs.push({ name: label, url: 'https://essayembassy.com' + accum });
    });
    const breadcrumb = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: crumbs.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: c.name,
        item: c.url
      }))
    };
    setJsonLd('ld-breadcrumb', breadcrumb);
  }, [location.pathname, isAdminPage]);

  if (!isAdminPage && !isClientDashboard && isJunkPublicUrl(location.pathname, location.search)) {
    return (
      <>
        <Helmet>
          <title>Not Found | Essay Embassy</title>
          <meta name="robots" content="noindex, nofollow" />
        </Helmet>
        <div className="min-h-screen flex items-center justify-center px-6 text-center text-gray-600">
          Page not found.
        </div>
      </>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">

      <Header onToggleSidebar={handleToggleSidebar} />

      <div className="flex flex-1">
        {isAdminPage && <AdminSidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />}
        {isClientDashboard && (
          <ClientSidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
        )}

        {/* FIXED: Removed overflow classes that were preventing sticky positioning */}
        <main className="flex-1">
          {/* This container is now inside the Outlet pages, which is a better pattern */}
          <Outlet />
        </main>
      </div>

      {!isAdminPage && <Footer />}
    </div>
  );
}