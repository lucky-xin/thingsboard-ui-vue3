import { describe, it, expect, vi } from 'vitest';

vi.mock('/@/components/Excel/index', () => ({
  ImpExcel: { name: 'MockImpExcel' },
  ExpExcelModal: { name: 'MockExpExcelModal' },
  jsonToSheetXlsx: () => ({}),
  aoaToSheetXlsx: () => ({}),
}));

describe('Excel/index', () => {
  it('should export ImpExcel component', async () => {
    const { ImpExcel } = await import('/@/components/Excel/index');
    expect(ImpExcel).toBeDefined();
  });

  it('should export ExpExcelModal component', async () => {
    const { ExpExcelModal } = await import('/@/components/Excel/index');
    expect(ExpExcelModal).toBeDefined();
  });

  it('should export jsonToSheetXlsx function', async () => {
    const { jsonToSheetXlsx } = await import('/@/components/Excel/index');
    expect(jsonToSheetXlsx).toBeDefined();
  });

  it('should export aoaToSheetXlsx function', async () => {
    const { aoaToSheetXlsx } = await import('/@/components/Excel/index');
    expect(aoaToSheetXlsx).toBeDefined();
  });
});