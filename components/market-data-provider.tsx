/**
 * NIM: 10125905
 * Nama: HANIF DWY PUTRA S
 *
 * NIM: 10125903
 * Nama: ADITYA SYAHESTIANO
 */

'use client'

import { useEffect, useState, createContext, useContext, ReactNode } from 'react'

interface TokenData {
  id: string
  symbol: string
  name: string
  current_price: number
  market_cap: number
  price_change_percentage_24h: number
  image: string
}

interface MarketDataContextType {
  data: Record<string, TokenData>
  loading: boolean
}

const MarketDataContext = createContext<MarketDataContextType>({
  data: {},
  loading: true,
})

export function useMarketData() {
  return useContext(MarketDataContext)
}

export function MarketDataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<Record<string, TokenData>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/market-data')
        if (response.ok) {
          const result = await response.json()
          setData(result)
        }
      } catch (error) {
        console.error('Failed to fetch market data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <MarketDataContext.Provider value={{ data, loading }}>
      {children}
    </MarketDataContext.Provider>
  )
}
