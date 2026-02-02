'use client'

import { useState, useEffect } from 'react'
import { Plus, AlertTriangle, CheckCircle, Trash2, Edit3, RefreshCw } from 'lucide-react'

interface Block {
  id: number
  timestamp: number
  data: string
  previousHash: string
  hash: string
  nonce: number
  isValid: boolean
}

// Simple hash function for demonstration
function calculateHash(id: number, timestamp: number, data: string, previousHash: string, nonce: number): string {
  const input = `${id}${timestamp}${data}${previousHash}${nonce}`
  let hash = 5381
  for (let i = 0; i < input.length; i++) {
    hash = ((hash << 5) + hash) + input.charCodeAt(i)
  }
  const part1 = Math.abs(hash).toString(16).padStart(8, '0')
  const part2 = Math.abs(hash * 31).toString(16).padStart(8, '0')
  return (part1 + part2).toUpperCase().slice(0, 16)
}

// Use a fixed timestamp to avoid hydration mismatch
const GENESIS_TIMESTAMP = 1700000000000

function createGenesisBlock(): Block {
  const hash = calculateHash(0, GENESIS_TIMESTAMP, 'Genesis Block', '0000000000000000', 0)
  return {
    id: 0,
    timestamp: GENESIS_TIMESTAMP,
    data: 'Genesis Block',
    previousHash: '0000000000000000',
    hash,
    nonce: 0,
    isValid: true,
  }
}

