/**
 * NIM: 10125905
 * Nama: HANIF DWY PUTRA S
 *
 * NIM: 10125903
 * Nama: ADITYA SYAHESTIANO
 */

'use client'

import { useState, useEffect } from 'react'
import { Hash, ArrowRight } from 'lucide-react'

// Simple hash function for demonstration (not cryptographically secure)
function simpleHash(str: string): string {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  // Convert to hex and pad
  const hex = Math.abs(hash).toString(16).padStart(8, '0')
  return hex.toUpperCase()
}

// SHA-256 like hash visualization (simplified)
function generateHash(input: string): string {
  if (!input) return '0000000000000000'
  
  let hash = 5381
  for (let i = 0; i < input.length; i++) {
    hash = ((hash << 5) + hash) + input.charCodeAt(i)
  }
  
  // Generate a longer hash-like string
  const part1 = Math.abs(hash).toString(16).padStart(8, '0')
  const part2 = Math.abs(hash * 31).toString(16).padStart(8, '0')
  
  return (part1 + part2).toUpperCase().slice(0, 16)
}

export function HashDemo() {
  const [input, setInput] = useState('Hello, Blockchain!')
  const [hash, setHash] = useState('')

  useEffect(() => {
    setHash(generateHash(input))
  }, [input])

  const examples = [
    { input: 'Hello, Blockchain!', description: 'Original text' },
    { input: 'Hello, Blockchain.', description: 'Changed ! to .' },
    { input: 'hello, blockchain!', description: 'Lowercase' },
  ]

  return (
    <div className="space-y-6">
      {/* Interactive Hash Generator */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Hash size={20} className="text-accent" />
          Try It Yourself
        </h3>
        
        <div className="grid md:grid-cols-2 gap-6 items-center">
          {/* Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-muted-foreground">Your Input</label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full h-32 px-4 py-3 bg-background border border-border rounded-lg text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-accent"
              placeholder="Type anything here..."
            />
          </div>

          {/* Arrow */}
          <div className="hidden md:flex justify-center">
            <ArrowRight size={32} className="text-accent" />
          </div>

          {/* Output */}
          <div className="space-y-2 md:col-start-2 md:row-start-1">
            <label className="text-sm font-medium text-muted-foreground">Hash Output</label>
            <div className="h-32 px-4 py-3 bg-accent/10 border border-accent/30 rounded-lg flex items-center justify-center">
              <code className="text-xl md:text-2xl font-mono text-accent break-all text-center">
                {hash || '0000000000000000'}
              </code>
            </div>
          </div>
        </div>

        <p className="mt-4 text-sm text-muted-foreground">
          💡 Try changing even a single character and watch how the entire hash changes!
        </p>
      </div>

      {/* Example Comparison */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          🔍 See How Small Changes Create Big Differences
        </h3>
        
        <div className="space-y-4">
          {examples.map((example, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-4 bg-muted/50 rounded-lg"
            >
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-1">{example.description}</p>
                <code className="text-sm text-foreground">&quot;{example.input}&quot;</code>
              </div>
              <ArrowRight size={16} className="text-muted-foreground hidden sm:block" />
              <div className="sm:w-48">
                <code className="text-sm font-mono text-accent">{generateHash(example.input)}</code>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            <strong>Key Insight:</strong> Even though the inputs are very similar, the hashes are completely different! 
            This property makes it impossible to &quot;guess&quot; the original data from its hash.
          </p>
        </div>
      </div>
    </div>
  )
}
