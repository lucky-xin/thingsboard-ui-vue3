import { describe, it, expect, vi, beforeEach } from 'vitest';
import { scriptErrorHandler, setupErrorHandle } from '/@/logics/error-handle/index';
import { createApp } from 'vue';

// Mock dependencies
const mockAddErrorLogInfo = vi.fn();

vi.mock('/@/store/modules/errorLog', () => ({
  useErrorLogStoreWithOut: () => ({
    addErrorLogInfo: mockAddErrorLogInfo,
  }),
}));

vi.mock('/@/settings/projectSetting', () => ({
  default: {
    useErrorHandle: true,
  },
  t: vi.fn((key) => key),
}));

// Mock global window properties
Object.defineProperty(window, 'location', {
  value: {
    href: 'http://localhost:3000/test',
  },
  writable: true,
});

Object.defineProperty(window, 'event', {
  value: {
    errorCharacter: 10,
  },
  writable: true,
});

describe('logics/error-handle/index', () => {
  beforeEach(async () => {
    vi.clearAllMocks();
    // Reset window event listeners
    window.removeEventListener = vi.fn();
    window.addEventListener = vi.fn();
    window.onerror = null;
  });

  describe('scriptErrorHandler', () => {
    it('should return false for Script error with no source', () => {
      const result = scriptErrorHandler('Script error.');
      expect(result).toBe(false);
    });

    it('should handle basic script error', () => {
      const result = scriptErrorHandler(
        'TypeError: Cannot read property',
        'http://localhost:3000/app.js',
        10,
        5,
      );
      
      expect(result).toBe(true);
      expect(mockAddErrorLogInfo).toHaveBeenCalledWith({
        type: 'script',
        name: 'app.js',
        file: 'http://localhost:3000/app.js',
        detail: 'lineno10',
        url: 'http://localhost:3000/test',
        message: 'TypeError: Cannot read property',
        stack: '',
      });
    });

    it('should handle script error with Error object containing stack', () => {
      const error = new Error('Test error');
      error.stack = 'Error: Test error\n    at test.js:10:5';
      
      const result = scriptErrorHandler(
        'Test error',
        'test.js',
        10,
        5,
        error,
      );
      
      expect(result).toBe(true);
      expect(mockAddErrorLogInfo).toHaveBeenCalledWith({
        type: 'script',
        name: 'test.js',
        file: 'test.js',
        detail: 'lineno10',
        url: 'http://localhost:3000/test',
        message: 'Test error',
        stack: 'Error: Test error\n    at test.js:10:5',
      });
    });

    it('should handle script error without source (defaults to script)', () => {
      const result = scriptErrorHandler('Some error');
      
      expect(result).toBe(true);
      expect(mockAddErrorLogInfo).toHaveBeenCalledWith({
        type: 'script',
        name: 'script',
        file: undefined,
        detail: 'linenoundefined',
        url: 'http://localhost:3000/test',
        message: 'Some error',
        stack: '',
      });
    });

    it('should use window.event.errorCharacter when colno is not provided', () => {
      const result = scriptErrorHandler(
        'Test error',
        'test.js',
        10,
      );
      
      expect(result).toBe(true);
      expect(mockAddErrorLogInfo).toHaveBeenCalled();
    });

    it('should extract filename from full path source', () => {
      const result = scriptErrorHandler(
        'Error message',
        'http://localhost:3000/assets/js/main.bundle.js',
        15,
        20,
      );
      
      expect(result).toBe(true);
      expect(mockAddErrorLogInfo).toHaveBeenCalledWith(expect.objectContaining({
        name: 'main.bundle.js',
      }));
    });
  });

  describe('setupErrorHandle', () => {
    it('should set up error handlers when useErrorHandle is true', async () => {
      const app = createApp({});
      const mockConfig = { errorHandler: null };
      app.config = mockConfig as any;
      
      setupErrorHandle(app);
      
      // Check that Vue error handler is set
      expect(app.config.errorHandler).toBeDefined();
      expect(typeof app.config.errorHandler).toBe('function');
      
      // Check that window.onerror is set
      expect(window.onerror).toBe(scriptErrorHandler);
      
      // Check that event listeners are registered
      expect(window.addEventListener).toHaveBeenCalledWith(
        'unhandledrejection',
        expect.any(Function),
        true,
      );
      expect(window.addEventListener).toHaveBeenCalledWith(
        'error',
        expect.any(Function),
        true,
      );
    });

    it('should handle Vue errors through error handler', () => {
      const app = createApp({});
      setupErrorHandle(app);
      
      const error = new Error('Vue component error');
      error.stack = 'Error: Vue component error\n    at Component.vue:10:5';
      
      const vm = {
        $root: null,
        $options: {
          name: 'TestComponent',
          __file: '/components/Test.vue',
        },
      };
      vm.$root = vm;
      
      // Call the Vue error handler
      app.config.errorHandler!(error, vm as any, 'render function');
      
      expect(mockAddErrorLogInfo).toHaveBeenCalledWith({
        type: 'vue',
        name: 'root',
        file: 'root',
        message: 'Vue component error',
        stack: expect.stringContaining('Vue component error'),
        detail: 'render function',
        url: 'http://localhost:3000/test',
      });
    });

    it('should handle Vue errors for non-root components', () => {
      const app = createApp({});
      setupErrorHandle(app);
      
      const error = new Error('Component error');
      const vm = {
        $root: { $root: null },
        $options: {
          name: 'TestComponent',
          __file: '/components/Test.vue',
        },
      };
      
      app.config.errorHandler!(error, vm as any, 'lifecycle');
      
      expect(mockAddErrorLogInfo).toHaveBeenCalledWith({
        type: 'vue',
        name: 'TestComponent',
        file: '/components/Test.vue',
        message: 'Component error',
        stack: expect.any(String),
        detail: 'lifecycle',
        url: 'http://localhost:3000/test',
      });
    });

    it('should handle Vue errors for anonymous components', () => {
      const app = createApp({});
      setupErrorHandle(app);
      
      const error = new Error('Anonymous error');
      const vm = {
        $root: { $root: null },
        $options: null,
      };
      
      app.config.errorHandler!(error, vm as any, 'unknown');
      
      expect(mockAddErrorLogInfo).toHaveBeenCalledWith({
        type: 'vue',
        name: 'anonymous',
        file: 'anonymous',
        message: 'Anonymous error',
        stack: expect.any(String),
        detail: 'unknown',
        url: 'http://localhost:3000/test',
      });
    });

    it('should handle Vue errors with component tag fallback', () => {
      const app = createApp({});
      setupErrorHandle(app);
      
      const error = new Error('Component tag error');
      const vm = {
        $root: { $root: null },
        $options: {
          _componentTag: 'my-component',
          __file: '/components/MyComponent.vue',
        },
      };
      
      app.config.errorHandler!(error, vm as any, 'render');
      
      expect(mockAddErrorLogInfo).toHaveBeenCalledWith({
        type: 'vue',
        name: 'my-component',
        file: '/components/MyComponent.vue',
        message: 'Component tag error',
        stack: expect.any(String),
        detail: 'render',
        url: 'http://localhost:3000/test',
      });
    });

    it('should handle Promise errors through unhandledrejection', () => {
      const app = createApp({});
      setupErrorHandle(app);
      
      // Get the registered unhandledrejection handler
      const calls = (window.addEventListener as any).mock.calls;
      const unhandledRejectionCall = calls.find(
        (call: any) => call[0] === 'unhandledrejection'
      );
      expect(unhandledRejectionCall).toBeDefined();
      
      const handler = unhandledRejectionCall[1];
      const event = {
        reason: 'Promise rejection reason',
      };
      
      handler(event);
      
      expect(mockAddErrorLogInfo).toHaveBeenCalledWith({
        type: 'promise',
        name: 'Promise Error!',
        file: 'none',
        detail: 'promise error!',
        url: 'http://localhost:3000/test',
        stack: 'promise error!',
        message: 'Promise rejection reason',
      });
    });

    it('should handle resource errors through error event', () => {
      const app = createApp({});
      setupErrorHandle(app);
      
      // Get the registered error handler
      const calls = (window.addEventListener as any).mock.calls;
      const errorCall = calls.find(
        (call: any) => call[0] === 'error'
      );
      expect(errorCall).toBeDefined();
      
      const handler = errorCall[1];
      const mockTarget = {
        localName: 'img',
        outerHTML: '<img src="test.jpg">',
        currentSrc: 'test.jpg',
      };
      const event = {
        target: mockTarget,
        type: 'error',
      };
      
      handler(event);
      
      expect(mockAddErrorLogInfo).toHaveBeenCalledWith({
        type: 'resource',
        name: 'Resource Error!',
        file: 'test.jpg',
        detail: JSON.stringify({
          tagName: 'img',
          html: '<img src="test.jpg">',
          type: 'error',
        }),
        url: 'http://localhost:3000/test',
        stack: 'resource is not found',
        message: 'img is load error',
      });
    });

    it('should handle resource errors with srcElement fallback', () => {
      const app = createApp({});
      setupErrorHandle(app);
      
      const calls = (window.addEventListener as any).mock.calls;
      const errorCall = calls.find(
        (call: any) => call[0] === 'error'
      );
      const handler = errorCall[1];
      
      const mockSrcElement = {
        localName: 'script',
        outerHTML: '<script src="app.js"></script>',
      };
      const event = {
        target: null,
        srcElement: mockSrcElement,
        type: 'error',
      };
      
      handler(event);
      
      expect(mockAddErrorLogInfo).toHaveBeenCalledWith(expect.objectContaining({
        type: 'resource',
        name: 'Resource Error!',
        message: 'undefined is load error',
      }));
    });
  });
});
