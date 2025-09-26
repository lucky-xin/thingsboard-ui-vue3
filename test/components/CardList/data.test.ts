import { describe, it, expect } from 'vitest';
import { grid, useSlider } from '/@/components/CardList/src/data';

describe('components/CardList/data', () => {
  it('should export grid ref with default value', () => {
    expect(grid).toBeDefined();
    expect(grid.value).toBe(20);
  });

  it('should allow updating grid value', () => {
    const originalValue = grid.value;
    grid.value = 15;
    expect(grid.value).toBe(15);
    
    // Reset to original value
    grid.value = originalValue;
  });

  it('should have useSlider function with default parameters', () => {
    const slider = useSlider();
    
    expect(slider.min).toBe(6);
    expect(slider.max).toBe(20);
    expect(slider.step).toBe(1);
    expect(slider.marks).toBeDefined();
    expect(typeof slider.marks).toBe('object');
  });

  it('should have useSlider function with custom parameters', () => {
    const slider = useSlider(10, 30);
    
    expect(slider.min).toBe(10);
    expect(slider.max).toBe(30);
    expect(slider.step).toBe(1);
    expect(slider.marks).toBeDefined();
  });

  it('should generate correct marks object', () => {
    const slider = useSlider(6, 10);
    const marks = slider.marks;
    
    // Should have marks for 6, 7, 8, 9, 10
    expect(marks[6]).toBeDefined();
    expect(marks[7]).toBeDefined();
    expect(marks[8]).toBeDefined();
    expect(marks[9]).toBeDefined();
    expect(marks[10]).toBeDefined();
    
    // Should not have marks outside range
    expect(marks[5]).toBeUndefined();
    expect(marks[11]).toBeUndefined();
    
    // Check mark structure
    expect(marks[6].style).toEqual({ color: '#fff' });
    expect(marks[6].label).toBe(6);
    expect(marks[10].label).toBe(10);
  });

  it('should handle edge cases in useSlider', () => {
    const slider = useSlider(1, 3);
    const marks = slider.marks;
    
    expect(slider.min).toBe(1);
    expect(slider.max).toBe(3);
    expect(marks[1]).toBeDefined();
    expect(marks[2]).toBeDefined();
    expect(marks[3]).toBeDefined();
  });
});
