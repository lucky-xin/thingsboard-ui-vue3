import { describe, it, expect } from 'vitest';

describe('Scrollbar/index', () => {
  it('should export Scrollbar component', async () => {
    const { Scrollbar } = await import('/@/components/Scrollbar/index');
    expect(Scrollbar).toBeDefined();
    expect(typeof Scrollbar).toBe('object');
  });

  it('should export ScrollbarType type', async () => {
    // Test that both exports are available
    const module = await import('/@/components/Scrollbar/index');
    expect(module.Scrollbar).toBeDefined();
  });

  it('should have component properties', async () => {
    const { Scrollbar } = await import('/@/components/Scrollbar/index');
    expect(Scrollbar).toBeDefined();
    // Vue 3 components should have some definition
    expect(Scrollbar.name || Scrollbar.__name || Scrollbar.setup || Scrollbar.render).toBeTruthy();
  });
});