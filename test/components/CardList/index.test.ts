import { describe, it, expect } from 'vitest';

describe('CardList/index', () => {
  it('should export CardList component', async () => {
    const { CardList } = await import('/@/components/CardList/index');
    expect(CardList).toBeDefined();
  });
});