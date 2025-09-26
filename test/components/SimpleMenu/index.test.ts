import { describe, it, expect, vi } from 'vitest';

// 避免真实加载复杂子组件导致超时，最小化替身
vi.mock('/@/components/SimpleMenu/src/SimpleMenu.vue', () => ({
  default: { name: 'MockSimpleMenu', render() { return null; } },
}));
vi.mock('/@/components/SimpleMenu/src/SimpleMenuTag.vue', () => ({
  default: { name: 'MockSimpleMenuTag', render() { return null; } },
}));

describe('SimpleMenu/index', () => {
  it('should export SimpleMenu component', async () => {
    const { SimpleMenu } = await import('/@/components/SimpleMenu/index');
    expect(SimpleMenu).toBeDefined();
  });

  it('should export SimpleMenuTag component', async () => {
    const { SimpleMenuTag } = await import('/@/components/SimpleMenu/index');
    expect(SimpleMenuTag).toBeDefined();
  });
});