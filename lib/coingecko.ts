/**
 * NIM: 10125905
 * Nama: HANIF DWY PUTRA S
 *
 * NIM: 10125903
 * Nama: ADITYA SYAHESTIANO
 */

// CoinGecko API integration for real-time crypto market data
// Free API - no API key required (rate limited to ~10-30 calls/minute)

export interface CoinMarketData {
  id: string
  symbol: string
  name: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  price_change_percentage_24h: number
  price_change_percentage_7d: number
  total_volume: number
  circulating_supply: number
  total_supply: number | null
  max_supply: number | null
  ath: number
  ath_change_percentage: number
  ath_date: string
  last_updated: string
}

// Map our token slugs to CoinGecko IDs
export const coinGeckoIds: Record<string, string> = {
  btc: 'bitcoin',
  eth: 'ethereum',
  bnb: 'binancecoin',
  sol: 'solana',
  ada: 'cardano',
  matic: 'matic-network',
}

export function getCoinGeckoId(slug: string): string | undefined {
  return coinGeckoIds[slug.toLowerCase()]
}

export async function fetchTokenMarketData(slug: string): Promise<CoinMarketData | null> {
  const coinId = getCoinGeckoId(slug)
  if (!coinId) return null

  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinId}&order=market_cap_desc&sparkline=false&price_change_percentage=24h,7d`,
      {
        next: { revalidate: 60 }, // Cache for 60 seconds
      }
    )

    if (!response.ok) {
      console.error('CoinGecko API error:', response.status)
      return null
    }

    const data = await response.json()
    return data[0] || null
  } catch (error) {
    console.error('Failed to fetch market data:', error)
    return null
  }
}

export async function fetchMultipleTokensMarketData(slugs: string[]): Promise<Record<string, CoinMarketData>> {
  const coinIds = slugs.map(getCoinGeckoId).filter(Boolean).join(',')
  if (!coinIds) return {}

  try {
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds}&order=market_cap_desc&sparkline=false&price_change_percentage=24h,7d`,
      {
        next: { revalidate: 60 }, // Cache for 60 seconds
      }
    )

    if (!response.ok) {
      console.error('CoinGecko API error:', response.status)
      return {}
    }

    const data: CoinMarketData[] = await response.json()
    
    // Map back to our slugs
    const result: Record<string, CoinMarketData> = {}
    for (const coin of data) {
      const slug = Object.entries(coinGeckoIds).find(([_, id]) => id === coin.id)?.[0]
      if (slug) {
        result[slug] = coin
      }
    }
    return result
  } catch (error) {
    console.error('Failed to fetch market data:', error)
    return {}
  }
}

export function formatPrice(price: number | null | undefined): string {
  if (price == null) return 'N/A'
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

export function formatMarketCap(marketCap: number | null | undefined): string {
  if (marketCap == null) return 'N/A'
  if (marketCap >= 1e12) {
    return `$${(marketCap / 1e12).toFixed(2)}T`
  }
  if (marketCap >= 1e9) {
    return `$${(marketCap / 1e9).toFixed(2)}B`
  }
  if (marketCap >= 1e6) {
    return `$${(marketCap / 1e6).toFixed(2)}M`
  }
  return `$${marketCap.toLocaleString()}`
}

export function formatVolume(volume: number | null | undefined): string {
  if (volume == null) return 'N/A'
  if (volume >= 1e9) {
    return `$${(volume / 1e9).toFixed(2)}B`
  }
  if (volume >= 1e6) {
    return `$${(volume / 1e6).toFixed(2)}M`
  }
  return `$${volume.toLocaleString()}`
}

export function formatSupply(supply: number | null | undefined): string {
  if (supply == null) return 'N/A'
  if (supply >= 1e9) {
    return `${(supply / 1e9).toFixed(2)}B`
  }
  if (supply >= 1e6) {
    return `${(supply / 1e6).toFixed(2)}M`
  }
  return supply.toLocaleString()
}

export function formatPercentage(percent: number | undefined | null): string {
  if (percent === undefined || percent === null) return 'N/A'
  const sign = percent >= 0 ? '+' : ''
  return `${sign}${percent.toFixed(2)}%`
}
