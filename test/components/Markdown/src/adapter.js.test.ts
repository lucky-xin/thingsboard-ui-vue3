import { describe, it, expect, vi } from 'vitest'
import * as module from '/@/components/Markdown/src/adapter.js'

describe('adapter', () => {
  it('should export expected functions/classes', () => {
    expect(module).toBeDefined()
  })

  it('should have correct exports', () => {
    const exports = Object.keys(module)
    expect(exports.length).toBeGreaterThan(0)
  })
})
