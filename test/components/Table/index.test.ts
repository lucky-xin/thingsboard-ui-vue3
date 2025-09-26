import { describe, it, expect, vi } from 'vitest';

// 避免真实加载复杂内部依赖，最小 mock 以防超时
vi.mock('/@/components/Table/src/BasicTable.vue', () => ({
  default: { name: 'MockBasicTable', render() { return null; } },
}));
vi.mock('/@/components/Table/src/props', () => ({
  basicProps: {},
}));

describe('Table/index', () => {
  it('should export BasicTable component', async () => {
    const { BasicTable } = await import('/@/components/Table/index');
    expect(BasicTable).toBeDefined();
  });
});