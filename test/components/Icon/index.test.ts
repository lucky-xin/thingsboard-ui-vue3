import { describe, it, expect } from 'vitest';

describe('Icon/index', () => {
  it('should export Icon component', async () => {
    const { Icon } = await import('/@/components/Icon/index');
    expect(Icon).toBeDefined();
  });

  it('should export IconPicker component', async () => {
    const { IconPicker } = await import('/@/components/Icon/index');
    expect(IconPicker).toBeDefined();
  });
});