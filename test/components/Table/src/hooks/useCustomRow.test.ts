import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref, computed } from 'vue';
import { useCustomRow } from '/@/components/Table/src/hooks/useCustomRow';

// Mock lodash-es
vi.mock('lodash-es', () => ({
  clone: vi.fn((obj) => JSON.parse(JSON.stringify(obj))),
}));

// Mock the utils
vi.mock('/@/utils/is', () => ({
  isString: vi.fn((value) => typeof value === 'string'),
  isFunction: vi.fn((value) => typeof value === 'function'),
}));

describe('useCustomRow', () => {
  let propsRef: any;
  let options: any;

  beforeEach(() => {
    propsRef = computed(() => ({
      rowSelection: {
        type: 'checkbox',
      },
      rowKey: 'id',
      clickToRowSelect: true,
      canRowDrag: false,
    }));

    options = {
      setSelectedRowKeys: vi.fn(),
      getSelectRowKeys: vi.fn(() => []),
      clearSelectedRowKeys: vi.fn(),
      getAutoCreateKey: computed(() => false),
      getDataSourceRef: ref([]),
      tableRef: ref({}),
      emit: vi.fn(),
    };
  });

  it('should create custom row with event handlers', () => {
    const { customRow } = useCustomRow(propsRef, options);
    const record = { id: '1', name: 'Test' };
    const index = 0;

    const rowProps = customRow(record, index);

    expect(rowProps).toHaveProperty('onClick');
    expect(rowProps).toHaveProperty('onDblclick');
    expect(rowProps).toHaveProperty('onContextmenu');
    expect(rowProps).toHaveProperty('onMouseenter');
    expect(rowProps).toHaveProperty('onMouseleave');
    expect(rowProps).toHaveProperty('onDragstart');
    expect(rowProps).toHaveProperty('onDragover');
    expect(rowProps).toHaveProperty('onDrop');
  });

  it('should handle row click with checkbox selection', () => {
    const { customRow } = useCustomRow(propsRef, options);
    const record = { id: '1', name: 'Test' };
    const index = 0;

    const rowProps = customRow(record, index);
    const mockEvent = {
      stopPropagation: vi.fn(),
      composedPath: vi.fn(() => [
        { tagName: 'TR', querySelector: vi.fn(() => ({ hasAttribute: vi.fn(() => false) })) }
      ])
    };

    rowProps.onClick(mockEvent);

    expect(mockEvent.stopPropagation).toHaveBeenCalled();
    expect(options.emit).toHaveBeenCalledWith('row-click', record, index, mockEvent);
  });

  it('should handle row click with radio selection', () => {
    const radioPropsRef = computed(() => ({
      ...propsRef.value,
      rowSelection: {
        type: 'radio',
      },
    }));

    const { customRow } = useCustomRow(radioPropsRef, options);
    const record = { id: '1', name: 'Test' };
    const index = 0;

    const rowProps = customRow(record, index);
    const mockEvent = {
      stopPropagation: vi.fn(),
      composedPath: vi.fn(() => [
        { tagName: 'TR', querySelector: vi.fn(() => ({ hasAttribute: vi.fn(() => false) })) }
      ])
    };

    rowProps.onClick(mockEvent);

    expect(mockEvent.stopPropagation).toHaveBeenCalled();
    expect(options.emit).toHaveBeenCalledWith('row-click', record, index, mockEvent);
  });

  it('should not handle row click when rowSelection is disabled', () => {
    const noSelectionPropsRef = computed(() => ({
      ...propsRef.value,
      rowSelection: null,
    }));

    const { customRow } = useCustomRow(noSelectionPropsRef, options);
    const record = { id: '1', name: 'Test' };
    const index = 0;

    const rowProps = customRow(record, index);
    const mockEvent = {
      stopPropagation: vi.fn(),
    };

    rowProps.onClick(mockEvent);

    expect(mockEvent.stopPropagation).toHaveBeenCalled();
    expect(options.emit).toHaveBeenCalledWith('row-click', record, index, mockEvent);
  });

  it('should not handle row click when clickToRowSelect is disabled', () => {
    const noClickPropsRef = computed(() => ({
      ...propsRef.value,
      clickToRowSelect: false,
    }));

    const { customRow } = useCustomRow(noClickPropsRef, options);
    const record = { id: '1', name: 'Test' };
    const index = 0;

    const rowProps = customRow(record, index);
    const mockEvent = {
      stopPropagation: vi.fn(),
    };

    rowProps.onClick(mockEvent);

    expect(mockEvent.stopPropagation).toHaveBeenCalled();
    expect(options.emit).toHaveBeenCalledWith('row-click', record, index, mockEvent);
  });

  it('should handle double click event', () => {
    const { customRow } = useCustomRow(propsRef, options);
    const record = { id: '1', name: 'Test' };
    const index = 0;

    const rowProps = customRow(record, index);
    const mockEvent = {};

    rowProps.onDblclick(mockEvent);

    expect(options.emit).toHaveBeenCalledWith('row-db-click', record, index, mockEvent);
  });

  it('should handle context menu event', () => {
    const { customRow } = useCustomRow(propsRef, options);
    const record = { id: '1', name: 'Test' };
    const index = 0;

    const rowProps = customRow(record, index);
    const mockEvent = {};

    rowProps.onContextmenu(mockEvent);

    expect(options.emit).toHaveBeenCalledWith('row-contextmenu', record, index, mockEvent);
  });

  it('should handle mouse enter event', () => {
    const { customRow } = useCustomRow(propsRef, options);
    const record = { id: '1', name: 'Test' };
    const index = 0;

    const rowProps = customRow(record, index);
    const mockEvent = {};

    rowProps.onMouseenter(mockEvent);

    expect(options.emit).toHaveBeenCalledWith('row-mouseenter', record, index, mockEvent);
  });

  it('should handle mouse leave event', () => {
    const { customRow } = useCustomRow(propsRef, options);
    const record = { id: '1', name: 'Test' };
    const index = 0;

    const rowProps = customRow(record, index);
    const mockEvent = {};

    rowProps.onMouseleave(mockEvent);

    expect(options.emit).toHaveBeenCalledWith('row-mouseleave', record, index, mockEvent);
  });

  it('should handle drag start event', () => {
    const { customRow } = useCustomRow(propsRef, options);
    const record = { id: '1', name: 'Test' };
    const index = 0;

    const rowProps = customRow(record, index);
    const mockEvent = {};

    rowProps.onDragstart(mockEvent);

    expect(options.emit).toHaveBeenCalledWith('row-dragstart', record, index, mockEvent);
  });

  it('should handle drag over event', () => {
    const { customRow } = useCustomRow(propsRef, options);
    const record = { id: '1', name: 'Test' };
    const index = 0;

    const rowProps = customRow(record, index);
    const mockEvent = {};

    rowProps.onDragover(mockEvent);

    expect(options.emit).toHaveBeenCalledWith('row-dragover', record, index, mockEvent);
  });

  it('should handle drop event', () => {
    const { customRow } = useCustomRow(propsRef, options);
    const record = { id: '1', name: 'Test' };
    const index = 0;

    const rowProps = customRow(record, index);
    const mockEvent = {};

    rowProps.onDrop(mockEvent);

    expect(options.emit).toHaveBeenCalledWith('row-drop', record, index, mockEvent);
  });

  it('should handle row click with disabled checkbox', () => {
    const { customRow } = useCustomRow(propsRef, options);
    const record = { id: '1', name: 'Test' };
    const index = 0;

    const rowProps = customRow(record, index);
    const mockEvent = {
      stopPropagation: vi.fn(),
      composedPath: vi.fn(() => [
        { 
          tagName: 'TR', 
          querySelector: vi.fn(() => ({ 
            hasAttribute: vi.fn(() => true) // disabled checkbox
          })) 
        }
      ])
    };

    rowProps.onClick(mockEvent);

    expect(mockEvent.stopPropagation).toHaveBeenCalled();
    expect(options.emit).toHaveBeenCalledWith('row-click', record, index, mockEvent);
  });

  it('should handle row click with no checkbox found', () => {
    const { customRow } = useCustomRow(propsRef, options);
    const record = { id: '1', name: 'Test' };
    const index = 0;

    const rowProps = customRow(record, index);
    const mockEvent = {
      stopPropagation: vi.fn(),
      composedPath: vi.fn(() => [
        { 
          tagName: 'TR', 
          querySelector: vi.fn(() => null) // no checkbox found
        }
      ])
    };

    rowProps.onClick(mockEvent);

    expect(mockEvent.stopPropagation).toHaveBeenCalled();
    expect(options.emit).toHaveBeenCalledWith('row-click', record, index, mockEvent);
  });

  it('should handle row click with no TR element found', () => {
    const { customRow } = useCustomRow(propsRef, options);
    const record = { id: '1', name: 'Test' };
    const index = 0;

    const rowProps = customRow(record, index);
    const mockEvent = {
      stopPropagation: vi.fn(),
      composedPath: vi.fn(() => []) // no TR element
    };

    rowProps.onClick(mockEvent);

    expect(mockEvent.stopPropagation).toHaveBeenCalled();
    expect(options.emit).toHaveBeenCalledWith('row-click', record, index, mockEvent);
  });

  it('should handle row click with function rowKey', () => {
    const functionRowKeyPropsRef = computed(() => ({
      ...propsRef.value,
      rowKey: (record: any) => record.customId,
    }));

    const { customRow } = useCustomRow(functionRowKeyPropsRef, options);
    const record = { id: '1', customId: 'custom-1', name: 'Test' };
    const index = 0;

    const rowProps = customRow(record, index);
    const mockEvent = {
      stopPropagation: vi.fn(),
      composedPath: vi.fn(() => [
        { tagName: 'TR', querySelector: vi.fn(() => ({ hasAttribute: vi.fn(() => false) })) }
      ])
    };

    rowProps.onClick(mockEvent);

    expect(mockEvent.stopPropagation).toHaveBeenCalled();
    expect(options.emit).toHaveBeenCalledWith('row-click', record, index, mockEvent);
  });

  it('should handle row click with autoCreateKey', () => {
    const autoCreateOptions = {
      ...options,
      getAutoCreateKey: computed(() => true),
    };

    const { customRow } = useCustomRow(propsRef, autoCreateOptions);
    const record = { id: '1', __vxe_row_id: 'auto-1', name: 'Test' };
    const index = 0;

    const rowProps = customRow(record, index);
    const mockEvent = {
      stopPropagation: vi.fn(),
      composedPath: vi.fn(() => [
        { tagName: 'TR', querySelector: vi.fn(() => ({ hasAttribute: vi.fn(() => false) })) }
      ])
    };

    rowProps.onClick(mockEvent);

    expect(mockEvent.stopPropagation).toHaveBeenCalled();
    expect(options.emit).toHaveBeenCalledWith('row-click', record, index, mockEvent);
  });
});
