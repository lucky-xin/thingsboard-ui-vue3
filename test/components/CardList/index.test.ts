import { describe, it, expect } from 'vitest';
import { CardList } from '/@/components/CardList';

describe('CardList/index', () => {
  it('should export CardList component', () => {
    expect(CardList).toBeDefined();
    expect(typeof CardList).toBe('object');
  });

  it('should have install method from withInstall', () => {
    expect(CardList.install).toBeDefined();
    expect(typeof CardList.install).toBe('function');
  });

  it('should have component name or __name', () => {
    expect(CardList.name || CardList.__name).toBeTruthy();
  });

  it('should be a Vue component', () => {
    // Vue 3 components have either setup, render, or template
    expect(CardList.setup || CardList.render || CardList.template).toBeTruthy();
  });

  it('should install component correctly', () => {
    const mockApp = {
      component: vi.fn(),
    };
    
    CardList.install(mockApp);
    expect(mockApp.component).toHaveBeenCalledWith(CardList.name || CardList.__name, CardList);
  });
});