import { TrendingUp, TrendingDown, Activity, DollarSign, BarChart3, Coins } from 'lucide-react'
import {
  CoinMarketData,
  formatPrice,
  formatMarketCap,
  formatVolume,
  formatSupply,
  formatPercentage,
} from '@/lib/coingecko'

interface MarketStatsProps {
  data: CoinMarketData
}

export function MarketStats({ data }: MarketStatsProps) {
  const isPositive24h = (data.price_change_percentage_24h ?? 0) >= 0
  const isPositive7d = (data.price_change_percentage_7d ?? 0) >= 0

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {/* Current Price */}
      <div className="bg-card rounded-xl p-4 border border-border">
        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
          <DollarSign size={14} />
          <span>Price</span>
        </div>
        <p className="text-xl font-bold text-foreground">{formatPrice(data.current_price)}</p>
      </div>

      {/* 24h Change */}
      <div className="bg-card rounded-xl p-4 border border-border">
        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
          {isPositive24h ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          <span>24h Change</span>
        </div>
        <p className={`text-xl font-bold ${isPositive24h ? 'text-green-500' : 'text-red-500'}`}>
          {formatPercentage(data.price_change_percentage_24h)}
        </p>
      </div>

      {/* 7d Change */}
      <div className="bg-card rounded-xl p-4 border border-border">
        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
          {isPositive7d ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
          <span>7d Change</span>
        </div>
        <p className={`text-xl font-bold ${data.price_change_percentage_7d === undefined || data.price_change_percentage_7d === null ? 'text-muted-foreground' : isPositive7d ? 'text-green-500' : 'text-red-500'}`}>
          {formatPercentage(data.price_change_percentage_7d)}
        </p>
      </div>

      {/* Market Cap */}
      <div className="bg-card rounded-xl p-4 border border-border">
        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
          <BarChart3 size={14} />
          <span>Market Cap</span>
        </div>
        <p className="text-xl font-bold text-foreground">{formatMarketCap(data.market_cap)}</p>
        <p className="text-xs text-muted-foreground">Rank #{data.market_cap_rank}</p>
      </div>

      {/* 24h Volume */}
      <div className="bg-card rounded-xl p-4 border border-border">
        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
          <Activity size={14} />
          <span>24h Volume</span>
        </div>
        <p className="text-xl font-bold text-foreground">{formatVolume(data.total_volume)}</p>
      </div>

      {/* Circulating Supply */}
      <div className="bg-card rounded-xl p-4 border border-border">
        <div className="flex items-center gap-2 text-muted-foreground text-sm mb-1">
          <Coins size={14} />
          <span>Circulating</span>
        </div>
        <p className="text-xl font-bold text-foreground">{formatSupply(data.circulating_supply)}</p>
        {data.max_supply && (
          <p className="text-xs text-muted-foreground">
            of {formatSupply(data.max_supply)} max
          </p>
        )}
      </div>

      {/* Data Source Attribution */}
      <div className="col-span-2 md:col-span-3 lg:col-span-6 text-center pt-2">
        <p className="text-xs text-muted-foreground">
          Market data provided by{' '}
          <a 
            href="https://www.coingecko.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            CoinGecko
          </a>
        </p>
      </div>
    </div>
  )
}
