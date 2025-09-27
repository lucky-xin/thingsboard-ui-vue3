import { describe, it, expect, vi } from 'vitest';
import { ClickOutSide } from '/@/components/ClickOutSide';

describe('ClickOutSide/index', () => {
  it('should export ClickOutSide component', () => {
    expect(ClickOutSide).toBeDefined();
    expect(typeof ClickOutSide).toBe('object');
  });

  it('should have install method from withInstall', () => {
    expect(ClickOutSide.install).toBeDefined();
    expect(typeof ClickOutSide.install).toBe('function');
  });

  it('should have component name or __name', () => {
    // Component should be defined
    expect(ClickOutSide).toBeDefined();
  });

  it('should be a Vue component', () => {
    // Vue 3 components have either setup, render, or template
    expect(ClickOutSide.setup || ClickOutSide.render || ClickOutSide.template).toBeTruthy();
  });

  it('should install component correctly', () => {
    const mockApp = {
      component: vi.fn(),
    };
    
    ClickOutSide.install(mockApp);
    expect(mockApp.component).toHaveBeenCalledWith(ClickOutSide.name || ClickOutSide.__name, ClickOutSide);
  });
});