import { describe, it, expect } from 'vitest';
import * as routerIndex from '/@/router/index';

describe('router/index', () => {
  it('should export router configuration', () => {
    expect(routerIndex).toBeDefined();
    expect(routerIndex.router).toBeDefined();
  }, 10000);

  it('should export setupRouter function', () => {
    expect(routerIndex.setupRouter).toBeDefined();
    expect(typeof routerIndex.setupRouter).toBe('function');
  }, 10000);

  it('should be a valid router module', () => {
    expect(routerIndex).toBeDefined();
    expect(typeof routerIndex).toBe('object');
  }, 10000);
});
