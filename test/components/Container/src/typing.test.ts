import { describe, it, expect } from 'vitest';
import type { 
  ScrollType, 
  CollapseContainerOptions, 
  ScrollContainerOptions, 
  ScrollActionType 
} from '/@/components/Container/src/typing';

describe('components/Container/src/typing', () => {
  describe('ScrollType type', () => {
    it('should accept valid scroll type values', () => {
      const scrollTypes: ScrollType[] = ['default', 'main'];
      
      scrollTypes.forEach(type => {
        const scrollType: ScrollType = type;
        expect(scrollType).toBe(type);
      });
    });

    it('should handle default scroll type', () => {
      const scrollType: ScrollType = 'default';
      expect(scrollType).toBe('default');
    });

    it('should handle main scroll type', () => {
      const scrollType: ScrollType = 'main';
      expect(scrollType).toBe('main');
    });
  });

  describe('CollapseContainerOptions interface', () => {
    it('should define all optional properties', () => {
      const options: CollapseContainerOptions = {
        canExpand: true,
        expand: false,
        title: 'Test Title',
        helpMessage: 'Help message',
      };

      expect(options.canExpand).toBe(true);
      expect(options.expand).toBe(false);
      expect(options.title).toBe('Test Title');
      expect(options.helpMessage).toBe('Help message');
    });

    it('should allow partial options', () => {
      const options: CollapseContainerOptions = {
        title: 'Partial Title',
      };

      expect(options.title).toBe('Partial Title');
      expect(options.canExpand).toBeUndefined();
      expect(options.expand).toBeUndefined();
      expect(options.helpMessage).toBeUndefined();
    });

    it('should handle array helpMessage', () => {
      const options: CollapseContainerOptions = {
        helpMessage: ['Help 1', 'Help 2'],
      };

      expect(options.helpMessage).toEqual(['Help 1', 'Help 2']);
    });

    it('should handle string helpMessage', () => {
      const options: CollapseContainerOptions = {
        helpMessage: 'Single help message',
      };

      expect(options.helpMessage).toBe('Single help message');
    });

    it('should allow empty object', () => {
      const options: CollapseContainerOptions = {};
      expect(Object.keys(options)).toHaveLength(0);
    });
  });

  describe('ScrollContainerOptions interface', () => {
    it('should define all optional properties', () => {
      const options: ScrollContainerOptions = {
        enableScroll: true,
        type: 'default',
      };

      expect(options.enableScroll).toBe(true);
      expect(options.type).toBe('default');
    });

    it('should allow partial options', () => {
      const options: ScrollContainerOptions = {
        enableScroll: false,
      };

      expect(options.enableScroll).toBe(false);
      expect(options.type).toBeUndefined();
    });

    it('should handle main scroll type', () => {
      const options: ScrollContainerOptions = {
        type: 'main',
      };

      expect(options.type).toBe('main');
    });

    it('should allow empty object', () => {
      const options: ScrollContainerOptions = {};
      expect(Object.keys(options)).toHaveLength(0);
    });
  });

  describe('ScrollActionType type', () => {
    it('should define scroll action methods', () => {
      // This is a type definition, so we test the structure
      const mockScrollAction: ScrollActionType = {
        scrollBottom: () => {},
        getScrollWrap: () => null,
        scrollTo: (top: number) => {},
      };

      expect(typeof mockScrollAction.scrollBottom).toBe('function');
      expect(typeof mockScrollAction.getScrollWrap).toBe('function');
      expect(typeof mockScrollAction.scrollTo).toBe('function');
    });

    it('should handle scrollTo with number parameter', () => {
      const mockScrollAction: ScrollActionType = {
        scrollBottom: () => {},
        getScrollWrap: () => null,
        scrollTo: (top: number) => {
          expect(typeof top).toBe('number');
        },
      };

      mockScrollAction.scrollTo(100);
    });

    it('should handle getScrollWrap returning HTMLElement or null', () => {
      const mockScrollAction: ScrollActionType = {
        scrollBottom: () => {},
        getScrollWrap: () => null,
        scrollTo: (top: number) => {},
      };

      const result = mockScrollAction.getScrollWrap();
      expect(result).toBeNull();
    });
  });
});