export function BlockchainSimulator() {
  const [blocks, setBlocks] = useState<Block[]>([createGenesisBlock()])
  const [newBlockData, setNewBlockData] = useState('')
  const [editingBlock, setEditingBlock] = useState<number | null>(null)
  const [editData, setEditData] = useState('')
  const [showTamperWarning, setShowTamperWarning] = useState(false)

  // Validate chain and update isValid status
  const validateChain = (chain: Block[]): Block[] => {
    return chain.map((block, index) => {
      if (index === 0) {
        // Genesis block is always valid
        const expectedHash = calculateHash(block.id, block.timestamp, block.data, block.previousHash, block.nonce)
        return { ...block, isValid: block.hash === expectedHash }
      }
      
      const previousBlock = chain[index - 1]
      const expectedHash = calculateHash(block.id, block.timestamp, block.data, block.previousHash, block.nonce)
      const hashMatches = block.hash === expectedHash
      const previousHashMatches = block.previousHash === previousBlock.hash
      
      return { ...block, isValid: hashMatches && previousHashMatches && previousBlock.isValid }
    })
  }

  const addBlock = () => {
    if (!newBlockData.trim()) return

    const lastBlock = blocks[blocks.length - 1]
    const timestamp = Date.now()
    const id = blocks.length
    const previousHash = lastBlock.hash
    const hash = calculateHash(id, timestamp, newBlockData, previousHash, 0)

    const newBlock: Block = {
      id,
      timestamp,
      data: newBlockData,
      previousHash,
      hash,
      nonce: 0,
      isValid: true,
    }

    setBlocks([...blocks, newBlock])
    setNewBlockData('')
  }

  const startEditing = (block: Block) => {
    if (block.id === 0) return // Can't edit genesis block
    setEditingBlock(block.id)
    setEditData(block.data)
  }

  const confirmEdit = (blockId: number) => {
    const updatedBlocks = blocks.map(block => {
      if (block.id === blockId) {
        // Change the data but keep the old hash (this breaks the chain!)
        return { ...block, data: editData }
      }
      return block
    })

    // Validate the chain after tampering
    const validatedBlocks = validateChain(updatedBlocks)
    setBlocks(validatedBlocks)
    setEditingBlock(null)
    setShowTamperWarning(true)
    
    setTimeout(() => setShowTamperWarning(false), 5000)
  }

  const recalculateChain = () => {
    // Recalculate all hashes from the modified block onwards
    const newBlocks = [...blocks]
    
    for (let i = 1; i < newBlocks.length; i++) {
      const block = newBlocks[i]
      const previousBlock = newBlocks[i - 1]
      
      // Recalculate this block's hash with the new data and correct previous hash
      const newHash = calculateHash(block.id, block.timestamp, block.data, previousBlock.hash, block.nonce)
      newBlocks[i] = {
        ...block,
        previousHash: previousBlock.hash,
        hash: newHash,
      }
    }

    const validatedBlocks = validateChain(newBlocks)
    setBlocks(validatedBlocks)
  }

  const resetChain = () => {
    setBlocks([createGenesisBlock()])
    setShowTamperWarning(false)
    setEditingBlock(null)
  }

  const hasInvalidBlocks = blocks.some(b => !b.isValid)

  return (
    <div className="space-y-6">
      {/* Add New Block */}
      <div className="bg-card rounded-xl border border-border p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Plus size={20} className="text-accent" />
          Add a New Block
        </h3>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={newBlockData}
            onChange={(e) => setNewBlockData(e.target.value)}
            placeholder="Enter transaction data (e.g., 'Alice sends 5 BTC to Bob')"
            className="flex-1 px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            onKeyDown={(e) => e.key === 'Enter' && addBlock()}
          />
          <button
            onClick={addBlock}
            disabled={!newBlockData.trim()}
            className="px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Block
          </button>
        </div>
      </div>

      {/* Tamper Warning */}
      {showTamperWarning && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
          <div>
            <p className="font-semibold text-red-700 dark:text-red-300">Chain Tampered!</p>
            <p className="text-sm text-red-600 dark:text-red-400">
              You modified a block, which broke the chain integrity. In a real blockchain, 
              this would be rejected by the network because other nodes have the original valid chain.
            </p>
          </div>
        </div>
      )}

      {/* Why Re-mining Works Explanation */}
      {hasInvalidBlocks && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">💡 Why does re-mining make it valid again?</h4>
          <div className="text-sm text-blue-600 dark:text-blue-400 space-y-2">
            <p>
              <strong>The problem:</strong> When you edited a block, its data changed but its hash stayed the same. 
              The hash no longer matches the actual content, so the block is invalid.
            </p>
            <p>
              <strong>What re-mining does:</strong> It recalculates the hash based on the <em>current</em> data. 
              Now the hash matches the content again, making the block valid.
            </p>
            <p>
              <strong>The chain reaction:</strong> Since each block contains the previous block&apos;s hash, 
              changing one block&apos;s hash means all following blocks must also be re-mined to update their &quot;previous hash&quot; reference.
            </p>
            <p className="pt-2 border-t border-blue-200 dark:border-blue-700">
              <strong>In the real world:</strong> Re-mining requires enormous computational power (solving complex puzzles). 
              An attacker would need to re-mine faster than the entire network to make fraudulent changes stick — 
              which is practically impossible. This is why blockchain is considered immutable!
            </p>
          </div>
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-wrap gap-3">
        {hasInvalidBlocks && (
          <button
            onClick={recalculateChain}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg font-medium hover:bg-yellow-600 transition-colors flex items-center gap-2"
          >
            <RefreshCw size={16} />
            Recalculate Hashes (Mine Again)
          </button>
        )}
        <button
          onClick={resetChain}
          className="px-4 py-2 bg-muted text-foreground rounded-lg font-medium hover:bg-muted/80 transition-colors flex items-center gap-2"
        >
          <Trash2 size={16} />
          Reset Chain
        </button>
      </div>

      {/* Blockchain Visualization */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Your Blockchain</h3>
        
        <div className="flex flex-col gap-4">
          {blocks.map((block, index) => (
            <div key={block.id} className="relative">
              {/* Connection Line */}
              {index > 0 && (
                <div className="absolute left-8 -top-4 w-0.5 h-4 bg-border" />
              )}
              
              {/* Block */}
              <div
                className={`rounded-xl border-2 p-6 transition-all ${
                  block.isValid
                    ? 'bg-card border-green-500/50'
                    : 'bg-red-50 dark:bg-red-900/20 border-red-500'
                }`}
              >
                {/* Block Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-white ${
                        block.id === 0
                          ? 'bg-purple-500'
                          : block.isValid
                          ? 'bg-green-500'
                          : 'bg-red-500'
                      }`}
                    >
                      #{block.id}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        {block.id === 0 ? 'Genesis Block' : `Block #${block.id}`}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(block.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {block.isValid ? (
                      <span className="flex items-center gap-1 text-green-600 text-sm">
                        <CheckCircle size={16} />
                        Valid
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-red-600 text-sm">
                        <AlertTriangle size={16} />
                        Invalid
                      </span>
                    )}
                    
                    {block.id !== 0 && (
                      <button
                        onClick={() => startEditing(block)}
                        className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                        title="Edit (Tamper)"
                      >
                        <Edit3 size={16} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Block Content */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Data */}
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase">Data</p>
                    {editingBlock === block.id ? (
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={editData}
                          onChange={(e) => setEditData(e.target.value)}
                          className="flex-1 px-3 py-2 bg-background border border-border rounded text-sm"
                          autoFocus
                        />
                        <button
                          onClick={() => confirmEdit(block.id)}
                          className="px-3 py-2 bg-red-500 text-white rounded text-sm"
                        >
                          Tamper!
                        </button>
                      </div>
                    ) : (
                      <p className="text-sm text-foreground bg-muted/50 px-3 py-2 rounded">
                        {block.data}
                      </p>
                    )}
                  </div>

                  {/* Previous Hash */}
                  <div className="space-y-1">
                    <p className="text-xs font-medium text-muted-foreground uppercase">Previous Hash</p>
                    <code className="text-xs font-mono text-muted-foreground bg-muted/50 px-3 py-2 rounded block truncate">
                      {block.previousHash}
                    </code>
                  </div>

                  {/* This Block's Hash */}
                  <div className="space-y-1 sm:col-span-2">
                    <p className="text-xs font-medium text-muted-foreground uppercase">This Block&apos;s Hash</p>
                    <code
                      className={`text-sm font-mono px-3 py-2 rounded block ${
                        block.isValid
                          ? 'text-green-600 bg-green-50 dark:bg-green-900/20'
                          : 'text-red-600 bg-red-50 dark:bg-red-900/20'
                      }`}
                    >
                      {block.hash}
                    </code>
                  </div>
                </div>

                {/* Invalid Explanation */}
                {!block.isValid && (
                  <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
                    <p className="text-sm text-red-700 dark:text-red-300">
                      ⚠️ This block is invalid! The stored hash doesn&apos;t match the calculated hash for this data, 
                      or the previous hash doesn&apos;t match the previous block.
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6">
        <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">🎯 Try This!</h4>
        <ol className="list-decimal list-inside space-y-2 text-sm text-blue-700 dark:text-blue-300">
          <li>Add a few blocks with different transaction data</li>
          <li>Click the <Edit3 size={14} className="inline" /> edit button on any block to tamper with it</li>
          <li>Watch how the chain becomes invalid (red borders)</li>
          <li>Click &quot;Recalculate Hashes&quot; to see how mining would fix it (but this changes all subsequent hashes!)</li>
        </ol>
      </div>
    </div>
  )
}
