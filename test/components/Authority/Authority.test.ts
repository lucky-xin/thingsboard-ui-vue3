import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import Authority from '/@/components/Authority/src/Authority.vue';
import { usePermission } from '/@/hooks/web/usePermission';

// Mock usePermission hook
vi.mock('/@/hooks/web/usePermission', () => {
  return {
    usePermission: vi.fn(),
  };
});

describe('Authority.vue', () => {
  const mockHasPermission = vi.fn();

  beforeEach(() => {
    // Reset mock before each test
    mockHasPermission.mockReset();
    (usePermission as any).mockReturnValue({
      hasPermission: mockHasPermission,
    });
  });

  it('renders slot content when no value is provided', () => {
    const wrapper = mount(Authority, {
      slots: {
        default: '<div>Test Content</div>',
      },
    });

    expect(wrapper.html()).toContain('Test Content');
  });

  it('renders slot content when value is provided and has permission', () => {
    mockHasPermission.mockReturnValue(true);

    const wrapper = mount(Authority, {
      props: {
        value: 'admin',
      },
      slots: {
        default: '<div>Authorized Content</div>',
      },
    });

    expect(wrapper.html()).toContain('Authorized Content');
    expect(mockHasPermission).toHaveBeenCalledWith('admin');
  });

  it('does not render slot content when value is provided and has no permission', () => {
    mockHasPermission.mockReturnValue(false);

    const wrapper = mount(Authority, {
      props: {
        value: 'admin',
      },
      slots: {
        default: '<div>Unauthorized Content</div>',
      },
    });

    expect(wrapper.html()).not.toContain('Unauthorized Content');
    expect(wrapper.html()).toBe('');
    expect(mockHasPermission).toHaveBeenCalledWith('admin');
  });

  it('handles array value correctly', () => {
    mockHasPermission.mockReturnValue(true);

    const wrapper = mount(Authority, {
      props: {
        value: ['admin', 'user'],
      },
      slots: {
        default: '<div>Array Permission Content</div>',
      },
    });

    expect(wrapper.html()).toContain('Array Permission Content');
    expect(mockHasPermission).toHaveBeenCalledWith(['admin', 'user']);
  });
});