import React from 'react';
import { Link } from 'react-router-dom';

const QAHome: React.FC = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="max-w-6xl mx-auto px-6 py-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=64&h=64&fit=crop&auto=format&dpr=2"
              alt="Logo"
              className="w-10 h-10 rounded"
            />
            <div>
              <h1 className="text-xl font-semibold">Q&A Admin Demo</h1>
              <p className="text-sm text-muted-foreground">LocalStorage-powered content management</p>
            </div>
          </div>
          <nav className="hidden sm:flex items-center gap-3">
            <Link to="/qa" className="px-4 py-2 rounded border font-medium hover:bg-accent">
              Browse Q&A
            </Link>
            <Link to="/admin/qa" className="px-4 py-2 rounded bg-primary text-primary-foreground font-medium">
              Open Admin
            </Link>
          </nav>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10 grid gap-10">
        <section className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Manage your Q&A library</h2>
            <p className="text-muted-foreground">
              This example replaces Firebase with a lightweight localStorage store and provides an admin interface to
              create, edit, and delete Q&A entries. Use the links below to explore the list view and the rich text form.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/admin/qa" className="px-5 py-2.5 rounded bg-primary text-primary-foreground font-semibold">
                Go to Q&A Manager
              </Link>
              <Link to="/qa" className="px-5 py-2.5 rounded border font-semibold hover:bg-accent">
                Browse Q&A
              </Link>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-lg border">
            <img
              src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&auto=format&fit=crop&q=60"
              alt="Admin preview"
              className="w-full h-64 object-cover"
            />
          </div>
        </section>

        <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="rounded-lg border p-5 bg-card">
            <h3 className="font-semibold mb-2">Local mock store</h3>
            <p className="text-sm text-muted-foreground">
              Entries are persisted to your browser using localStorage. No external services required.
            </p>
          </div>
          <div className="rounded-lg border p-5 bg-card">
            <h3 className="font-semibold mb-2">Rich text editor</h3>
            <p className="text-sm text-muted-foreground">Compose titles, questions, and answers with basic formatting.</p>
          </div>
          <div className="rounded-lg border p-5 bg-card">
            <h3 className="font-semibold mb-2">Shadcn/Tailwind UI</h3>
            <p className="text-sm text-muted-foreground">Clean UI built with Tailwind and simple components.</p>
          </div>
        </section>
      </main>

      <footer className="border-t">
        <div className="max-w-6xl mx-auto px-6 py-6 text-sm text-muted-foreground">
          Tip: Add a few Q&A items, then refresh the list page to see them persisted.
        </div>
      </footer>
    </div>
  );
};

export default QAHome;
