import Link from 'next/link'
import { ArrowLeft, Clock, User, Calendar, BookOpen } from 'lucide-react'
import { notFound } from 'next/navigation'
import { promises as fs } from 'fs'
import path from 'path'
import { getArticleMetadata, getAllArticleSlugs, articlesMetadata } from '@/content/articles/metadata'

// Generate static params for all articles
export async function generateStaticParams() {
  const slugs = getAllArticleSlugs()
  return slugs.map((slug) => ({ slug }))
}

async function getArticleContent(slug: string): Promise<string | null> {
  try {
    const filePath = path.join(process.cwd(), 'content', 'articles', `${slug}.html`)
    const content = await fs.readFile(filePath, 'utf-8')
    return content
  } catch {
    return null
  }
}

// Get related articles (different from current)
function getRelatedArticles(currentSlug: string) {
  const allSlugs = Object.keys(articlesMetadata)
  return allSlugs
    .filter(slug => slug !== currentSlug)
    .slice(0, 3)
    .map(slug => ({
      slug,
      ...articlesMetadata[slug]
    }))
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const metadata = getArticleMetadata(slug)
  const content = await getArticleContent(slug)

  if (!metadata || !content) {
    notFound()
  }

  const relatedArticles = getRelatedArticles(slug)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 border-b border-border backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-9 h-9 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">Ⓑ</span>
            </div>
            <span className="font-bold text-lg text-foreground hidden sm:inline">LearnBlock</span>
          </Link>
          <Link 
            href="/#articles" 
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
          >
            <ArrowLeft size={16} />
            <span>All Articles</span>
          </Link>
        </div>
      </header>

      {/* Hero section */}
      <div className="relative bg-gradient-to-b from-muted/50 to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Category badge */}
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">{metadata.icon}</span>
            <span className="inline-block px-3 py-1 bg-accent/10 text-accent rounded-full text-xs font-semibold uppercase tracking-wider">
              {metadata.category}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-6">
            {metadata.title}
          </h1>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User size={14} />
              <span>{metadata.author}</span>
            </div>
            <div className="w-1 h-1 bg-muted-foreground rounded-full hidden sm:block" />
            <div className="flex items-center gap-2">
              <Calendar size={14} />
              <span>{metadata.date}</span>
            </div>
            <div className="w-1 h-1 bg-muted-foreground rounded-full hidden sm:block" />
            <div className="flex items-center gap-2">
              <Clock size={14} />
              <span>{metadata.readTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Article content card */}
        <article className="bg-card border border-border rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm -mt-4">
          <div className="prose prose-invert max-w-none">
            <div
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </article>

        {/* Related articles section */}
        <div className="mt-12">
          <div className="flex items-center gap-2 mb-6">
            <BookOpen size={20} className="text-accent" />
            <h2 className="text-xl font-bold text-foreground">Continue Learning</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {relatedArticles.map((article) => (
              <Link key={article.slug} href={`/article/${article.slug}`}>
                <div className="group h-full p-5 bg-card rounded-xl border border-border hover:border-accent hover:shadow-md transition-all duration-200">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">{article.icon}</span>
                    <span className="text-xs text-accent font-medium uppercase">{article.category}</span>
                  </div>
                  <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-2 text-sm">
                    {article.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-2">{article.readTime}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Back to top */}
        <div className="mt-12 text-center">
          <Link 
            href="/#articles"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            <ArrowLeft size={16} />
            Back to All Articles
          </Link>
        </div>
      </main>
    </div>
  )
}
