import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function ArticlesSection() {
  const articles = [
    {
      id: 1,
      slug: 'blockchain-basics',
      title: 'Blockchain Basics: A Beginner\'s Guide',
      excerpt: 'Think of blockchain as a digital notebook that everyone can see, but no one can erase. Learn how it works in simple terms!',
      category: 'Fundamentals',
      date: 'Jan 25, 2025',
      readTime: '6 min',
      color: 'from-teal-100 to-green-100 dark:from-teal-900/30 dark:to-green-900/30',
      icon: '🔗',
    },
    {
      id: 2,
      slug: 'decentralization-explained',
      title: 'Decentralization: Power to Everyone',
      excerpt: 'Imagine if no single person or company controlled the internet. Learn why decentralization matters and how it works.',
      category: 'Fundamentals',
      date: 'Jan 24, 2025',
      readTime: '6 min',
      color: 'from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30',
      icon: '🌐',
    },
    {
      id: 3,
      slug: 'blockchain-vs-traditional',
      title: 'Blockchain vs Traditional: When to Use What',
      excerpt: 'Blockchain is powerful, but not always the right choice. Learn when to use blockchain and when traditional systems work better.',
      category: 'Fundamentals',
      date: 'Jan 23, 2025',
      readTime: '7 min',
      color: 'from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30',
      icon: '⚖️',
    },
    {
      id: 4,
      slug: 'what-is-consensus',
      title: 'What is Consensus? How Blockchains Agree',
      excerpt: 'Learn how thousands of computers around the world agree on the same information without trusting each other.',
      category: 'Basics',
      date: 'Jan 20, 2025',
      readTime: '5 min',
      color: 'from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30',
      icon: '🤝',
    },
    {
      id: 5,
      slug: 'proof-of-work',
      title: 'Proof of Work: Mining Explained Simply',
      excerpt: 'Understand how Bitcoin mining works! Computers solve puzzles to secure the network and earn rewards.',
      category: 'Consensus',
      date: 'Jan 16, 2025',
      readTime: '7 min',
      color: 'from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30',
      icon: '⛏️',
    },
    {
      id: 6,
      slug: 'proof-of-stake',
      title: 'Proof of Stake: Earn While You Hold',
      excerpt: 'Learn how to earn passive income by staking your cryptocurrency. A greener, faster alternative to mining.',
      category: 'Consensus',
      date: 'Jan 14, 2025',
      readTime: '7 min',
      color: 'from-indigo-100 to-blue-100 dark:from-indigo-900/30 dark:to-blue-900/30',
      icon: '🏦',
    },
  ]

  return (
    <section id="articles" className="py-20 sm:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-100 dark:bg-purple-900/30 rounded-full border border-purple-200 dark:border-purple-800">
            <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
              Resources
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground text-balance">
            Latest Articles & Insights
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-balance">
            Stay updated with the latest blockchain education and cryptocurrency trends
          </p>
        </div>

        {/* Featured article (larger) */}
        <div className="mb-12">
          <Link href={`/article/${articles[0].slug}`}>
            <div className={`group bg-gradient-to-br ${articles[0].color} rounded-2xl p-8 border border-border hover:border-accent hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden`}>
              <div className="flex flex-col md:flex-row gap-8 items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl">{articles[0].icon}</span>
                    <div>
                      <span className="inline-block px-3 py-1 bg-accent/20 text-accent rounded-full text-xs font-semibold uppercase tracking-wider">
                        {articles[0].category}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-3xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors">
                    {articles[0].title}
                  </h3>
                  <p className="text-muted-foreground mb-6 text-lg leading-relaxed">
                    {articles[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{articles[0].date}</span>
                      <span>•</span>
                      <span>{articles[0].readTime} read</span>
                    </div>
                    <button className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity group-hover:translate-x-1 transition-transform">
                      Read Article <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Articles grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.slice(1).map((article) => (
            <Link key={article.id} href={`/article/${article.slug}`}>
              <div className={`group h-full bg-gradient-to-br ${article.color} rounded-2xl p-6 border border-border hover:border-accent hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden flex flex-col`}>
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{article.icon}</span>
                  <span className="inline-block px-2 py-1 bg-accent/20 text-accent rounded text-xs font-semibold uppercase tracking-wider">
                    {article.category}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-muted-foreground text-sm mb-4 leading-relaxed flex-1 line-clamp-3">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{article.readTime}</span>
                  </div>
                  <button className="inline-flex items-center gap-1 text-accent font-semibold hover:gap-2 transition-all group-hover:translate-x-1 transition-transform">
                    Read <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View all articles CTA */}
        <div className="mt-12 text-center">
          <Link 
            href="/articles"
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-accent text-accent rounded-full font-semibold hover:bg-accent hover:text-accent-foreground transition-all duration-300"
          >
            View All Articles <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  )
}
