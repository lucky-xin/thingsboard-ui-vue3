import { describe, it, expect } from 'vitest';
import { ExcelData, JsonToSheet, AoAToSheet, ExportModalResult } from '/@/components/Excel/src/typing';

describe('components/Excel/src/typing', () => {
  describe('ExcelData', () => {
    it('should have correct interface structure', () => {
      const data: ExcelData = {
        header: ['Name', 'Age', 'Email'],
        results: [
          { name: 'John', age: 30, email: 'john@example.com' },
          { name: 'Jane', age: 25, email: 'jane@example.com' },
        ],
        meta: { sheetName: 'Users' },
      };

      expect(data.header).toEqual(['Name', 'Age', 'Email']);
      expect(data.results).toHaveLength(2);
      expect(data.meta.sheetName).toBe('Users');
    });

    it('should support generic type', () => {
      interface User {
        name: string;
        age: number;
        email: string;
      }

      const data: ExcelData<User> = {
        header: ['Name', 'Age', 'Email'],
        results: [
          { name: 'John', age: 30, email: 'john@example.com' },
          { name: 'Jane', age: 25, email: 'jane@example.com' },
        ],
        meta: { sheetName: 'Users' },
      };

      expect(data.results[0].name).toBe('John');
      expect(data.results[0].age).toBe(30);
      expect(data.results[0].email).toBe('john@example.com');
    });

    it('should support empty arrays', () => {
      const data: ExcelData = {
        header: [],
        results: [],
        meta: { sheetName: 'Empty' },
      };

      expect(data.header).toEqual([]);
      expect(data.results).toEqual([]);
      expect(data.meta.sheetName).toBe('Empty');
    });

    it('should support different data types', () => {
      const data: ExcelData = {
        header: ['ID', 'Name', 'Active'],
        results: [
          { id: 1, name: 'Item 1', active: true },
          { id: 2, name: 'Item 2', active: false },
        ],
        meta: { sheetName: 'Items' },
      };

      expect(data.results[0].id).toBe(1);
      expect(data.results[0].name).toBe('Item 1');
      expect(data.results[0].active).toBe(true);
    });
  });

  describe('JsonToSheet', () => {
    it('should have correct interface structure', () => {
      const jsonToSheet: JsonToSheet = {
        data: [
          { name: 'John', age: 30 },
          { name: 'Jane', age: 25 },
        ],
        header: { name: 'Name', age: 'Age' },
        filename: 'users.xlsx',
        json2sheetOpts: {},
        write2excelOpts: {},
      };

      expect(jsonToSheet.data).toHaveLength(2);
      expect(jsonToSheet.header).toEqual({ name: 'Name', age: 'Age' });
      expect(jsonToSheet.filename).toBe('users.xlsx');
      expect(jsonToSheet.json2sheetOpts).toEqual({});
      expect(jsonToSheet.write2excelOpts).toEqual({});
    });

    it('should support optional properties', () => {
      const jsonToSheet: JsonToSheet = {
        data: [{ name: 'John', age: 30 }],
      };

      expect(jsonToSheet.data).toHaveLength(1);
      expect(jsonToSheet.header).toBeUndefined();
      expect(jsonToSheet.filename).toBeUndefined();
      expect(jsonToSheet.json2sheetOpts).toBeUndefined();
      expect(jsonToSheet.write2excelOpts).toBeUndefined();
    });

    it('should support generic type', () => {
      interface Product {
        id: number;
        name: string;
        price: number;
      }

      const jsonToSheet: JsonToSheet<Product> = {
        data: [
          { id: 1, name: 'Product 1', price: 10.99 },
          { id: 2, name: 'Product 2', price: 20.99 },
        ],
        filename: 'products.xlsx',
      };

      expect(jsonToSheet.data[0].id).toBe(1);
      expect(jsonToSheet.data[0].name).toBe('Product 1');
      expect(jsonToSheet.data[0].price).toBe(10.99);
    });
  });

  describe('AoAToSheet', () => {
    it('should have correct interface structure', () => {
      const aoAToSheet: AoAToSheet = {
        data: [
          ['Name', 'Age', 'Email'],
          ['John', 30, 'john@example.com'],
          ['Jane', 25, 'jane@example.com'],
        ],
        header: ['Name', 'Age', 'Email'],
        filename: 'users.xlsx',
        write2excelOpts: {},
      };

      expect(aoAToSheet.data).toHaveLength(3);
      expect(aoAToSheet.data[0]).toEqual(['Name', 'Age', 'Email']);
      expect(aoAToSheet.header).toEqual(['Name', 'Age', 'Email']);
      expect(aoAToSheet.filename).toBe('users.xlsx');
      expect(aoAToSheet.write2excelOpts).toEqual({});
    });

    it('should support optional properties', () => {
      const aoAToSheet: AoAToSheet = {
        data: [
          ['Name', 'Age'],
          ['John', 30],
        ],
      };

      expect(aoAToSheet.data).toHaveLength(2);
      expect(aoAToSheet.header).toBeUndefined();
      expect(aoAToSheet.filename).toBeUndefined();
      expect(aoAToSheet.write2excelOpts).toBeUndefined();
    });

    it('should support generic type', () => {
      const aoAToSheet: AoAToSheet<string | number> = {
        data: [
          ['Name', 'Age', 'Score'],
          ['John', 30, 95.5],
          ['Jane', 25, 88.0],
        ],
        filename: 'scores.xlsx',
      };

      expect(aoAToSheet.data[0]).toEqual(['Name', 'Age', 'Score']);
      expect(aoAToSheet.data[1][0]).toBe('John');
      expect(aoAToSheet.data[1][1]).toBe(30);
      expect(aoAToSheet.data[1][2]).toBe(95.5);
    });
  });

  describe('ExportModalResult', () => {
    it('should have correct interface structure', () => {
      const result: ExportModalResult = {
        filename: 'export.xlsx',
        bookType: 'xlsx',
      };

      expect(result.filename).toBe('export.xlsx');
      expect(result.bookType).toBe('xlsx');
    });

    it('should support different book types', () => {
      const result: ExportModalResult = {
        filename: 'export.csv',
        bookType: 'csv',
      };

      expect(result.filename).toBe('export.csv');
      expect(result.bookType).toBe('csv');
    });

    it('should support different filename formats', () => {
      const result: ExportModalResult = {
        filename: 'data-2023-09-27.xlsx',
        bookType: 'xlsx',
      };

      expect(result.filename).toBe('data-2023-09-27.xlsx');
      expect(result.bookType).toBe('xlsx');
    });
  });
});
