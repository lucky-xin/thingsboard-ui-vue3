import { describe, it, expect, vi } from 'vitest';
import { useGo, useRedo, useQuery } from '/@/hooks/web/usePage';
import { PageEnum } from '/@/enums/pageEnum';
import { REDIRECT_NAME } from '/@/router/constant';

// Mock vue and vue-router
vi.mock('vue', () => ({
  computed: vi.fn((fn) => {
    const result = fn();
    return { value: result };
  }),
  unref: vi.fn((val) => {
    // If it's a ref-like object, return its value
    if (val && typeof val === 'object' && 'value' in val) {
      return val.value;
    }
    return val;
  }),
  ref: vi.fn((val) => ({ value: val }))
}));

vi.mock('vue-router', () => ({
  useRouter: vi.fn(() => ({
    push: vi.fn(() => Promise.resolve()),
    replace: vi.fn(() => Promise.resolve()),
    currentRoute: {
      value: {
        query: {},
        params: {},
        name: 'test',
        fullPath: '/test'
      }
    }
  })),
  Router: vi.fn()
}));

// Mock dependencies
vi.mock('/@/enums/pageEnum', () => ({
  PageEnum: {
    BASE_HOME: '/home'
  }
}));

vi.mock('/@/router/constant', () => ({
  REDIRECT_NAME: 'Redirect'
}));

vi.mock('/@/utils/is', () => ({
  isString: vi.fn((val) => typeof val === 'string')
}));

describe('hooks/web/usePage', () => {
  it('should have useGo function', () => {
    const go = useGo();
    expect(go).toBeInstanceOf(Function);
  });

  it('should have useRedo function', () => {
    const redo = useRedo();
    expect(redo).toBeInstanceOf(Function);
  });

  it('should have useQuery function', () => {
    const query = useQuery();
    expect(query).toBeDefined();
  });

  it('should call push when go is called with string path', async () => {
    const mockPush = vi.fn(() => Promise.resolve());
    const mockRouter = {
      push: mockPush,
      replace: vi.fn(() => Promise.resolve())
    };

    const go = useGo(mockRouter);
    await go('/test-path');

    expect(mockPush).toHaveBeenCalledWith('/test-path');
  });

  it('should call replace when go is called with isReplace = true', async () => {
    const mockReplace = vi.fn(() => Promise.resolve());
    const mockRouter = {
      push: vi.fn(() => Promise.resolve()),
      replace: mockReplace
    };

    const go = useGo(mockRouter);
    await go('/test-path', true);

    expect(mockReplace).toHaveBeenCalledWith('/test-path');
  });

  it('should handle PageEnum', async () => {
    const mockPush = vi.fn(() => Promise.resolve());
    const mockRouter = {
      push: mockPush,
      replace: vi.fn(() => Promise.resolve())
    };

    const go = useGo(mockRouter);
    await go(PageEnum.BASE_HOME);

    expect(mockPush).toHaveBeenCalledWith(PageEnum.BASE_HOME);
  });

  it('should handle RouteLocationRaw object', async () => {
    const mockPush = vi.fn(() => Promise.resolve());
    const mockRouter = {
      push: mockPush,
      replace: vi.fn(() => Promise.resolve())
    };

    const go = useGo(mockRouter);
    const routeObj = { path: '/test', query: { id: '1' } };
    await go(routeObj);

    expect(mockPush).toHaveBeenCalledWith(routeObj);
  });

  it('should handle redo with name params', async () => {
    const mockPush = vi.fn(() => Promise.resolve());
    const mockRouter = {
      push: mockPush,
      currentRoute: {
        value: {
          query: { param1: 'value1' },
          params: { existing: 'param' },
          name: 'TestPage',
          fullPath: '/test/page'
        }
      }
    };

    const redo = useRedo(mockRouter);
    const result = await redo();

    expect(result).toBe(true);
    expect(mockPush).toHaveBeenCalled();
  });

  it('should handle redo with path params', async () => {
    const mockPush = vi.fn(() => Promise.resolve());
    const mockRouter = {
      push: mockPush,
      currentRoute: {
        value: {
          query: { param1: 'value1' },
          params: {},
          name: 'TestPage',
          fullPath: '/test/page'
        }
      }
    };

    const redo = useRedo(mockRouter);
    const result = await redo();

    expect(result).toBe(true);
    expect(mockPush).toHaveBeenCalled();
  });

  it('should handle redo with REDIRECT_NAME', async () => {
    const mockPush = vi.fn(() => Promise.resolve());
    const mockRouter = {
      push: mockPush,
      currentRoute: {
        value: {
          query: {},
          params: {},
          name: REDIRECT_NAME,
          fullPath: '/redirect'
        }
      }
    };

    const redo = useRedo(mockRouter);
    const result = await redo();

    expect(result).toBe(false);
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('should return query from useQuery', () => {
    const mockQuery = { id: '123', filter: 'active' };
    const mockRouter = {
      currentRoute: {
        value: {
          query: mockQuery
        }
      }
    };

    const query = useQuery(mockRouter);
    // Since we're mocking computed, the value should be what we return from the computed fn
    expect(query.value).toEqual(mockQuery);
  });
});