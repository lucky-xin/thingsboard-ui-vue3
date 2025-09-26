import { describe, it, expect } from 'vitest';

describe('components index coverage', () => {
  it('CardList/index should load', async () => {
    const mod = await import('/@/components/CardList');
    expect(mod).toBeDefined();
    expect(mod.CardList).toBeDefined();
  });

  it('VirtualScroll/index should load', async () => {
    const mod = await import('/@/components/VirtualScroll');
    expect(mod).toBeDefined();
  });

  it('Drawer/index should load', async () => {
    const mod = await import('/@/components/Drawer');
    expect(mod).toBeDefined();
    expect(mod.BasicDrawer).toBeDefined();
  });

  it('Popover/index should load', async () => {
    const mod = await import('/@/components/Popover');
    expect(mod).toBeDefined();
    expect(mod.Popover).toBeDefined();
  });

  it('Markdown/index should load', async () => {
    const mod = await import('/@/components/Markdown');
    expect(mod).toBeDefined();
    expect(mod.Markdown).toBeDefined();
    expect(mod.MarkdownViewer).toBeDefined();
  });
});


