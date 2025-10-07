import { describe, it, expect, vi } from 'vitest';

// Mock dependencies
vi.mock('/@/utils', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    getDynamicProps: vi.fn((props) => props),
  };
});

vi.mock('/@/utils/env', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    isProdMode: vi.fn(() => true),
  };
});

vi.mock('/@/utils/log', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    error: vi.fn(),
  };
});

describe('useTable', () => {
  it('should export useTable hook', async () => {
    const module = await import('/@/components/Table/src/hooks/useTable');
    expect(module).toBeDefined();
    expect(typeof module.useTable).toBe('function');
  });

  it('should return register function and methods', async () => {
    const { useTable } = await import('/@/components/Table/src/hooks/useTable');
    const result = useTable();

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(2);

    const [register, methods] = result;
    expect(typeof register).toBe('function');
    expect(typeof methods).toBe('object');
  });

  it('should have all required methods', async () => {
    const { useTable } = await import('/@/components/Table/src/hooks/useTable');
    const [_, methods] = useTable();

    // Test basic methods
    expect(typeof methods.reload).toBe('function');
    expect(typeof methods.setProps).toBe('function');
    expect(typeof methods.setLoading).toBe('function');
    expect(typeof methods.getTableRef).toBe('function');
    expect(typeof methods.redoHeight).toBe('function');
    expect(typeof methods.scrollTo).toBe('function');
    expect(typeof methods.getSize).toBe('function');
    expect(typeof methods.emit).toBe('function');

    // Test column methods
    expect(typeof methods.getColumns).toBe('function');
    expect(typeof methods.getCacheColumns).toBe('function');
    expect(typeof methods.setColumns).toBe('function');
    expect(typeof methods.updateColumn).toBe('function');

    // Test pagination methods
    expect(typeof methods.getPagination).toBe('function');
    expect(typeof methods.setPagination).toBe('function');
    expect(typeof methods.getShowPagination).toBe('function');
    expect(typeof methods.setShowPagination).toBe('function');

    // Test data source methods
    expect(typeof methods.getDataSource).toBe('function');
    expect(typeof methods.getDelDataSource).toBe('function');
    expect(typeof methods.getRawDataSource).toBe('function');
    expect(typeof methods.setTableData).toBe('function');
    expect(typeof methods.updateTableData).toBe('function');
    expect(typeof methods.updateTableDataRecord).toBe('function');
    expect(typeof methods.deleteTableDataRecord).toBe('function');
    expect(typeof methods.insertTableDataRecord).toBe('function');
    expect(typeof methods.findTableDataRecord).toBe('function');

    // Test row selection methods
    expect(typeof methods.getRowSelection).toBe('function');
    expect(typeof methods.getDefaultRowSelection).toBe('function');
    expect(typeof methods.getSelectRows).toBe('function');
    expect(typeof methods.getSelectRowKeys).toBe('function');
    expect(typeof methods.setSelectedRowKeys).toBe('function');
    expect(typeof methods.deleteSelectRowByKey).toBe('function');
    expect(typeof methods.clearSelectedRowKeys).toBe('function');

    // Test expand methods
    expect(typeof methods.expandAll).toBe('function');
    expect(typeof methods.expandRows).toBe('function');
    expect(typeof methods.collapseAll).toBe('function');
    expect(typeof methods.expandCollapse).toBe('function');

    // Test form method
    expect(typeof methods.getForm).toBe('function');
  });
});