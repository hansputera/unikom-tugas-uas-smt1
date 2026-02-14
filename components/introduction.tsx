/**
 * NIM: 10125905
 * Nama: HANIF DWY PUTRA S
 *
 * NIM: 10125903
 * Nama: ADITYA SYAHESTIANO
 */

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ChevronRight, Sparkles, BookOpen, Play, Pause, RotateCcw } from 'lucide-react'

export default function Introduction() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [showHash, setShowHash] = useState<number[]>([])
  const [chainConnected, setChainConnected] = useState<number[]>([])
  const [miningBlock, setMiningBlock] = useState<number | null>(null)

  const blocks = [
    {
      id: 1,
      hash: '0x7a3f...',
      prevHash: '0x0000...',
      data: 'Genesis Block',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-500',
    },
    {
      id: 2,
      hash: '0x9b2e...',
      prevHash: '0x7a3f...',
      data: 'Alice → Bob: 5 BTC',
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-500',
    },
    {
      id: 3,
      hash: '0x4c8d...',
      prevHash: '0x9b2e...',
      data: 'Bob → Carol: 2 BTC',
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-500',
    },
    {
      id: 4,
      hash: '0x1f5a...',
      prevHash: '0x4c8d...',
      data: 'Carol → Dave: 1 BTC',
      color: 'from-orange-500 to-amber-600',
      bgColor: 'bg-orange-500',
    },
  ]

  const steps = [
    { action: 'mine', block: 0 },
    { action: 'hash', block: 0 },
    { action: 'connect', block: 0 },
    { action: 'mine', block: 1 },
    { action: 'hash', block: 1 },
    { action: 'connect', block: 1 },
    { action: 'mine', block: 2 },
    { action: 'hash', block: 2 },
    { action: 'connect', block: 2 },
    { action: 'mine', block: 3 },
    { action: 'hash', block: 3 },
    { action: 'connect', block: 3 },
    { action: 'complete', block: -1 },
  ]

  useEffect(() => {
    if (!isPlaying) return

    const timer = setTimeout(() => {
      if (currentStep >= steps.length - 1) {
        setIsPlaying(false)
        return
      }

      const step = steps[currentStep]
      
      if (step.action === 'mine') {
        setMiningBlock(step.block)
      } else if (step.action === 'hash') {
        setMiningBlock(null)
        setShowHash(prev => [...prev, step.block])
      } else if (step.action === 'connect') {
        setChainConnected(prev => [...prev, step.block])
      }

      setCurrentStep(prev => prev + 1)
    }, 800)

    return () => clearTimeout(timer)
  }, [isPlaying, currentStep])

  const resetAnimation = () => {
    setIsPlaying(false)
    setCurrentStep(0)
    setShowHash([])
    setChainConnected([])
    setMiningBlock(null)
  }

  const togglePlay = () => {
    if (currentStep >= steps.length - 1) {
      resetAnimation()
      setTimeout(() => setIsPlaying(true), 100)
    } else {
      setIsPlaying(!isPlaying)
    }
  }

  const learningPaths = [
    {
      title: 'Beginner Path',
      emoji: '🌱',
      description: 'Start from zero and learn the basics',
      articles: ['blockchain-basics', 'decentralization-explained', 'what-is-consensus'],
      color: 'from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30',
      borderColor: 'border-green-300 dark:border-green-700',
    },
    {
      title: 'Understanding Crypto',
      emoji: '💰',
      description: 'Learn how cryptocurrencies work',
      articles: ['what-is-tokenomics', 'proof-of-work', 'proof-of-stake'],
      color: 'from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30',
      borderColor: 'border-blue-300 dark:border-blue-700',
    },
    {
      title: 'Hands-On Practice',
      emoji: '🎮',
      description: 'Try interactive blockchain simulations',
      link: '/playground',
      color: 'from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30',
      borderColor: 'border-purple-300 dark:border-purple-700',
    },
  ]

  const isComplete = currentStep >= steps.length - 1

  return (
    <section id="introduction" className="py-20 sm:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full border border-green-200 dark:border-green-800">
            <Sparkles className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-sm font-medium text-green-700 dark:text-green-300">
              Interactive Learning
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground text-balance">
            Watch a Blockchain Form
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto text-balance">
            See how blocks are mined, hashed, and chained together in real-time
          </p>
        </div>

        {/* Animated Blockchain */}
        <div className="mb-20">
          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <button
              onClick={togglePlay}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                isPlaying 
                  ? 'bg-orange-500 hover:bg-orange-600 text-white' 
                  : 'bg-green-500 hover:bg-green-600 text-white'
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-5 h-5" />
                  Pause
                </>
              ) : isComplete ? (
                <>
                  <RotateCcw className="w-5 h-5" />
                  Replay
                </>
              ) : (
                <>
                  <Play className="w-5 h-5" />
                  {currentStep === 0 ? 'Start Building' : 'Resume'}
                </>
              )}
            </button>
            
            {currentStep > 0 && !isComplete && (
              <button
                onClick={resetAnimation}
                className="flex items-center gap-2 px-4 py-3 rounded-xl font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Reset
              </button>
            )}
          </div>

          {/* Blockchain Visual */}
          <div className="relative bg-card rounded-3xl p-8 border border-border overflow-hidden">
            {/* Background grid */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }} />
            </div>

            {/* Chain connection line */}
            <div className="absolute top-1/2 left-0 right-0 h-2 -translate-y-1/2 hidden lg:block">
              <div className="h-full bg-muted rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-green-500 via-blue-500 via-purple-500 to-orange-500 transition-all duration-500"
                  style={{ width: `${(chainConnected.length / blocks.length) * 100}%` }}
                />
              </div>
            </div>

            {/* Blocks */}
            <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
              {blocks.map((block, index) => {
                const isVisible = showHash.includes(index) || chainConnected.includes(index) || miningBlock === index
                const isMining = miningBlock === index
                const isHashed = showHash.includes(index)
                const isConnected = chainConnected.includes(index)
                
                return (
                  <div 
                    key={block.id}
                    className={`relative transition-all duration-500 ${
                      isVisible ? 'opacity-100 scale-100' : 'opacity-30 scale-95'
                    }`}
                  >
                    {/* Block */}
                    <div 
                      className={`relative bg-card rounded-2xl border-2 overflow-hidden transition-all duration-300 ${
                        isConnected 
                          ? 'border-green-500 shadow-lg shadow-green-500/20' 
                          : isHashed
                          ? 'border-yellow-500 shadow-lg shadow-yellow-500/20'
                          : isMining
                          ? 'border-orange-500 shadow-lg shadow-orange-500/20'
                          : 'border-border'
                      }`}
                    >
                      {/* Mining animation overlay */}
                      {isMining && (
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-transparent to-orange-500/20 animate-pulse" />
                      )}

                      {/* Block header */}
                      <div className={`bg-gradient-to-r ${block.color} px-4 py-3`}>
                        <div className="flex items-center justify-between">
                          <span className="text-white font-bold">Block #{block.id}</span>
                          {isMining && (
                            <span className="text-white/80 text-xs animate-pulse">⛏️ Mining...</span>
                          )}
                          {isHashed && !isConnected && (
                            <span className="text-white/80 text-xs">✓ Hashed</span>
                          )}
                          {isConnected && (
                            <span className="text-white/80 text-xs">🔗 Linked</span>
                          )}
                        </div>
                      </div>

                      {/* Block content */}
                      <div className="p-4 space-y-3">
                        {/* Data */}
                        <div>
                          <span className="text-xs text-muted-foreground">Data</span>
                          <p className="font-mono text-sm text-foreground truncate">{block.data}</p>
                        </div>

                        {/* Previous Hash */}
                        <div className={`transition-opacity duration-300 ${isHashed ? 'opacity-100' : 'opacity-40'}`}>
                          <span className="text-xs text-muted-foreground">Prev Hash</span>
                          <p className="font-mono text-xs text-blue-500 dark:text-blue-400">{block.prevHash}</p>
                        </div>

                        {/* Hash */}
                        <div className={`transition-opacity duration-300 ${isHashed ? 'opacity-100' : 'opacity-40'}`}>
                          <span className="text-xs text-muted-foreground">Hash</span>
                          <p className={`font-mono text-xs transition-colors duration-300 ${
                            isHashed ? 'text-green-500 dark:text-green-400' : 'text-muted-foreground'
                          }`}>
                            {isHashed ? block.hash : '????????'}
                          </p>
                        </div>
                      </div>

                      {/* Connection indicator */}
                      {isConnected && index < blocks.length - 1 && (
                        <div className="absolute -right-6 top-1/2 -translate-y-1/2 hidden lg:block z-10">
                          <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white animate-bounce-slow">
                            →
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="mt-8 text-center">
              <p className="text-sm font-medium">
                {!isPlaying && currentStep === 0 && (
                  <span className="text-muted-foreground">Press &quot;Start Building&quot; to begin the animation</span>
                )}
                {miningBlock !== null && (
                  <span className="text-orange-500">⛏️ Mining Block #{(miningBlock ?? 0) + 1}...</span>
                )}
                {miningBlock === null && showHash.length > chainConnected.length && (
                  <span className="text-yellow-500">🔐 Computing hash...</span>
                )}
                {miningBlock === null && showHash.length === chainConnected.length && chainConnected.length > 0 && !isComplete && (
                  <span className="text-green-500">🔗 Block connected to chain!</span>
                )}
                {isComplete && (
                  <span className="text-green-500">✨ Blockchain complete! All blocks are securely linked.</span>
                )}
              </p>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-6">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
              <span>Progress</span>
              <span>{Math.min(Math.round((currentStep / (steps.length - 1)) * 100), 100)}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300"
                style={{ width: `${Math.min((currentStep / (steps.length - 1)) * 100, 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Learning Paths */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <BookOpen className="w-6 h-6 text-green-500" />
            <h3 className="text-2xl font-bold text-foreground">Choose Your Path</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {learningPaths.map((path, index) => (
              <div
                key={index}
                className={`bg-gradient-to-br ${path.color} rounded-2xl p-6 border ${path.borderColor} hover:shadow-lg transition-shadow`}
              >
                <span className="text-4xl">{path.emoji}</span>
                <h4 className="text-xl font-bold text-foreground mt-4 mb-2">{path.title}</h4>
                <p className="text-sm text-muted-foreground mb-4">{path.description}</p>
                
                {path.articles ? (
                  <div className="space-y-2">
                    {path.articles.map((slug, i) => (
                      <Link
                        key={slug}
                        href={`/article/${slug}`}
                        className="flex items-center gap-2 text-sm text-foreground hover:text-accent transition-colors group"
                      >
                        <span className="w-5 h-5 rounded-full bg-background flex items-center justify-center text-xs font-medium">
                          {i + 1}
                        </span>
                        <span className="group-hover:underline">
                          {slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                        </span>
                        <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    href={path.link || '#'}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-background rounded-lg text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    Start Playing
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Fun fact ticker */}
        <div className="mt-16 p-6 bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-teal-500/10 rounded-2xl border border-green-200 dark:border-green-800">
          <div className="flex items-start gap-4">
            <span className="text-3xl">🤯</span>
            <div>
              <h4 className="font-bold text-foreground mb-1">Did You Know?</h4>
              <p className="text-muted-foreground">
                The first Bitcoin transaction was for two pizzas worth 10,000 BTC in 2010. 
                At today&apos;s prices, those would be the most expensive pizzas in history — worth hundreds of millions of dollars! 🍕
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% { transform: translateX(0) translateY(-50%); }
          50% { transform: translateX(3px) translateY(-50%); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 1s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
