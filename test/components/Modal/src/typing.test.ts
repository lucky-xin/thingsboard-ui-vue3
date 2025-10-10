import { describe, it, expect, vi } from 'vitest';
import {
  ModalMethods,
  RegisterFn,
  ReturnMethods,
  UseModalReturnType,
  ReturnInnerMethods,
  UseModalInnerReturnType,
  ModalProps,
  ModalWrapperProps,
} from '/@/components/Modal/src/typing';

describe('components/Modal/src/typing', () => {
  describe('ModalMethods', () => {
    it('should have correct interface structure', () => {
      const methods: ModalMethods = {
        setModalProps: vi.fn(),
        emitOpen: vi.fn(),
        redoModalHeight: vi.fn(),
      };

      expect(methods.setModalProps).toBeInstanceOf(Function);
      expect(methods.emitOpen).toBeInstanceOf(Function);
      expect(methods.redoModalHeight).toBeInstanceOf(Function);
    });
  });

  describe('RegisterFn', () => {
    it('should be a function type', () => {
      const registerFn: RegisterFn = vi.fn();
      expect(registerFn).toBeInstanceOf(Function);
    });
  });

  describe('ReturnMethods', () => {
    it('should extend ModalMethods and have additional methods', () => {
      const methods: ReturnMethods = {
        setModalProps: vi.fn(),
        emitOpen: vi.fn(),
        redoModalHeight: vi.fn(),
        openModal: vi.fn(),
        closeModal: vi.fn(),
        getOpen: { value: true },
        setModalData: vi.fn(),
      };

      expect(methods.setModalProps).toBeInstanceOf(Function);
      expect(methods.openModal).toBeInstanceOf(Function);
      expect(methods.closeModal).toBeInstanceOf(Function);
      expect(methods.setModalData).toBeInstanceOf(Function);
    });
  });

  describe('UseModalReturnType', () => {
    it('should be a tuple type', () => {
      const returnType: UseModalReturnType = [vi.fn(), {} as ReturnMethods];
      expect(Array.isArray(returnType)).toBe(true);
      expect(returnType.length).toBe(2);
    });
  });

  describe('ReturnInnerMethods', () => {
    it('should have correct interface structure', () => {
      const methods: ReturnInnerMethods = {
        setModalProps: vi.fn(),
        emitOpen: vi.fn(),
        redoModalHeight: vi.fn(),
        closeModal: vi.fn(),
        changeLoading: vi.fn(),
        changeOkLoading: vi.fn(),
        getOpen: { value: true },
      };

      expect(methods.setModalProps).toBeInstanceOf(Function);
      expect(methods.closeModal).toBeInstanceOf(Function);
      expect(methods.changeLoading).toBeInstanceOf(Function);
      expect(methods.changeOkLoading).toBeInstanceOf(Function);
    });
  });

  describe('UseModalInnerReturnType', () => {
    it('should be a tuple type', () => {
      const returnType: UseModalInnerReturnType = [vi.fn(), {} as ReturnInnerMethods];
      expect(Array.isArray(returnType)).toBe(true);
      expect(returnType.length).toBe(2);
    });
  });

  describe('ModalProps', () => {
    it('should have correct interface structure', () => {
      const props: ModalProps = {
        minHeight: 100,
        height: 200,
        wrapperFooterOffset: 20,
        draggable: true,
        scrollTop: true,
        canFullscreen: true,
        defaultFullscreen: false,
        open: true,
        helpMessage: 'Help text',
        useWrapper: true,
        loading: false,
        loadingTip: 'Loading...',
        wrapperProps: {} as any,
        showOkBtn: true,
        showCancelBtn: true,
        closeFunc: vi.fn(),
        afterClose: vi.fn(),
        bodyStyle: { padding: '20px' },
        cancelText: 'Cancel',
        centered: true,
        closable: true,
        closeIcon: 'close',
        confirmLoading: false,
        destroyOnClose: false,
        footer: 'Footer content',
        getContainer: vi.fn(),
        mask: true,
        maskClosable: true,
        maskStyle: { backgroundColor: 'rgba(0,0,0,0.5)' },
        okText: 'OK',
        okType: 'primary',
        okAuth: 'admin',
        okButtonProps: {} as any,
        cancelButtonProps: {} as any,
        title: 'Modal Title',
        width: 520,
        wrapClassName: 'modal-wrap',
        zIndex: 1000,
      };

      expect(props.minHeight).toBe(100);
      expect(props.height).toBe(200);
      expect(props.draggable).toBe(true);
      expect(props.open).toBe(true);
      expect(props.loading).toBe(false);
      expect(props.showOkBtn).toBe(true);
      expect(props.showCancelBtn).toBe(true);
      expect(props.centered).toBe(true);
      expect(props.closable).toBe(true);
      expect(props.confirmLoading).toBe(false);
      expect(props.destroyOnClose).toBe(false);
      expect(props.mask).toBe(true);
      expect(props.maskClosable).toBe(true);
      expect(props.okType).toBe('primary');
      expect(props.width).toBe(520);
      expect(props.zIndex).toBe(1000);
    });
  });

  describe('ModalWrapperProps', () => {
    it('should have correct interface structure', () => {
      const props: ModalWrapperProps = {
        footerOffset: 20,
        loading: false,
        modalHeaderHeight: 55,
        modalFooterHeight: 53,
        minHeight: 100,
        height: 200,
        open: true,
        fullScreen: false,
        useWrapper: true,
      };

      expect(props.footerOffset).toBe(20);
      expect(props.loading).toBe(false);
      expect(props.modalHeaderHeight).toBe(55);
      expect(props.modalFooterHeight).toBe(53);
      expect(props.minHeight).toBe(100);
      expect(props.height).toBe(200);
      expect(props.open).toBe(true);
      expect(props.fullScreen).toBe(false);
      expect(props.useWrapper).toBe(true);
    });
  });
});
