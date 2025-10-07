import { describe, it, expect, vi } from 'vitest';

// Mock the components
vi.mock('./src/SimpleMenu.vue', () => ({
  default: {
    __name: 'SimpleMenu',
    setup() {
      return {};
    },
  },
}));

vi.mock('./src/SimpleMenuTag.vue', () => ({
  default: {
    __name: 'SimpleMenuTag',
    setup() {
      return {};
    },
  },
}));

describe('SimpleMenu/index', () => {
  it('should export SimpleMenu component', async () => {
    const module = await import('/@/components/SimpleMenu/index');

    expect(module).toBeDefined();
    expect(module.SimpleMenu).toBeDefined();
  });

  it('should export SimpleMenuTag component', async () => {
    const module = await import('/@/components/SimpleMenu/index');

    expect(module).toBeDefined();
    expect(module.SimpleMenuTag).toBeDefined();
  });

  it('should have correct component structure for SimpleMenu', async () => {
    const module = await import('/@/components/SimpleMenu/index');
    const { SimpleMenu } = module;

    expect(SimpleMenu).toBeDefined();
    expect(typeof SimpleMenu).toBe('object');
  });

  it('should have correct component structure for SimpleMenuTag', async () => {
    const module = await import('/@/components/SimpleMenu/index');
    const { SimpleMenuTag } = module;

    expect(SimpleMenuTag).toBeDefined();
    expect(typeof SimpleMenuTag).toBe('object');
  });

  it('should export both components', async () => {
    const module = await import('/@/components/SimpleMenu/index');

    expect(Object.keys(module)).toHaveLength(2);
    expect(module.SimpleMenu).toBeDefined();
    expect(module.SimpleMenuTag).toBeDefined();
  });

  it('should be able to import components individually', async () => {
    const { SimpleMenu, SimpleMenuTag } = await import('/@/components/SimpleMenu/index');

    expect(SimpleMenu).toBeDefined();
    expect(SimpleMenuTag).toBeDefined();
  });
});
