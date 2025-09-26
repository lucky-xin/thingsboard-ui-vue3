import { describe, it, expect } from 'vitest';

describe('Drawer/index', () => {
  it('should export BasicDrawer component', async () => {
    const { BasicDrawer } = await import('/@/components/Drawer/index');
    expect(BasicDrawer).toBeDefined();
  });

  it('should export useDrawer function', async () => {
    const { useDrawer } = await import('/@/components/Drawer/index');
    expect(useDrawer).toBeDefined();
  });

  it('should export useDrawerInner function', async () => {
    const { useDrawerInner } = await import('/@/components/Drawer/index');
    expect(useDrawerInner).toBeDefined();
  });
});