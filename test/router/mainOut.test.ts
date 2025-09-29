import { describe, it, expect } from 'vitest';
import * as mod from 'router/routes/mainOut';

describe('router/routes/mainOut', () => {
  it('should export mainOutRoutes and names', () => {
    expect(Array.isArray(mod.mainOutRoutes)).toBe(true);
    expect(Array.isArray(mod.mainOutRouteNames)).toBe(true);
  });
});
