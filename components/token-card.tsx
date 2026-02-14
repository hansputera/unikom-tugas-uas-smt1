/**
 * NIM: 10125905
 * Nama: HANIF DWY PUTRA S
 *
 * NIM: 10125903
 * Nama: ADITYA SYAHESTIANO
 */

'use client'

import Link from 'next/link'
import { TrendingUp, TrendingDown, RefreshCw } from 'lucide-react'
import { useMarketData } from './market-data-provider'

interface TokenCardProps {
  slug: string
  name: string
  symbol: string
  description: string
  tokenomics: string
  logo: string
  fallbackMarketCap: string
  fallbackChange: string
}

export function TokenCard({
  slug,
  name,
  symbol,
  description,
  tokenomics,
  logo,
  fallbackMarketCap,
  fallbackChange,
}: TokenCardProps) {
  const { data: allMarketData, loading } = useMarketData()
  const marketData = allMarketData[slug] || null

  const formatMarketCap = (cap: number | null | undefined) => {
    if (cap == null) return null
    if (cap >= 1e12) return `$${(cap / 1e12).toFixed(2)}T`
    if (cap >= 1e9) return `$${(cap / 1e9).toFixed(2)}B`
    if (cap >= 1e6) return `$${(cap / 1e6).toFixed(2)}M`
    return `$${cap.toLocaleString()}`
  }

  const formatPrice = (price: number | null | undefined) => {
    if (price == null) return null
    if (price >= 1) {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(price)
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 4,
      maximumFractionDigits: 6,
    }).format(price)
  }

  const change = marketData?.price_change_percentage_24h
  const isPositive = change != null ? change >= 0 : fallbackChange.startsWith('+')
  const displayChange = change != null ? `${change >= 0 ? '+' : ''}${change.toFixed(2)}%` : fallbackChange
  const displayMarketCap = formatMarketCap(marketData?.market_cap) ?? fallbackMarketCap

  return (
    <div className="group bg-card rounded-2xl p-6 border border-border hover:border-accent hover:shadow-lg transition-all duration-300 overflow-hidden">
      {/* Header with logo and basic info */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <img
            src={logo || '/placeholder.svg'}
            alt={name}
            className="w-14 h-14 rounded-xl p-2 bg-secondary dark:bg-secondary/50"
            crossOrigin="anonymous"
          />
          <div>
            <h3 className="text-xl font-bold text-foreground">{name}</h3>
            <p className="text-sm text-muted-foreground">{symbol}</p>
          </div>
        </div>
        <div className="text-right">
          <div className={`text-lg font-bold flex items-center gap-1 ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {loading ? (
              <RefreshCw size={16} className="animate-spin" />
            ) : isPositive ? (
              <TrendingUp size={16} />
            ) : (
              <TrendingDown size={16} />
            )}
            {displayChange}
          </div>
          <div className="text-sm font-semibold text-foreground">{displayMarketCap}</div>
        </div>
      </div>

      {/* Price */}
      {marketData?.current_price != null && (
        <div className="mb-4 p-3 bg-muted/50 rounded-lg">
          <p className="text-xs text-muted-foreground mb-1">Current Price</p>
          <p className="text-lg font-bold text-foreground">{formatPrice(marketData.current_price)}</p>
        </div>
      )}

      {/* Description */}
      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{description}</p>

      {/* Divider */}
      <div className="w-full h-px bg-border my-4" />

      {/* Tokenomics */}
      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Tokenomics</p>
        <p className="text-sm text-muted-foreground leading-relaxed">{tokenomics}</p>
      </div>

      {/* Learn more button */}
      <Link
        href={`/token/${slug}`}
        className="mt-6 w-full px-4 py-2 border border-accent text-accent rounded-lg font-medium hover:bg-accent hover:text-accent-foreground transition-all duration-300 text-sm group/btn block text-center"
      >
        Learn More
      </Link>
    </div>
  )
}
