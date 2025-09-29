import { describe, it, expect } from 'vitest';
import {
  DrawerInstance,
  ReturnMethods,
  RegisterFn,
  ReturnInnerMethods,
  UseDrawerReturnType,
  UseDrawerInnerReturnType,
  DrawerFooterProps,
} from '/@/components/Drawer/src/typing';

describe('components/Drawer/src/typing', () => {
  describe('DrawerInstance', () => {
    it('should have correct interface structure', () => {
      const instance: DrawerInstance = {
        setDrawerProps: vi.fn(),
        emitOpen: vi.fn(),
      };

      expect(instance.setDrawerProps).toBeInstanceOf(Function);
      expect(instance.emitOpen).toBeInstanceOf(Function);
    });
  });

  describe('ReturnMethods', () => {
    it('should extend DrawerInstance and have additional methods', () => {
      const methods: ReturnMethods = {
        setDrawerProps: vi.fn(),
        emitOpen: vi.fn(),
        openDrawer: vi.fn(),
        closeDrawer: vi.fn(),
        getOpen: { value: true },
        setDrawerData: vi.fn(),
      };

      expect(methods.setDrawerProps).toBeInstanceOf(Function);
      expect(methods.openDrawer).toBeInstanceOf(Function);
      expect(methods.closeDrawer).toBeInstanceOf(Function);
      expect(methods.setDrawerData).toBeInstanceOf(Function);
    });
  });

  describe('RegisterFn', () => {
    it('should be a function type', () => {
      const registerFn: RegisterFn = vi.fn();
      expect(registerFn).toBeInstanceOf(Function);
    });
  });

  describe('ReturnInnerMethods', () => {
    it('should have correct interface structure', () => {
      const methods: ReturnInnerMethods = {
        setDrawerProps: vi.fn(),
        emitOpen: vi.fn(),
        closeDrawer: vi.fn(),
        changeLoading: vi.fn(),
        changeOkLoading: vi.fn(),
        getOpen: { value: true },
      };

      expect(methods.setDrawerProps).toBeInstanceOf(Function);
      expect(methods.closeDrawer).toBeInstanceOf(Function);
      expect(methods.changeLoading).toBeInstanceOf(Function);
      expect(methods.changeOkLoading).toBeInstanceOf(Function);
    });
  });

  describe('UseDrawerReturnType', () => {
    it('should be a tuple type', () => {
      const returnType: UseDrawerReturnType = [vi.fn(), {} as ReturnMethods];
      expect(Array.isArray(returnType)).toBe(true);
      expect(returnType.length).toBe(2);
    });
  });

  describe('UseDrawerInnerReturnType', () => {
    it('should be a tuple type', () => {
      const returnType: UseDrawerInnerReturnType = [vi.fn(), {} as ReturnInnerMethods];
      expect(Array.isArray(returnType)).toBe(true);
      expect(returnType.length).toBe(2);
    });
  });

  describe('DrawerFooterProps', () => {
    it('should have correct interface structure', () => {
      const props: DrawerFooterProps = {
        showOkBtn: true,
        showCancelBtn: true,
        cancelText: 'Cancel',
        okText: 'OK',
        okType: 'primary',
        okButtonProps: {},
        cancelButtonProps: {},
        showFooter: true,
        footerHeight: 60,
        confirmLoading: false,
      };

      expect(props.showOkBtn).toBe(true);
      expect(props.showCancelBtn).toBe(true);
      expect(props.cancelText).toBe('Cancel');
      expect(props.okText).toBe('OK');
      expect(props.okType).toBe('primary');
      expect(props.showFooter).toBe(true);
      expect(props.footerHeight).toBe(60);
      expect(props.confirmLoading).toBe(false);
    });
  });
});
