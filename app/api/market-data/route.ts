import { NextResponse } from 'next/server'

// Cache the response for 60 seconds
export const revalidate = 60

const coinGeckoIds: Record<string, string> = {
  btc: 'bitcoin',
  eth: 'ethereum',
  bnb: 'binancecoin',
  sol: 'solana',
  ada: 'cardano',
  matic: 'matic-network',
}

export async function GET() {
  try {
    const ids = Object.values(coinGeckoIds).join(',')
    
    const response = await fetch(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&sparkline=false&price_change_percentage=24h,7d`,
      {
        headers: {
          'Accept': 'application/json',
        },
        next: { revalidate: 60 },
      }
    )

    if (!response.ok) {
      console.error('CoinGecko API error:', response.status)
      return NextResponse.json({ error: 'Failed to fetch market data' }, { status: response.status })
    }

    const data = await response.json()
    
    // Map the data back to our slugs
    const result: Record<string, any> = {}
    for (const coin of data) {
      const slug = Object.entries(coinGeckoIds).find(([_, id]) => id === coin.id)?.[0]
      if (slug) {
        result[slug] = coin
      }
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error('Failed to fetch market data:', error)
    return NextResponse.json({ error: 'Failed to fetch market data' }, { status: 500 })
  }
}
