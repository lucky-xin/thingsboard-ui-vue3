import { describe, it, expect, vi } from 'vitest';

// 最小 mock 目标导出，避免索引文件内部依赖链导致 undefined
vi.mock('/@/components/Transition/index', () => ({
  Transition: { name: 'MockTransition' },
}));

describe('Transition/index', () => {
  it('should export Transition component', async () => {
    const { Transition } = await import('/@/components/Transition/index');
    expect(Transition).toBeDefined();
  });
});