import { describe, it, expect, vi } from 'vitest';

// Mock useTable hook
vi.mock('/@/components/Table/src/hooks/useTable', () => ({
  useTable: vi.fn(),
}));

// Test Table component index exports
describe('Table/index', () => {
  it('should export table components', async () => {
    const {
      BasicTable,
      TableAction,
      EditTableHeaderIcon,
      TableImg,
      TableHeader
    } = await import('/@/components/Table');
    
    expect(BasicTable).toBeDefined();
    expect(TableAction).toBeDefined();
    expect(EditTableHeaderIcon).toBeDefined();
    expect(TableImg).toBeDefined();
    expect(TableHeader).toBeDefined();
  });

  it('should export useTable hook', async () => {
    const { useTable } = await import('/@/components/Table');
    
    expect(useTable).toBeDefined();
    expect(typeof useTable).toBe('function');
  });

  it('should export typing definitions', async () => {
    // This tests that the typing exports don't throw errors
    const exports = await import('/@/components/Table');
    
    expect(exports).toBeDefined();
    expect(exports.BasicTable).toBeDefined();
    expect(exports.useTable).toBeDefined();
  });

  it('should have correct exports count', async () => {
    const exports = await import('/@/components/Table');
    const exportKeys = Object.keys(exports);
    
    // Should export: components, hooks, and type definitions
    expect(exportKeys).toContain('BasicTable');
    expect(exportKeys).toContain('TableAction');
    expect(exportKeys).toContain('EditTableHeaderIcon');
    expect(exportKeys).toContain('TableImg');
    expect(exportKeys).toContain('TableHeader');
    expect(exportKeys).toContain('useTable');
    expect(exportKeys.length).toBeGreaterThanOrEqual(6);
  });

  it('should be valid Vue components', async () => {
    const { BasicTable, TableAction, TableHeader } = await import('/@/components/Table');
    
    expect(BasicTable).toBeDefined();
    expect(TableAction).toBeDefined();
    expect(TableHeader).toBeDefined();
    expect(typeof BasicTable).toBe('object');
    expect(typeof TableAction).toBe('object');
    expect(typeof TableHeader).toBe('object');
  });

  it('should export table components with proper structure', async () => {
    const { BasicTable, TableAction } = await import('/@/components/Table');

    // Table components should be defined
    expect(BasicTable).toBeDefined();
    expect(TableAction).toBeDefined();
  });

  it('should handle component imports correctly', async () => {
    // Test that all imports can be destructured without errors
    const exports = await import('/@/components/Table');
    const {
      BasicTable,
      TableAction,
      EditTableHeaderIcon,
      TableImg,
      TableHeader,
      useTable
    } = exports;
    
    expect(BasicTable).toBeDefined();
    expect(TableAction).toBeDefined();
    expect(EditTableHeaderIcon).toBeDefined();
    expect(TableImg).toBeDefined();
    expect(TableHeader).toBeDefined();
    expect(useTable).toBeDefined();
  });
});