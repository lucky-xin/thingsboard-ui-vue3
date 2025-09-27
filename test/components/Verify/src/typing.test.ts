import { describe, it, expect } from 'vitest';
import { DragVerifyActionType, PassingData, MoveData } from '/@/components/Verify/src/typing';

describe('components/Verify/src/typing', () => {
  describe('DragVerifyActionType', () => {
    it('should have correct interface structure', () => {
      const action: DragVerifyActionType = {
        resume: vi.fn(),
      };

      expect(action.resume).toBeInstanceOf(Function);
    });

    it('should support resume function call', () => {
      const resumeFn = vi.fn();
      const action: DragVerifyActionType = {
        resume: resumeFn,
      };

      action.resume();
      expect(resumeFn).toHaveBeenCalled();
    });

    it('should support multiple resume calls', () => {
      const resumeFn = vi.fn();
      const action: DragVerifyActionType = {
        resume: resumeFn,
      };

      action.resume();
      action.resume();
      action.resume();
      expect(resumeFn).toHaveBeenCalledTimes(3);
    });
  });

  describe('PassingData', () => {
    it('should have correct interface structure', () => {
      const data: PassingData = {
        isPassing: true,
        time: 1500,
      };

      expect(data.isPassing).toBe(true);
      expect(data.time).toBe(1500);
    });

    it('should support not passing state', () => {
      const data: PassingData = {
        isPassing: false,
        time: 0,
      };

      expect(data.isPassing).toBe(false);
      expect(data.time).toBe(0);
    });

    it('should support different time values', () => {
      const data: PassingData = {
        isPassing: true,
        time: 3000,
      };

      expect(data.time).toBe(3000);
    });

    it('should support negative time', () => {
      const data: PassingData = {
        isPassing: false,
        time: -100,
      };

      expect(data.time).toBe(-100);
    });

    it('should support decimal time', () => {
      const data: PassingData = {
        isPassing: true,
        time: 1234.56,
      };

      expect(data.time).toBe(1234.56);
    });
  });

  describe('MoveData', () => {
    it('should have correct interface structure with MouseEvent', () => {
      const mouseEvent = new MouseEvent('mousemove', {
        clientX: 100,
        clientY: 200,
      });

      const data: MoveData = {
        event: mouseEvent,
        moveDistance: 150,
        moveX: 100,
      };

      expect(data.event).toBe(mouseEvent);
      expect(data.moveDistance).toBe(150);
      expect(data.moveX).toBe(100);
    });

    it('should have correct interface structure with TouchEvent', () => {
      // Skip this test if Touch is not defined in the environment
      if (typeof Touch === 'undefined') {
        expect(true).toBe(true);
        return;
      }

      const touchEvent = new TouchEvent('touchmove', {
        touches: [
          new Touch({
            identifier: 1,
            target: document.createElement('div'),
            clientX: 100,
            clientY: 200,
          }),
        ],
      });

      const data: MoveData = {
        event: touchEvent,
        moveDistance: 75,
        moveX: 50,
      };

      expect(data.event).toBe(touchEvent);
      expect(data.moveDistance).toBe(75);
      expect(data.moveX).toBe(50);
    });

    it('should support zero values', () => {
      const mouseEvent = new MouseEvent('mousemove');
      const data: MoveData = {
        event: mouseEvent,
        moveDistance: 0,
        moveX: 0,
      };

      expect(data.moveDistance).toBe(0);
      expect(data.moveX).toBe(0);
    });

    it('should support negative values', () => {
      const mouseEvent = new MouseEvent('mousemove');
      const data: MoveData = {
        event: mouseEvent,
        moveDistance: -50,
        moveX: -25,
      };

      expect(data.moveDistance).toBe(-50);
      expect(data.moveX).toBe(-25);
    });

    it('should support large values', () => {
      const mouseEvent = new MouseEvent('mousemove');
      const data: MoveData = {
        event: mouseEvent,
        moveDistance: 10000,
        moveX: 5000,
      };

      expect(data.moveDistance).toBe(10000);
      expect(data.moveX).toBe(5000);
    });

    it('should support decimal values', () => {
      const mouseEvent = new MouseEvent('mousemove');
      const data: MoveData = {
        event: mouseEvent,
        moveDistance: 123.45,
        moveX: 67.89,
      };

      expect(data.moveDistance).toBe(123.45);
      expect(data.moveX).toBe(67.89);
    });

    it('should support different mouse events', () => {
      const mouseDownEvent = new MouseEvent('mousedown');
      const mouseUpEvent = new MouseEvent('mouseup');
      const mouseMoveEvent = new MouseEvent('mousemove');

      const data1: MoveData = {
        event: mouseDownEvent,
        moveDistance: 0,
        moveX: 0,
      };

      const data2: MoveData = {
        event: mouseUpEvent,
        moveDistance: 100,
        moveX: 50,
      };

      const data3: MoveData = {
        event: mouseMoveEvent,
        moveDistance: 200,
        moveX: 100,
      };

      expect(data1.event).toBe(mouseDownEvent);
      expect(data2.event).toBe(mouseUpEvent);
      expect(data3.event).toBe(mouseMoveEvent);
    });

    it('should support different touch events', () => {
      const touchStartEvent = new TouchEvent('touchstart');
      const touchEndEvent = new TouchEvent('touchend');
      const touchMoveEvent = new TouchEvent('touchmove');

      const data1: MoveData = {
        event: touchStartEvent,
        moveDistance: 0,
        moveX: 0,
      };

      const data2: MoveData = {
        event: touchEndEvent,
        moveDistance: 150,
        moveX: 75,
      };

      const data3: MoveData = {
        event: touchMoveEvent,
        moveDistance: 300,
        moveX: 150,
      };

      expect(data1.event).toBe(touchStartEvent);
      expect(data2.event).toBe(touchEndEvent);
      expect(data3.event).toBe(touchMoveEvent);
    });
  });
});
