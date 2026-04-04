import { notFound } from "next/navigation";
import Link from "next/link";
import { newsroom } from "@/lib/data";

export async function generateStaticParams() {
  return newsroom.map((article) => ({
    slug: article.slug,
  }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Await the params due to Next.js 15+ async route param requirements if applicable, or treat it natively. 
  const resolvedParams = await params;
  const article = newsroom.find((a) => a.slug === resolvedParams.slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pt-48 pb-32 px-[5%] md:px-[8%] selection:bg-[var(--accent)] selection:text-[var(--charcoal)]">
      
      {/* Return Navigation */}
      <nav className="max-w-4xl mx-auto mb-20 animate-fade-in opacity-0" style={{ animation: "fadeIn 1s forwards", paddingTop: '90px' }}>
        <Link 
          href="/blog" 
          className="uppercase tracking-[0.25em] font-condensed text-[var(--muted)] text-xs md:text-sm hover:text-[var(--accent)] transition-colors duration-300"
        >
          [ &larr; Return to Newsroom ]
        </Link>
      </nav>

      {/* Hero Header */}
      <header className="max-w-4xl mx-auto mb-20 animate-fade-up opacity-0" style={{ animation: "fadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.2s" }}>
        <div className="flex gap-4 items-center uppercase tracking-[0.2em] font-condensed text-xs text-[var(--muted)] border-b border-[rgba(255,255,255,0.05)] pb-6 mb-12">
          <span>{article.date}</span>
          <span className="w-1 h-1 rounded-full bg-[var(--accent)]" />
          <span>{article.author}</span>
        </div>
        
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight text-[var(--foreground)] mb-10">
          {article.title}
        </h1>
        
        <p className="font-sans text-[var(--muted)] max-w-2xl text-lg md:text-xl font-light leading-relaxed border-l border-[var(--accent)] pl-6">
          {article.excerpt}
        </p>
      </header>

      {/* Hero Image */}
      <section className="max-w-[100rem] mx-auto mb-20 md:mb-32 animate-fade-up opacity-0" style={{ animation: "fadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.4s" }}>
         <div className="w-full aspect-[16/9] md:aspect-[21/9] relative overflow-hidden bg-[var(--concrete)]">
            <div 
               className="absolute inset-0 bg-cover bg-center"
               style={{ backgroundImage: `url(${article.image})` }}
            />
         </div>
      </section>

      {/* Longform Content Area */}
      <article className="max-w-3xl mx-auto px-4 md:px-0 animate-fade-up opacity-0" style={{ animation: "fadeUp 1.2s cubic-bezier(0.16, 1, 0.3, 1) forwards 0.6s" }}>
        <div className="font-sans text-[var(--foreground)] text-base md:text-lg leading-[2] font-light space-y-8">
          {/* We simulate paragraphs from the content by splitting on newlines if they exist, or just rendering the content block. */}
          {article.content.split('\n\n').map((paragraph, i) => (
             <p key={i}>{paragraph}</p>
          ))}
        </div>
        
        <div className="mt-32 pt-12 border-t border-[rgba(255,255,255,0.05)] text-center">
            <span className="uppercase tracking-[0.3em] font-condensed text-[var(--muted)] text-xl">
               ◆
            </span>
        </div>
      </article>

      {/* One-off inline styles for the pure CSS animations since we didn't inject them into globals.css yet */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}} />
    </main>
  );
}
