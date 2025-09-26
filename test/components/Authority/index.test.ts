import { describe, it, expect } from 'vitest';
import { Authority } from '/@/components/Authority';

describe('Authority/index', () => {
  it('should export Authority component', () => {
    expect(Authority).toBeDefined();
    expect(typeof Authority).toBe('object');
  });

  it('should have install method from withInstall', () => {
    expect(Authority.install).toBeDefined();
    expect(typeof Authority.install).toBe('function');
  });

  it('should have component name', () => {
    expect(Authority.name || Authority.__name).toBeTruthy();
  });

  it('should be a Vue component', () => {
    // Vue 3 components have either setup or render function
    expect(Authority.setup || Authority.render || Authority.template).toBeTruthy();  
  });

  it('should install component correctly', () => {
    const mockApp = {
      component: vi.fn(),
    };
    
    Authority.install(mockApp);
    expect(mockApp.component).toHaveBeenCalledWith(Authority.name || Authority.__name, Authority);
  });
});