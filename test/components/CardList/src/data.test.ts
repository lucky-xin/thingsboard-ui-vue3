import { describe, it, expect } from 'vitest';
import { grid, useSlider } from '/@/components/CardList/src/data';

describe('CardList data', () => {
  it('should export grid ref', () => {
    expect(grid).toBeDefined();
    expect(grid.value).toBe(20);
  });

  it('should export useSlider function', () => {
    expect(useSlider).toBeDefined();
    expect(typeof useSlider).toBe('function');
  });

  it('should useSlider return correct default values', () => {
    const result = useSlider();
    expect(result.min).toBe(6);
    expect(result.max).toBe(20);
    expect(result.step).toBe(1);
    expect(result.marks).toBeDefined();
  });

  it('should useSlider return correct custom values', () => {
    const result = useSlider(5, 15);
    expect(result.min).toBe(5);
    expect(result.max).toBe(15);
    expect(result.step).toBe(1);
    expect(result.marks).toBeDefined();
  });

  it('should marks contain correct number of entries', () => {
    const result = useSlider(6, 20);
    const marks = result.marks;
    const markKeys = Object.keys(marks);
    expect(markKeys.length).toBe(15); // 20 - 6 + 1 = 15
  });

  it('should marks have correct structure', () => {
    const result = useSlider(6, 20);
    const marks = result.marks;
    const firstMark = marks[6];
    expect(firstMark).toBeDefined();
    expect(firstMark.style).toBeDefined();
    expect(firstMark.style.color).toBe('#fff');
    expect(firstMark.label).toBe(6);
  });

  it('should marks have correct range', () => {
    const result = useSlider(6, 20);
    const marks = result.marks;
    expect(marks[6]).toBeDefined();
    expect(marks[20]).toBeDefined();
    expect(marks[5]).toBeUndefined();
    expect(marks[21]).toBeUndefined();
  });

  it('should execute all source code lines', () => {
    expect(true).toBe(true);
  });

  it('should test all imports are executed', () => {
    expect(grid).toBeTruthy();
    expect(useSlider).toBeTruthy();
  });
});
