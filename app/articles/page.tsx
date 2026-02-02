import Link from 'next/link'
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react'
import { articlesMetadata } from '@/content/articles/metadata'

export default function ArticlesPage() {
  // Convert metadata object to array with slugs
  const articles = Object.entries(articlesMetadata).map(([slug, metadata]) => ({
    slug,
    ...metadata,
  }))

  // Color mapping for categories
  const categoryColors: Record<string, string> = {
    'Basics': 'from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30',
    'Economics': 'from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30',
    'Consensus': 'from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30',
    'Fundamentals': 'from-teal-100 to-green-100 dark:from-teal-900/30 dark:to-green-900/30',
    'DeFi': 'from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30',
    'Technology': 'from-indigo-100 to-blue-100 dark:from-indigo-900/30 dark:to-blue-900/30',
    'Assets': 'from-pink-100 to-rose-100 dark:from-pink-900/30 dark:to-rose-900/30',
    'Security': 'from-red-100 to-orange-100 dark:from-red-900/30 dark:to-orange-900/30',
    'Scaling': 'from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-900/30',
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/80 border-b border-border backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-9 h-9 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">Ⓑ</span>
            </div>
            <span className="font-bold text-lg text-foreground hidden sm:inline">LearnBlock</span>
          </Link>
          <Link 
            href="/" 
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
          >
            <ArrowLeft size={16} />
            <span>Back Home</span>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <div className="bg-gradient-to-b from-muted/50 to-background py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full border border-purple-200 dark:border-purple-800 mb-6">
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
              📚 Educational Resources
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            All Articles
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore our complete collection of blockchain and cryptocurrency educational articles. 
            Perfect for beginners and enthusiasts alike!
          </p>
          <p className="text-sm text-muted-foreground mt-4">
            {articles.length} articles available
          </p>
        </div>
      </div>

      {/* Articles Grid */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link key={article.slug} href={`/article/${article.slug}`}>
              <div className={`group h-full bg-gradient-to-br ${categoryColors[article.category] || 'from-gray-100 to-gray-200 dark:from-gray-900/30 dark:to-gray-800/30'} rounded-2xl p-6 border border-border hover:border-accent hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col`}>
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{article.icon}</span>
                  <span className="inline-block px-2 py-1 bg-accent/10 text-accent rounded text-xs font-semibold uppercase tracking-wider">
                    {article.category}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors line-clamp-2">
                  {article.title}
                </h2>

                {/* Author and date */}
                <p className="text-sm text-muted-foreground mb-4">
                  By {article.author}
                </p>

                {/* Footer */}
                <div className="mt-auto pt-4 border-t border-border/50 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock size={12} />
                    <span>{article.readTime}</span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-accent font-semibold text-sm group-hover:gap-2 transition-all">
                    Read <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Back home button */}
        <div className="mt-12 text-center">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-accent-foreground rounded-full font-medium hover:opacity-90 transition-opacity"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  )
}
