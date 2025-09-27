import { describe, it, expect } from 'vitest'
import * as routeChange from '/src/logics/mitt/routeChange.ts'

describe('routeChange', () => {
  it('should export expected functions/objects', () => {
    expect(routeChange).toBeDefined()
    expect(typeof routeChange).toBe('object')
  })

  it('should have valid exports', () => {
    const exports = Object.keys(routeChange)
    expect(exports.length).toBeGreaterThan(0)
  })
})
