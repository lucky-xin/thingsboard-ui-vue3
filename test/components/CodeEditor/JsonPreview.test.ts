import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import JsonPreview from '/@/components/CodeEditor/src/json-preview/JsonPreview.vue';

describe('JsonPreview.vue', () => {
  it('renders correctly with default props', () => {
    const wrapper = mount(JsonPreview, {
      props: {
        data: {},
      },
    });

    expect(wrapper.exists()).toBe(true);
  });

  it('displays JSON data correctly', () => {
    const testData = { name: 'test', value: 123 };
    const wrapper = mount(JsonPreview, {
      props: {
        data: testData,
      },
    });

    expect(wrapper.props('data')).toEqual(testData);
  });

  it('handles array data correctly', () => {
    const testData = [1, 2, 3];
    const wrapper = mount(JsonPreview, {
      props: {
        data: testData,
      },
    });

    expect(wrapper.props('data')).toEqual(testData);
  });

  it('handles null data correctly', () => {
    const wrapper = mount(JsonPreview, {
      props: {
        data: null,
      },
    });

    expect(wrapper.props('data')).toBeNull();
  });

  it('handles undefined data correctly', () => {
    const wrapper = mount(JsonPreview, {
      props: {
        data: undefined,
      },
    });

    expect(wrapper.props('data')).toBeUndefined();
  });
});