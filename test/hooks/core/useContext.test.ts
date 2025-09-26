import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createContext, useContext, CreateContextOptions } from '/@/hooks/core/useContext';
import { InjectionKey, reactive, readonly, provide, inject } from 'vue';

// Mock Vue dependencies
vi.mock('vue', () => ({
  reactive: vi.fn((obj) => obj),
  readonly: vi.fn((obj) => ({ ...obj, __readonly: true })),
  provide: vi.fn(),
  inject: vi.fn(),
  Symbol: () => Symbol(),
}));

describe('hooks/core/useContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createContext', () => {
    it('should create context with default options', () => {
      const context = { value: 'test' };
      const key: InjectionKey<any> = Symbol('test');
      
      const result = createContext(context, key);

      expect(reactive).toHaveBeenCalledWith(context);
      expect(readonly).toHaveBeenCalled();
      expect(provide).toHaveBeenCalledWith(key, expect.objectContaining({ __readonly: true }));
      expect(result).toHaveProperty('state');
    });

    it('should create context with readonly=false', () => {
      const context = { value: 'test' };
      const key: InjectionKey<any> = Symbol('test');
      const options: CreateContextOptions = { readonly: false };
      
      createContext(context, key, options);

      expect(reactive).toHaveBeenCalledWith(context);
      expect(readonly).not.toHaveBeenCalled();
      expect(provide).toHaveBeenCalledWith(key, context);
    });

    it('should create context with native=true', () => {
      const context = { value: 'test' };
      const key: InjectionKey<any> = Symbol('test');
      const options: CreateContextOptions = { native: true };
      
      createContext(context, key, options);

      expect(provide).toHaveBeenCalledWith(key, context);
    });

    it('should not provide when createProvider=true', () => {
      const context = { value: 'test' };
      const key: InjectionKey<any> = Symbol('test');
      const options: CreateContextOptions = { createProvider: true };
      
      createContext(context, key, options);

      expect(provide).not.toHaveBeenCalled();
    });

    it('should use default key when not provided', () => {
      const context = { value: 'test' };
      
      const result = createContext(context);

      expect(reactive).toHaveBeenCalledWith(context);
      expect(result).toHaveProperty('state');
    });

    it('should handle empty options', () => {
      const context = { value: 'test' };
      const key: InjectionKey<any> = Symbol('test');
      
      createContext(context, key, {});

      expect(reactive).toHaveBeenCalledWith(context);
      expect(readonly).toHaveBeenCalled();
      expect(provide).toHaveBeenCalled();
    });

    it('should combine multiple options correctly', () => {
      const context = { value: 'test' };
      const key: InjectionKey<any> = Symbol('test');
      const options: CreateContextOptions = { 
        readonly: false, 
        createProvider: false, 
        native: true 
      };
      
      createContext(context, key, options);

      expect(readonly).not.toHaveBeenCalled();
      expect(provide).toHaveBeenCalledWith(key, context);
    });

    it('should return state object', () => {
      const context = { value: 'test', count: 1 };
      const key: InjectionKey<any> = Symbol('test');
      
      const result = createContext(context, key);

      expect(result.state).toBe(context);
    });

    it('should handle complex context objects', () => {
      const context = {
        user: { name: 'John', age: 30 },
        settings: { theme: 'dark', language: 'en' },
        actions: {
          updateUser: (data: any) => data,
          resetSettings: () => null
        }
      };
      const key: InjectionKey<any> = Symbol('complex');
      
      const result = createContext(context, key);

      expect(reactive).toHaveBeenCalledWith(context);
      expect(result.state).toBe(context);
    });
  });

  describe('useContext', () => {
    it('should inject with key and return result', () => {
      const key: InjectionKey<any> = Symbol('test');
      const expectedValue = { value: 'injected' };
      (inject as any).mockReturnValue(expectedValue);

      const result = useContext(key);

      expect(inject).toHaveBeenCalledWith(key, {});
      expect(result).toBe(expectedValue);
    });

    it('should inject with key and default value', () => {
      const key: InjectionKey<any> = Symbol('test');
      const defaultValue = { default: true };
      const expectedValue = { value: 'injected' };
      (inject as any).mockReturnValue(expectedValue);

      const result = useContext(key, defaultValue);

      expect(inject).toHaveBeenCalledWith(key, defaultValue);
      expect(result).toBe(expectedValue);
    });

    it('should use empty object as default when no defaultValue provided', () => {
      const key: InjectionKey<any> = Symbol('test');
      (inject as any).mockReturnValue(undefined);

      useContext(key);

      expect(inject).toHaveBeenCalledWith(key, {});
    });

    it('should use empty object as default when defaultValue is falsy', () => {
      const key: InjectionKey<any> = Symbol('test');
      (inject as any).mockReturnValue(undefined);

      useContext(key, null);

      expect(inject).toHaveBeenCalledWith(key, {});
    });

    it('should handle undefined key with default Symbol', () => {
      const defaultKey = Symbol('default');
      (inject as any).mockReturnValue({ value: 'default' });

      const result = useContext(defaultKey as any);

      expect(inject).toHaveBeenCalledWith(defaultKey, {});
      expect(result).toEqual({ value: 'default' });
    });

    it('should work with complex injected values', () => {
      const key: InjectionKey<any> = Symbol('complex');
      const complexValue = {
        data: { items: [1, 2, 3] },
        methods: { add: vi.fn(), remove: vi.fn() },
        computed: { total: 42 }
      };
      (inject as any).mockReturnValue(complexValue);

      const result = useContext(key);

      expect(result).toBe(complexValue);
    });

    it('should return default value when injection fails', () => {
      const key: InjectionKey<any> = Symbol('test');
      const defaultValue = { fallback: true };
      (inject as any).mockImplementation((k, def) => def);

      const result = useContext(key, defaultValue);

      expect(result).toBe(defaultValue);
    });

    it('should handle type-safe context usage', () => {
      interface TestContext {
        name: string;
        count: number;
      }
      
      const key: InjectionKey<TestContext> = Symbol('typed');
      const contextValue: TestContext = { name: 'test', count: 5 };
      (inject as any).mockReturnValue(contextValue);

      const result = useContext<TestContext>(key);

      expect(result).toBe(contextValue);
      expect(result.name).toBe('test');
      expect(result.count).toBe(5);
    });

    it('should handle boolean defaultValue parameter', () => {
      const key: InjectionKey<any> = Symbol('native');
      const expectedValue = { native: true };
      (inject as any).mockReturnValue(expectedValue);

      const result = useContext(key, true); // boolean defaultValue

      expect(inject).toHaveBeenCalledWith(key, true);
      expect(result).toBe(expectedValue);
    });

    it('should handle defaultValue and native parameters (second overload)', () => {
      const key: InjectionKey<any> = Symbol('native');
      const defaultValue = { default: 'value' };
      const expectedValue = { native: true };
      (inject as any).mockReturnValue(expectedValue);

      const result = useContext(key, defaultValue, true); // defaultValue and native

      expect(inject).toHaveBeenCalledWith(key, defaultValue);
      expect(result).toBe(expectedValue);
    });
  });

  describe('integration tests', () => {
    it('should work together - create and use context', () => {
      const contextValue = { message: 'Hello Context!' };
      const key: InjectionKey<any> = Symbol('integration');
      
      // Create context
      createContext(contextValue, key);
      
      // Mock inject to return what provide was called with
      const providedValue = (provide as any).mock.calls[0][1];
      (inject as any).mockReturnValue(providedValue);
      
      // Use context
      const result = useContext(key);
      
      expect(result).toBeDefined();
    });

    it('should maintain reactivity through readonly wrapper', () => {
      const contextValue = { count: 0 };
      const key: InjectionKey<any> = Symbol('reactive');
      const options: CreateContextOptions = { readonly: true };
      
      createContext(contextValue, key, options);
      
      expect(reactive).toHaveBeenCalledWith(contextValue);
      expect(readonly).toHaveBeenCalled();
    });

    it('should provide mutable state when readonly=false', () => {
      const contextValue = { count: 0 };
      const key: InjectionKey<any> = Symbol('mutable');
      const options: CreateContextOptions = { readonly: false };
      
      createContext(contextValue, key, options);
      
      expect(provide).toHaveBeenCalledWith(key, contextValue);
      expect(readonly).not.toHaveBeenCalled();
    });
  });
});