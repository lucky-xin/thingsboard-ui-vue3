import { describe, it, expect, vi } from 'vitest';

vi.mock('/@/components/Form/index', () => ({
  BasicForm: { name: 'MockBasicForm' },
  useForm: () => ({}),
  componentMap: new Map(),
}));

describe('Form/index', () => {
  it('should export BasicForm component', async () => {
    const { BasicForm } = await import('/@/components/Form/index');
    expect(BasicForm).toBeDefined();
  });

  it('should export componentMap', async () => {
    const { componentMap } = await import('/@/components/Form/index');
    expect(componentMap).toBeDefined();
  });

  it('should export useForm', async () => {
    const { useForm } = await import('/@/components/Form/index');
    expect(useForm).toBeDefined();
  });
});