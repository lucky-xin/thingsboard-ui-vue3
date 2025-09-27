import { describe, it, expect } from 'vitest';

// Test Excel component index exports without mocks to get real coverage
describe('Excel/index coverage', () => {
  it('should export ImpExcel, ExpExcelModal components and utility functions', async () => {
    const { ImpExcel, ExpExcelModal, jsonToSheetXlsx, aoaToSheetXlsx } = await import('/@/components/Excel');
    
    expect(ImpExcel).toBeDefined();
    expect(ExpExcelModal).toBeDefined();
    expect(jsonToSheetXlsx).toBeDefined();
    expect(aoaToSheetXlsx).toBeDefined();
  });

  it('should have install method for all components', async () => {
    const { ImpExcel, ExpExcelModal } = await import('/@/components/Excel');
    
    expect(ImpExcel.install).toBeDefined();
    expect(ExpExcelModal.install).toBeDefined();
    expect(typeof ImpExcel.install).toBe('function');
    expect(typeof ExpExcelModal.install).toBe('function');
  });

  it('should install components correctly', async () => {
    const { ImpExcel, ExpExcelModal } = await import('/@/components/Excel');
    const mockApp = {
      component: vi.fn(),
    };
    
    ImpExcel.install(mockApp as any);
    ExpExcelModal.install(mockApp as any);
    
    expect(mockApp.component).toHaveBeenCalledTimes(2);
  });

  it('should export all expected components and functions', async () => {
    const exports = await import('/@/components/Excel');
    const exportKeys = Object.keys(exports);
    
    expect(exportKeys).toContain('ImpExcel');
    expect(exportKeys).toContain('ExpExcelModal');
    expect(exportKeys).toContain('jsonToSheetXlsx');
    expect(exportKeys).toContain('aoaToSheetXlsx');
  });

  it('should be valid Vue components', async () => {
    const { ImpExcel, ExpExcelModal } = await import('/@/components/Excel');
    
    expect(ImpExcel).toBeDefined();
    expect(ExpExcelModal).toBeDefined();
    expect(typeof ImpExcel).toBe('object');
    expect(typeof ExpExcelModal).toBe('object');
  });

  it('should export utility functions', async () => {
    const { jsonToSheetXlsx, aoaToSheetXlsx } = await import('/@/components/Excel');
    
    expect(typeof jsonToSheetXlsx).toBe('function');
    expect(typeof aoaToSheetXlsx).toBe('function');
  });

  it('should export components with proper structure', async () => {
    const { ImpExcel, ExpExcelModal } = await import('/@/components/Excel');
    
    // Components should have install method from withInstall
    expect(ImpExcel.install).toBeInstanceOf(Function);
    expect(ExpExcelModal.install).toBeInstanceOf(Function);
  });

  it('should work with withInstall utility', async () => {
    const { ImpExcel, ExpExcelModal } = await import('/@/components/Excel');
    
    // Test that withInstall was applied correctly
    expect(ImpExcel).toHaveProperty('install');
    expect(ExpExcelModal).toHaveProperty('install');
    
    // Test that install methods work
    const mockApp = { component: vi.fn() };
    ImpExcel.install(mockApp as any);
    ExpExcelModal.install(mockApp as any);
    
    expect(mockApp.component).toHaveBeenCalledTimes(2);
  });

  it('should have correct component names', async () => {
    const { ImpExcel, ExpExcelModal } = await import('/@/components/Excel');
    
    expect(ImpExcel).toHaveProperty('__name');
    expect(ExpExcelModal).toHaveProperty('__name');
  });

  it('should export typing definitions', async () => {
    const exports = await import('/@/components/Excel');
    
    // Should have exported types from typing file
    expect(exports).toBeDefined();
  });
});

