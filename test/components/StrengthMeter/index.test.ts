import { describe, it, expect, vi } from 'vitest';

// Mock the StrengthMeter component
vi.mock('./src/StrengthMeter.vue', () => ({
  default: {
    __name: 'StrengthMeter',
    setup() {
      return {};
    },
  },
}));

describe('StrengthMeter/index', () => {
  it('should export StrengthMeter component', async () => {
    const module = await import('/@/components/StrengthMeter/index');

    expect(module).toBeDefined();
    expect(module.StrengthMeter).toBeDefined();
  });

  it('should have correct component structure', async () => {
    const module = await import('/@/components/StrengthMeter/index');
    const { StrengthMeter } = module;

    expect(StrengthMeter).toBeDefined();
    expect(typeof StrengthMeter).toBe('object');
  });
});
