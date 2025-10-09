import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import LazyContainer from '/@/components/Container/src/LazyContainer.vue';

// Mock IntersectionObserver
const mockIntersectionObserver = vi.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver;

describe('LazyContainer', () => {
  it('should render correctly', () => {
    const wrapper = mount(LazyContainer);
    expect(wrapper.exists()).toBe(true);
  });
});
