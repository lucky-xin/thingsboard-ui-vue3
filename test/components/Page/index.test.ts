import { describe, it, expect, vi } from 'vitest';

vi.mock('/@/components/Page/index', () => ({
  PageWrapper: { name: 'MockPageWrapper' },
  PageFooter: { name: 'MockPageFooter' },
}));

describe('Page/index', () => {
  it('should export PageWrapper component', async () => {
    const { PageWrapper } = await import('/@/components/Page/index');
    expect(PageWrapper).toBeDefined();
  });

  it('should export PageFooter component', async () => {
    const { PageFooter } = await import('/@/components/Page/index');
    expect(PageFooter).toBeDefined();
  });
});