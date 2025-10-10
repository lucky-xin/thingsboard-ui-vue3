import { describe, it, expect, vi, beforeEach } from 'vitest';
import { jsonToSheetXlsx, aoaToSheetXlsx } from '/@/components/Excel/src/Export2Excel';

// Mock xlsx
vi.mock('xlsx', () => ({
  utils: {
    json_to_sheet: vi.fn(() => ({})),
    aoa_to_sheet: vi.fn(() => ({})),
  },
  writeFile: vi.fn(),
}));

describe('Export2Excel', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('jsonToSheetXlsx', () => {
    it('should export data to Excel without header', async () => {
      const { utils, writeFile } = await import('xlsx');
      
      const data = [
        { name: 'John', age: 30 },
        { name: 'Jane', age: 25 },
      ];
      
      jsonToSheetXlsx({
        data,
        filename: 'test.xlsx',
      });

      expect(vi.mocked(utils.json_to_sheet)).toHaveBeenCalledWith(data, {});
      expect(vi.mocked(writeFile)).toHaveBeenCalledWith(
        expect.objectContaining({
          SheetNames: ['test.xlsx'],
          Sheets: {
            'test.xlsx': {},
          },
        }),
        'test.xlsx',
        { bookType: 'xlsx' }
      );
    });

    it('should export data to Excel with header', async () => {
      const { utils, writeFile } = await import('xlsx');
      
      const data = [
        { name: 'John', age: 30 },
        { name: 'Jane', age: 25 },
      ];
      const header = { name: 'Name', age: 'Age' };
      
      jsonToSheetXlsx({
        data,
        header,
        filename: 'test.xlsx',
      });

      expect(vi.mocked(utils.json_to_sheet)).toHaveBeenCalledWith(
        [header, ...data],
        { skipHeader: true }
      );
      expect(vi.mocked(writeFile)).toHaveBeenCalledWith(
        expect.objectContaining({
          SheetNames: ['test.xlsx'],
          Sheets: {
            'test.xlsx': {},
          },
        }),
        'test.xlsx',
        { bookType: 'xlsx' }
      );
    });

    it('should use default filename when not provided', async () => {
      const { utils, writeFile } = await import('xlsx');
      
      const data = [{ name: 'John' }];
      
      jsonToSheetXlsx({
        data,
      });

      expect(vi.mocked(utils.json_to_sheet)).toHaveBeenCalledWith(data, {});
      expect(vi.mocked(writeFile)).toHaveBeenCalledWith(
        expect.objectContaining({
          SheetNames: ['excel-list.xlsx'],
          Sheets: {
            'excel-list.xlsx': {},
          },
        }),
        'excel-list.xlsx',
        { bookType: 'xlsx' }
      );
    });

    it('should handle custom json2sheetOpts', async () => {
      const { utils, writeFile } = await import('xlsx');
      
      const data = [{ name: 'John' }];
      const json2sheetOpts = { skipHeader: false };
      
      jsonToSheetXlsx({
        data,
        json2sheetOpts,
      });

      expect(vi.mocked(utils.json_to_sheet)).toHaveBeenCalledWith(data, json2sheetOpts);
    });

    it('should handle custom write2excelOpts', async () => {
      const { utils, writeFile } = await import('xlsx');
      
      const data = [{ name: 'John' }];
      const write2excelOpts = { bookType: 'csv' };
      
      jsonToSheetXlsx({
        data,
        write2excelOpts,
      });

      expect(vi.mocked(writeFile)).toHaveBeenCalledWith(
        expect.objectContaining({
          SheetNames: ['excel-list.xlsx'],
          Sheets: {
            'excel-list.xlsx': {},
          },
        }),
        'excel-list.xlsx',
        { bookType: 'csv' }
      );
    });
  });

  describe('aoaToSheetXlsx', () => {
    it('should export array of arrays to Excel without header', async () => {
      const { utils, writeFile } = await import('xlsx');
      
      const data = [
        ['John', 30],
        ['Jane', 25],
      ];
      
      aoaToSheetXlsx({
        data,
        filename: 'test.xlsx',
      });

      expect(vi.mocked(utils.aoa_to_sheet)).toHaveBeenCalledWith(data);
      expect(vi.mocked(writeFile)).toHaveBeenCalledWith(
        expect.objectContaining({
          SheetNames: ['test.xlsx'],
          Sheets: {
            'test.xlsx': {},
          },
        }),
        'test.xlsx',
        { bookType: 'xlsx' }
      );
    });

    it('should export array of arrays to Excel with header', async () => {
      const { utils, writeFile } = await import('xlsx');
      
      const data = [
        ['John', 30],
        ['Jane', 25],
      ];
      const header = ['Name', 'Age'];
      
      aoaToSheetXlsx({
        data,
        header,
        filename: 'test.xlsx',
      });

      expect(vi.mocked(utils.aoa_to_sheet)).toHaveBeenCalledWith([header, ...data]);
      expect(vi.mocked(writeFile)).toHaveBeenCalledWith(
        expect.objectContaining({
          SheetNames: ['test.xlsx'],
          Sheets: {
            'test.xlsx': {},
          },
        }),
        'test.xlsx',
        { bookType: 'xlsx' }
      );
    });

    it('should use default filename when not provided', async () => {
      const { utils, writeFile } = await import('xlsx');
      
      const data = [['John']];
      
      aoaToSheetXlsx({
        data,
      });

      expect(vi.mocked(utils.aoa_to_sheet)).toHaveBeenCalledWith(data);
      expect(vi.mocked(writeFile)).toHaveBeenCalledWith(
        expect.objectContaining({
          SheetNames: ['excel-list.xlsx'],
          Sheets: {
            'excel-list.xlsx': {},
          },
        }),
        'excel-list.xlsx',
        { bookType: 'xlsx' }
      );
    });

    it('should handle custom write2excelOpts', async () => {
      const { utils, writeFile } = await import('xlsx');
      
      const data = [['John']];
      const write2excelOpts = { bookType: 'csv' };
      
      aoaToSheetXlsx({
        data,
        write2excelOpts,
      });

      expect(vi.mocked(writeFile)).toHaveBeenCalledWith(
        expect.objectContaining({
          SheetNames: ['excel-list.xlsx'],
          Sheets: {
            'excel-list.xlsx': {},
          },
        }),
        'excel-list.xlsx',
        { bookType: 'csv' }
      );
    });
  });
});
