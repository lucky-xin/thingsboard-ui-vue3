import { describe, it, expect } from 'vitest';
import { useScript } from '/@/hooks/web/useScript';

describe('useScript', () => {
  it('should create script with correct initial state', () => {
    const opts = { src: 'https://example.com/test.js' };
    const { isLoading, error, success, toPromise } = useScript(opts);

    expect(isLoading.value).toBe(false);
    expect(error.value).toBe(false);
    expect(success.value).toBe(false);
    expect(toPromise).toBeInstanceOf(Function);
  });

  it('should create promise that can be called', () => {
    const opts = { src: 'https://example.com/test.js' };
    const { toPromise } = useScript(opts);

    // Check that toPromise returns a promise
    expect(toPromise()).toBeInstanceOf(Promise);
  });
});
