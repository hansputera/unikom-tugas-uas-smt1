import Link from 'next/link'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { notFound } from 'next/navigation'
import { promises as fs } from 'fs'
import path from 'path'
import { getTokenMetadata, getAllTokenSlugs } from '@/content/tokens/metadata'
import { TradingViewChart } from './trading-view-chart'
import { MarketStats } from './market-stats'
import { fetchTokenMarketData, formatPrice, formatPercentage } from '@/lib/coingecko'

// Generate static params for all tokens
export async function generateStaticParams() {
  const slugs = getAllTokenSlugs()
  return slugs.map((slug) => ({ slug }))
}

async function getTokenContent(slug: string): Promise<string | null> {
  try {
    const filePath = path.join(process.cwd(), 'content', 'tokens', `${slug}.html`);
    const content = await fs.readFile(filePath, 'utf-8');
    return content;
  } catch {
    return null;
  }
}

export default async function TokenPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const metadata = getTokenMetadata(slug)
  const content = await getTokenContent(slug)
  const marketData = await fetchTokenMarketData(slug)

  if (!metadata || !content) {
    notFound()
  }

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background border-b border-border backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">Ⓑ</span>
            </div>
            <span className="font-bold text-xl text-foreground hidden sm:inline">LearnBlock</span>
          </Link>
          <Link href="/#tokens" className="flex items-center gap-2 text-accent hover:underline font-medium">
            <ArrowLeft size={20} />
            <span className="hidden sm:inline">Back to Tokens</span>
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Token header */}
          <div className="mb-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-6">
              <img
                src={metadata.logo}
                alt={metadata.name}
                className="w-20 h-20 rounded-2xl"
              />
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
                    {metadata.name}
                  </h1>
                  <span className="px-3 py-1 bg-muted text-muted-foreground rounded-lg text-lg font-semibold">
                    {metadata.symbol}
                  </span>
                </div>
                {marketData ? (
                  <div className="flex items-center gap-4">
                    <p className="text-2xl font-bold text-foreground">
                      {formatPrice(marketData.current_price)}
                    </p>
                    <span
                      className={`text-lg font-semibold ${
                        (marketData.price_change_percentage_24h ?? 0) >= 0 ? 'text-green-500' : 'text-red-500'
                      }`}
                    >
                      {formatPercentage(marketData.price_change_percentage_24h)}
                    </span>
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    Market Cap: <span className="text-foreground font-semibold">{metadata.marketCap}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Market Stats */}
            {marketData && (
              <div className="mt-6">
                <MarketStats data={marketData} />
              </div>
            )}

            {/* External links */}
            <div className="flex flex-wrap gap-3">
              <a
                href={metadata.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                <ExternalLink size={16} />
                Website
              </a>
              {metadata.whitepaper && (
                <a
                  href={metadata.whitepaper}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-muted text-foreground rounded-lg font-medium hover:bg-muted/80 transition-colors"
                >
                  <ExternalLink size={16} />
                  Whitepaper
                </a>
              )}
            </div>
          </div>

          {/* TradingView Chart */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-4">Price Chart</h2>
            <div className="rounded-xl overflow-hidden border border-border bg-card">
              <TradingViewChart symbol={metadata.tradingViewSymbol} />
            </div>
          </div>

          {/* Token content */}
          <div className="prose prose-invert max-w-none">
            <div
              dangerouslySetInnerHTML={{ __html: content }}
              className="space-y-6 text-muted-foreground leading-relaxed"
            />
          </div>

          {/* Back to tokens */}
          <div className="mt-16 pt-12 border-t border-border">
            <h2 className="text-2xl font-bold text-foreground mb-8">Explore More Tokens</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {getAllTokenSlugs()
                .filter((s) => s !== slug)
                .slice(0, 3)
                .map((tokenSlug) => {
                  const token = getTokenMetadata(tokenSlug)
                  if (!token) return null
                  return (
                    <Link key={tokenSlug} href={`/token/${tokenSlug}`}>
                      <div className="p-4 bg-card rounded-lg border border-border hover:border-accent transition-colors cursor-pointer group flex items-center gap-4">
                        <img src={token.logo} alt={token.name} className="w-10 h-10" />
                        <div>
                          <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                            {token.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">{token.symbol}</p>
                        </div>
                      </div>
                    </Link>
                  )
                })}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
