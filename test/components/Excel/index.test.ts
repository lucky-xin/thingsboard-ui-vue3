import { describe, it, expect } from 'vitest';

describe('Excel/index', () => {
  it('should export ImpExcel and ExpExcelModal components', async () => {
    const module = await import('/@/components/Excel/index');
    
    expect(module).toBeDefined();
    expect(module.ImpExcel).toBeDefined();
    expect(module.ExpExcelModal).toBeDefined();
  });

  it('should export Excel utility functions', async () => {
    const module = await import('/@/components/Excel/index');
    
    expect(module.jsonToSheetXlsx).toBeDefined();
    expect(module.aoaToSheetXlsx).toBeDefined();
    expect(typeof module.jsonToSheetXlsx).toBe('function');
    expect(typeof module.aoaToSheetXlsx).toBe('function');
  });

  it('should be valid Vue components', async () => {
    const module = await import('/@/components/Excel/index');
    const { ImpExcel, ExpExcelModal } = module;
    
    expect(typeof ImpExcel).toBe('object');
    expect(typeof ExpExcelModal).toBe('object');
  });

  it('should have correct exports', async () => {
    const module = await import('/@/components/Excel/index');
    const exports = Object.keys(module);
    
    expect(exports).toContain('ImpExcel');
    expect(exports).toContain('ExpExcelModal');
    expect(exports).toContain('jsonToSheetXlsx');
    expect(exports).toContain('aoaToSheetXlsx');
  });
});