import { describe, it, expect } from 'vitest';

describe('WangEditor/index', () => {
  it('should export WangEditor component', async () => {
    const { WangEditor } = await import('/@/components/WangEditor/index');
    expect(WangEditor).toBeDefined();
  });
});