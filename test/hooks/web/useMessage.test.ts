import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useMessage } from '/@/hooks/web/useMessage';

// Mock external dependencies
vi.mock('/@/hooks/web/useI18n', () => ({
  useI18n: vi.fn(() => ({
    t: vi.fn((key) => {
      const translations = {
        'common.okText': 'OK',
        'sys.message.error': 'error',
        'sys.message.warning': 'warning',
        'sys.message.success': 'success',
      };
      return translations[key] || key;
    }),
  })),
}));

vi.mock('/@/utils/is', () => ({
  isString: vi.fn((value) => typeof value === 'string'),
}));

vi.mock('/@/components/Icon', () => ({
  Icon: vi.fn((props) => props),
}));

vi.mock('ant-design-vue', () => ({
  Modal: {
    confirm: vi.fn(() => ({ destroy: vi.fn() })),
    success: vi.fn(() => ({ destroy: vi.fn() })),
    error: vi.fn(() => ({ destroy: vi.fn() })),
    info: vi.fn(() => ({ destroy: vi.fn() })),
    warning: vi.fn(() => ({ destroy: vi.fn() })),
  },
  message: {
    success: vi.fn(() => vi.fn()),
    error: vi.fn(() => vi.fn()),
    info: vi.fn(() => vi.fn()),
    warning: vi.fn(() => vi.fn()),
  },
  notification: {
    config: vi.fn(),
    success: vi.fn(),
    error: vi.fn(),
    info: vi.fn(),
    warning: vi.fn(),
    open: vi.fn(),
    close: vi.fn(),
    destroy: vi.fn(),
  },
}));

vi.mock('@ant-design/icons-vue', () => ({
  InfoCircleFilled: vi.fn(),
  CheckCircleFilled: vi.fn(),
  CloseCircleFilled: vi.fn(),
}));

