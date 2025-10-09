import { describe, it, expect, vi } from 'vitest';
import { computed } from 'vue';
import { useTableStyle } from '/@/components/Table/src/hooks/useTableStyle';

// Mock the utils
vi.mock('/@/utils/is', () => ({
  isFunction: vi.fn((value) => typeof value === 'function'),
}));

describe('useTableStyle', () => {
  it('should return getRowClassName function', () => {
    const propsRef = computed(() => ({}));
    const prefixCls = 'vxe-table';
    
    const { getRowClassName } = useTableStyle(propsRef, prefixCls);
    
    expect(typeof getRowClassName).toBe('function');
  });

  it('should return empty class name for default props', () => {
    const propsRef = computed(() => ({}));
    const prefixCls = 'vxe-table';
    
    const { getRowClassName } = useTableStyle(propsRef, prefixCls);
    const record = { id: '1', name: 'Test' };
    const index = 0;
    
    const className = getRowClassName(record, index);
    
    expect(className).toBe('');
  });

  it('should add striped class for odd rows when striped is enabled', () => {
    const propsRef = computed(() => ({
      striped: true,
    }));
    const prefixCls = 'vxe-table';
    
    const { getRowClassName } = useTableStyle(propsRef, prefixCls);
    const record = { id: '1', name: 'Test' };
    const index = 1; // odd index
    
    const className = getRowClassName(record, index);
    
    expect(className).toBe('vxe-table-row__striped');
  });

  it('should not add striped class for even rows when striped is enabled', () => {
    const propsRef = computed(() => ({
      striped: true,
    }));
    const prefixCls = 'vxe-table';
    
    const { getRowClassName } = useTableStyle(propsRef, prefixCls);
    const record = { id: '1', name: 'Test' };
    const index = 0; // even index
    
    const className = getRowClassName(record, index);
    
    expect(className).toBe('');
  });

  it('should not add striped class for odd rows when striped is disabled', () => {
    const propsRef = computed(() => ({
      striped: false,
    }));
    const prefixCls = 'vxe-table';
    
    const { getRowClassName } = useTableStyle(propsRef, prefixCls);
    const record = { id: '1', name: 'Test' };
    const index = 1; // odd index
    
    const className = getRowClassName(record, index);
    
    expect(className).toBe('');
  });

  it('should add custom class name from rowClassName function', () => {
    const customRowClassName = vi.fn((record, index) => 'custom-class');
    const propsRef = computed(() => ({
      rowClassName: customRowClassName,
    }));
    const prefixCls = 'vxe-table';
    
    const { getRowClassName } = useTableStyle(propsRef, prefixCls);
    const record = { id: '1', name: 'Test' };
    const index = 0;
    
    const className = getRowClassName(record, index);
    
    expect(className).toBe('custom-class');
    expect(customRowClassName).toHaveBeenCalledWith(record, index);
  });

  it('should combine striped and custom class names', () => {
    const customRowClassName = vi.fn((record, index) => 'custom-class');
    const propsRef = computed(() => ({
      striped: true,
      rowClassName: customRowClassName,
    }));
    const prefixCls = 'vxe-table';
    
    const { getRowClassName } = useTableStyle(propsRef, prefixCls);
    const record = { id: '1', name: 'Test' };
    const index = 1; // odd index
    
    const className = getRowClassName(record, index);
    
    expect(className).toBe('vxe-table-row__striped custom-class');
    expect(customRowClassName).toHaveBeenCalledWith(record, index);
  });

  it('should handle rowClassName as non-function', () => {
    const propsRef = computed(() => ({
      rowClassName: 'static-class', // not a function
    }));
    const prefixCls = 'vxe-table';
    
    const { getRowClassName } = useTableStyle(propsRef, prefixCls);
    const record = { id: '1', name: 'Test' };
    const index = 0;
    
    const className = getRowClassName(record, index);
    
    expect(className).toBe('');
  });

  it('should handle empty class names', () => {
    const customRowClassName = vi.fn((record, index) => '');
    const propsRef = computed(() => ({
      striped: true,
      rowClassName: customRowClassName,
    }));
    const prefixCls = 'vxe-table';
    
    const { getRowClassName } = useTableStyle(propsRef, prefixCls);
    const record = { id: '1', name: 'Test' };
    const index = 0; // even index
    
    const className = getRowClassName(record, index);
    
    expect(className).toBe('');
  });

  it('should handle multiple class names from rowClassName function', () => {
    const customRowClassName = vi.fn((record, index) => 'class1 class2');
    const propsRef = computed(() => ({
      striped: true,
      rowClassName: customRowClassName,
    }));
    const prefixCls = 'vxe-table';
    
    const { getRowClassName } = useTableStyle(propsRef, prefixCls);
    const record = { id: '1', name: 'Test' };
    const index = 1; // odd index
    
    const className = getRowClassName(record, index);
    
    expect(className).toBe('vxe-table-row__striped class1 class2');
  });

  it('should handle null index', () => {
    const propsRef = computed(() => ({
      striped: true,
    }));
    const prefixCls = 'vxe-table';
    
    const { getRowClassName } = useTableStyle(propsRef, prefixCls);
    const record = { id: '1', name: 'Test' };
    const index = null as any;
    
    const className = getRowClassName(record, index);
    
    expect(className).toBe('');
  });

  it('should handle undefined index', () => {
    const propsRef = computed(() => ({
      striped: true,
    }));
    const prefixCls = 'vxe-table';
    
    const { getRowClassName } = useTableStyle(propsRef, prefixCls);
    const record = { id: '1', name: 'Test' };
    const index = undefined as any;
    
    const className = getRowClassName(record, index);
    
    expect(className).toBe('');
  });
});
