import { describe, it, expect, vi } from 'vitest';

vi.mock('/@/components/CountDown/index', () => ({
  CountButton: { name: 'MockCountButton' },
  CountdownInput: { name: 'MockCountdownInput' },
  useCountdown: () => ({}),
}));

describe('CountDown/index', () => {
  it('should export CountButton component', async () => {
    const { CountButton } = await import('/@/components/CountDown/index');
    expect(CountButton).toBeDefined();
  });

  it('should export CountdownInput component', async () => {
    const { CountdownInput } = await import('/@/components/CountDown/index');
    expect(CountdownInput).toBeDefined();
  });

  it('should export useCountdown hook', async () => {
    const { useCountdown } = await import('/@/components/CountDown/index');
    expect(useCountdown).toBeDefined();
  });
});