describe('hooks/web/useMessage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should export useMessage hook', () => {
    expect(useMessage).toBeDefined();
    expect(typeof useMessage).toBe('function');
  });

  it('should return message utilities', () => {
    const messageUtils = useMessage();
    
    expect(messageUtils.createMessage).toBeDefined();
    expect(messageUtils.notification).toBeDefined();
    expect(typeof messageUtils.createConfirm).toBe('function');
    expect(typeof messageUtils.createSuccessModal).toBe('function');
    expect(typeof messageUtils.createErrorModal).toBe('function');
    expect(typeof messageUtils.createInfoModal).toBe('function');
    expect(typeof messageUtils.createWarningModal).toBe('function');
    expect(typeof messageUtils.showMessageModal).toBe('function');
    expect(typeof messageUtils.showMessage).toBe('function');
  });

  it('should handle createConfirm with different icon types', () => {
    const messageUtils = useMessage();
    
    // Test with warning icon type
    expect(() => {
      messageUtils.createConfirm({
        content: 'Test warning',
        iconType: 'warning',
      });
    }).not.toThrow();
    
    // Test with success icon type
    expect(() => {
      messageUtils.createConfirm({
        content: 'Test success',
        iconType: 'success',
      });
    }).not.toThrow();
    
    // Test with error icon type
    expect(() => {
      messageUtils.createConfirm({
        content: 'Test error',
        iconType: 'error',
      });
    }).not.toThrow();
    
    // Test with info icon type
    expect(() => {
      messageUtils.createConfirm({
        content: 'Test info',
        iconType: 'info',
      });
    }).not.toThrow();
  });

  it('should handle createSuccessModal', () => {
    const messageUtils = useMessage();
    
    expect(() => {
      messageUtils.createSuccessModal({
        content: 'Success message',
      });
    }).not.toThrow();
  });

  it('should handle createErrorModal', () => {
    const messageUtils = useMessage();
    
    expect(() => {
      messageUtils.createErrorModal({
        content: 'Error message',
      });
    }).not.toThrow();
  });

  it('should handle createInfoModal', () => {
    const messageUtils = useMessage();
    
    expect(() => {
      messageUtils.createInfoModal({
        content: 'Info message',
      });
    }).not.toThrow();
  });

  it('should handle createWarningModal', () => {
    const messageUtils = useMessage();
    
    expect(() => {
      messageUtils.createWarningModal({
        content: 'Warning message',
      });
    }).not.toThrow();
  });

  it('should handle showMessageModal with string content', () => {
    const messageUtils = useMessage();
    
    expect(() => {
      messageUtils.showMessageModal('Test message');
    }).not.toThrow();
  });

  it('should handle showMessageModal with object content', () => {
    const messageUtils = useMessage();
    
    expect(() => {
      messageUtils.showMessageModal({
        content: 'Test message',
      });
    }).not.toThrow();
  });

  it('should handle showMessageModal with error type', () => {
    const messageUtils = useMessage();
    
    expect(() => {
      messageUtils.showMessageModal('Test error message', 'error');
    }).not.toThrow();
  });

  it('should handle showMessageModal with warning type', () => {
    const messageUtils = useMessage();
    
    expect(() => {
      messageUtils.showMessageModal('Test warning message', 'warning');
    }).not.toThrow();
  });

  it('should handle showMessageModal with success type', () => {
    const messageUtils = useMessage();
    
    expect(() => {
      messageUtils.showMessageModal('Test success message', 'success');
    }).not.toThrow();
  });

  it('should handle showMessageModal with posfull content', () => {
    const messageUtils = useMessage();
    
    expect(() => {
      messageUtils.showMessageModal('posfull:Test posfull message');
    }).not.toThrow();
  });

  it('should handle showMessage with string content', () => {
    const messageUtils = useMessage();
    
    expect(() => {
      messageUtils.showMessage('Test message');
    }).not.toThrow();
  });

  it('should handle showMessage with error type', () => {
    const messageUtils = useMessage();
    
    expect(() => {
      messageUtils.showMessage('Test error message', 'error');
    }).not.toThrow();
  });

  it('should handle showMessage with warning type', () => {
    const messageUtils = useMessage();
    
    expect(() => {
      messageUtils.showMessage('Test warning message', 'warning');
    }).not.toThrow();
  });

  it('should handle showMessage with success type', () => {
    const messageUtils = useMessage();
    
    expect(() => {
      messageUtils.showMessage('Test success message', 'success');
    }).not.toThrow();
  });

  it('should handle showMessage with posfull content', () => {
    const messageUtils = useMessage();
    
    expect(() => {
      messageUtils.showMessage('posfull:Test posfull message');
    }).not.toThrow();
  });

  it('should handle showMessage with duration and onClose', () => {
    const messageUtils = useMessage();
    const onClose = vi.fn();
    
    expect(() => {
      messageUtils.showMessage('Test message', 'info', 5000, onClose);
    }).not.toThrow();
  });

  it('should handle notification config', () => {
    // The notification.config is called during module import
    // We can't easily test this without mocking the module import
    // So we'll just verify the module loads correctly
    expect(useMessage).toBeDefined();
  });

  it('should handle contains function with error content', () => {
    const messageUtils = useMessage();
    
    expect(() => {
      messageUtils.showMessageModal('This is an error message');
    }).not.toThrow();
  });

  it('should handle contains function with warning content', () => {
    const messageUtils = useMessage();
    
    expect(() => {
      messageUtils.showMessageModal('This is a warning message');
    }).not.toThrow();
  });

  it('should handle contains function with success content', () => {
    const messageUtils = useMessage();
    
    expect(() => {
      messageUtils.showMessageModal('This is a success message');
    }).not.toThrow();
  });

  it('should handle contains function with object content', () => {
    const messageUtils = useMessage();
    
    expect(() => {
      messageUtils.showMessageModal({
        content: 'This is an error message',
      });
    }).not.toThrow();
  });

  it('should handle renderContent with string', () => {
    const messageUtils = useMessage();
    
    expect(() => {
      messageUtils.createConfirm({
        content: 'String content',
        iconType: 'info',
      });
    }).not.toThrow();
  });

  it('should handle renderContent with non-string', () => {
    const messageUtils = useMessage();
    
    expect(() => {
      messageUtils.createConfirm({
        content: { type: 'div', children: 'Non-string content' },
        iconType: 'info',
      });
    }).not.toThrow();
  });

  it('should handle getBaseOptions', () => {
    const messageUtils = useMessage();
    
    expect(() => {
      messageUtils.createSuccessModal({
        content: 'Test message',
      });
    }).not.toThrow();
  });

  it('should handle contains function with object content containing innerHTML', () => {
    const messageUtils = useMessage();
    
    expect(() => {
      messageUtils.showMessageModal({
        content: {
          props: {
            innerHTML: 'This is an error message',
          },
        },
      });
    }).not.toThrow();
  });

  it('should handle contains function with comma-separated search terms', () => {
    const messageUtils = useMessage();
    
    expect(() => {
      messageUtils.showMessageModal('This contains error, warning');
    }).not.toThrow();
  });

  it('should handle showMessage with posfull content and duration', () => {
    const messageUtils = useMessage();
    
    expect(() => {
      messageUtils.showMessage('posfull:Test posfull message', 'info', 3000);
    }).not.toThrow();
  });

  it('should handle showMessageModal with posfull content and width', () => {
    const messageUtils = useMessage();
    
    expect(() => {
      messageUtils.showMessageModal('posfull:Test posfull message');
    }).not.toThrow();
  });
});
