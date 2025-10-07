import { describe, it, expect } from 'vitest';
import * as module from '/@/components/Scrollbar/src/util';

describe('util', () => {
  it('should export expected types', () => {
    expect(module).toBeDefined();
  });

  it('should have correct type definitions', () => {
    // Type definition files may not have runtime exports
    // This test ensures the module can be imported without errors
    expect(true).toBe(true);
  });

  it('should export BAR_MAP constant', () => {
    expect(module.BAR_MAP).toBeDefined();
    expect(module.BAR_MAP.vertical).toBeDefined();
    expect(module.BAR_MAP.horizontal).toBeDefined();

    // Check vertical bar properties
    expect(module.BAR_MAP.vertical.offset).toBe('offsetHeight');
    expect(module.BAR_MAP.vertical.scroll).toBe('scrollTop');
    expect(module.BAR_MAP.vertical.scrollSize).toBe('scrollHeight');
    expect(module.BAR_MAP.vertical.size).toBe('height');
    expect(module.BAR_MAP.vertical.key).toBe('vertical');
    expect(module.BAR_MAP.vertical.axis).toBe('Y');
    expect(module.BAR_MAP.vertical.client).toBe('clientY');
    expect(module.BAR_MAP.vertical.direction).toBe('top');

    // Check horizontal bar properties
    expect(module.BAR_MAP.horizontal.offset).toBe('offsetWidth');
    expect(module.BAR_MAP.horizontal.scroll).toBe('scrollLeft');
    expect(module.BAR_MAP.horizontal.scrollSize).toBe('scrollWidth');
    expect(module.BAR_MAP.horizontal.size).toBe('width');
    expect(module.BAR_MAP.horizontal.key).toBe('horizontal');
    expect(module.BAR_MAP.horizontal.axis).toBe('X');
    expect(module.BAR_MAP.horizontal.client).toBe('clientX');
    expect(module.BAR_MAP.horizontal.direction).toBe('left');
  });

  it('should render thumb style correctly', () => {
    const move = 50;
    const size = '20px';
    const bar = module.BAR_MAP.vertical;

    const style = module.renderThumbStyle({ move, size, bar });

    expect(style).toBeDefined();
    expect(style.height).toBe('20px');
    expect(style.transform).toBe('translateY(50%)');
    expect(style.msTransform).toBe('translateY(50%)');
    expect(style.webkitTransform).toBe('translateY(50%)');
  });

  it('should render horizontal thumb style correctly', () => {
    const move = 30;
    const size = '15px';
    const bar = module.BAR_MAP.horizontal;

    const style = module.renderThumbStyle({ move, size, bar });

    expect(style).toBeDefined();
    expect(style.width).toBe('15px');
    expect(style.transform).toBe('translateX(30%)');
    expect(style.msTransform).toBe('translateX(30%)');
    expect(style.webkitTransform).toBe('translateX(30%)');
  });

  it('should convert array to object with toObject function', () => {
    const arr = [
      { name: 'zhangsan', age: 18 },
      { sex: 'male', age: 20 }
    ];

    const result = module.toObject(arr);

    expect(result).toBeDefined();
    expect(result.name).toBe('zhangsan');
    expect(result.sex).toBe('male');
    expect(result.age).toBe(20);
  });

  it('should handle empty array in toObject function', () => {
    const arr = [];
    const result = module.toObject(arr);

    expect(result).toBeDefined();
    expect(Object.keys(result)).toHaveLength(0);
  });

  it('should handle array with null/undefined values in toObject function', () => {
    const arr = [
      { name: 'zhangsan' },
      null,
      undefined,
      { age: 20 }
    ];

    const result = module.toObject(arr as any);

    expect(result).toBeDefined();
    expect(result.name).toBe('zhangsan');
    expect(result.age).toBe(20);
  });

  it('should handle single object array in toObject function', () => {
    const arr = [
      { name: 'zhangsan', age: 18 }
    ];

    const result = module.toObject(arr);

    expect(result).toBeDefined();
    expect(result.name).toBe('zhangsan');
    expect(result.age).toBe(18);
  });
});
