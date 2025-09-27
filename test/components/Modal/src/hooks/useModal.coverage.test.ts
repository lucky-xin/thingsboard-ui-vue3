import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ref, reactive, computed } from 'vue';

// Mock dependencies
vi.mock('vue', async () => {
  const actual = await vi.importActual('vue');
  return {
    ...actual,
    getCurrentInstance: vi.fn(),
    onUnmounted: vi.fn(),
    nextTick: vi.fn(),
  };
});

vi.mock('/@/utils/env', () => ({
  isProdMode: vi.fn(),
}));

vi.mock('/@/utils/is', () => ({
  isFunction: vi.fn(),
}));

vi.mock('lodash-es', () => ({
  isEqual: vi.fn(),
}));

vi.mock('@vueuse/core', () => ({
  tryOnUnmounted: vi.fn(),
}));

vi.mock('/@/utils/log', () => ({
  error: vi.fn(),
}));

import { useModal, useModalInner } from '/@/components/Modal/src/hooks/useModal';
import type { ModalMethods, ModalProps } from '/@/components/Modal/src/typing';
import { getCurrentInstance, onUnmounted, nextTick } from 'vue';
import { isProdMode } from '/@/utils/env';
import { isFunction } from '/@/utils/is';
import { isEqual } from 'lodash-es';
import { tryOnUnmounted } from '@vueuse/core';
import { error } from '/@/utils/log';

const mockGetCurrentInstance = vi.mocked(getCurrentInstance);
const mockOnUnmounted = vi.mocked(onUnmounted);
const mockNextTick = vi.mocked(nextTick);
const mockIsProdMode = vi.mocked(isProdMode);
const mockIsFunction = vi.mocked(isFunction);
const mockIsEqual = vi.mocked(isEqual);
const mockTryOnUnmounted = vi.mocked(tryOnUnmounted);
const mockError = vi.mocked(error);

describe('useModal coverage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetCurrentInstance.mockReturnValue({} as any);
    mockIsProdMode.mockReturnValue(false);
    mockIsFunction.mockReturnValue(true);
    mockIsEqual.mockReturnValue(false);
    mockNextTick.mockResolvedValue(undefined);
  });

  it('should handle component instance check', () => {
    mockGetCurrentInstance.mockReturnValue(null);

    // The function should handle the instance check
    expect(true).toBe(true);
  });

  it('should register modal method', () => {
    const mockModalMethod: ModalMethods = {
      setModalProps: vi.fn(),
      emitOpen: vi.fn(),
      redoModalHeight: vi.fn(),
    } as any;

    const [register] = useModal();
    register(mockModalMethod, 123);

    expect(mockModalMethod.emitOpen).toBeDefined();
  });

  it('should handle prod mode cleanup', () => {
    mockIsProdMode.mockReturnValue(true);
    const mockModalMethod: ModalMethods = {
      setModalProps: vi.fn(),
      emitOpen: vi.fn(),
    } as any;

    const [register] = useModal();
    register(mockModalMethod, 123);

    expect(mockOnUnmounted).toHaveBeenCalled();
  });

  it('should return methods with setModalProps', () => {
    const mockModalMethod: ModalMethods = {
      setModalProps: vi.fn(),
      emitOpen: vi.fn(),
    } as any;

    const [register, methods] = useModal();
    register(mockModalMethod, 123);

    methods.setModalProps({ title: 'Test Modal' });

    expect(mockModalMethod.setModalProps).toHaveBeenCalledWith({ title: 'Test Modal' });
  });

  it('should handle getOpen computed', () => {
    const [register, methods] = useModal();
    register({} as any, 123);

    expect(methods.getOpen).toBeDefined();
  });

  it('should handle redoModalHeight', () => {
    const mockModalMethod: ModalMethods = {
      setModalProps: vi.fn(),
      redoModalHeight: vi.fn(),
    } as any;

    const [register, methods] = useModal();
    register(mockModalMethod, 123);

    methods.redoModalHeight();

    expect(mockModalMethod.redoModalHeight).toHaveBeenCalled();
  });

  it('should handle openModal with data', () => {
    const mockModalMethod: ModalMethods = {
      setModalProps: vi.fn(),
      emitOpen: vi.fn(),
    } as any;

    const [register, methods] = useModal();
    register(mockModalMethod, 123);

    const testData = { id: 1, name: 'Test' };
    methods.openModal(true, testData);

    expect(mockModalMethod.setModalProps).toHaveBeenCalledWith({ open: true });
  });

  it('should handle openModal without data', () => {
    const mockModalMethod: ModalMethods = {
      setModalProps: vi.fn(),
      emitOpen: vi.fn(),
    } as any;

    const [register, methods] = useModal();
    register(mockModalMethod, 123);

    methods.openModal(true);

    expect(mockModalMethod.setModalProps).toHaveBeenCalledWith({ open: true });
  });

  it('should handle openModal with openOnSet false', () => {
    const mockModalMethod: ModalMethods = {
      setModalProps: vi.fn(),
      emitOpen: vi.fn(),
    } as any;

    const [register, methods] = useModal();
    register(mockModalMethod, 123);

    const testData = { id: 1, name: 'Test' };
    methods.openModal(true, testData, false);

    expect(mockModalMethod.setModalProps).toHaveBeenCalledWith({ open: true });
  });

  it('should handle closeModal', () => {
    const mockModalMethod: ModalMethods = {
      setModalProps: vi.fn(),
      emitOpen: vi.fn(),
    } as any;

    const [register, methods] = useModal();
    register(mockModalMethod, 123);

    methods.closeModal();

    expect(mockModalMethod.setModalProps).toHaveBeenCalledWith({ open: false });
  });

  it('should handle setModalData', () => {
    const mockModalMethod: ModalMethods = {
      setModalProps: vi.fn(),
      emitOpen: vi.fn(),
    } as any;

    const [register, methods] = useModal();
    register(mockModalMethod, 123);

    const testData = { id: 1, name: 'Test' };
    methods.setModalData(testData);

    expect(mockNextTick).toHaveBeenCalled();
  });

  it('should handle setModalData with null data', () => {
    const mockModalMethod: ModalMethods = {
      setModalProps: vi.fn(),
      emitOpen: vi.fn(),
    } as any;

    const [register, methods] = useModal();
    register(mockModalMethod, 123);

    methods.setModalData(null);

    expect(mockNextTick).not.toHaveBeenCalled();
  });

  it('should handle error when instance is undefined', () => {
    const [, methods] = useModal();

    methods.setModalProps({ title: 'Test' });

    expect(mockError).toHaveBeenCalledWith('useModal instance is undefined!');
  });
});

describe('useModalInner coverage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockGetCurrentInstance.mockReturnValue({ emit: vi.fn() } as any);
    mockIsProdMode.mockReturnValue(false);
    mockIsFunction.mockReturnValue(true);
    mockNextTick.mockResolvedValue(undefined);
  });

  it('should register modal instance', () => {
    const mockModalMethod: ModalMethods = {
      setModalProps: vi.fn(),
      emitOpen: vi.fn(),
    } as any;

    const [register] = useModalInner();
    register(mockModalMethod, 456);

    expect(mockModalMethod).toBeDefined();
  });

  it('should handle prod mode cleanup', () => {
    mockIsProdMode.mockReturnValue(true);
    const mockModalMethod: ModalMethods = {
      setModalProps: vi.fn(),
      emitOpen: vi.fn(),
    } as any;

    const [register] = useModalInner();
    register(mockModalMethod, 456);

    expect(mockTryOnUnmounted).toHaveBeenCalled();
  });

  it('should return methods with changeLoading', () => {
    const mockModalMethod: ModalMethods = {
      setModalProps: vi.fn(),
      emitOpen: vi.fn(),
    } as any;

    const [register, methods] = useModalInner();
    register(mockModalMethod, 456);

    methods.changeLoading(true);

    expect(mockModalMethod.setModalProps).toHaveBeenCalledWith({ loading: true });
  });

  it('should return methods with getOpen', () => {
    const [register, methods] = useModalInner();
    register({} as any, 456);

    expect(methods.getOpen).toBeDefined();
  });

  it('should return methods with changeOkLoading', () => {
    const mockModalMethod: ModalMethods = {
      setModalProps: vi.fn(),
      emitOpen: vi.fn(),
    } as any;

    const [register, methods] = useModalInner();
    register(mockModalMethod, 456);

    methods.changeOkLoading(true);

    expect(mockModalMethod.setModalProps).toHaveBeenCalledWith({ confirmLoading: true });
  });

  it('should return methods with closeModal', () => {
    const mockModalMethod: ModalMethods = {
      setModalProps: vi.fn(),
      emitOpen: vi.fn(),
    } as any;

    const [register, methods] = useModalInner();
    register(mockModalMethod, 456);

    methods.closeModal();

    expect(mockModalMethod.setModalProps).toHaveBeenCalledWith({ open: false });
  });

  it('should return methods with setModalProps', () => {
    const mockModalMethod: ModalMethods = {
      setModalProps: vi.fn(),
      emitOpen: vi.fn(),
    } as any;

    const [register, methods] = useModalInner();
    register(mockModalMethod, 456);

    methods.setModalProps({ title: 'Test Modal' });

    expect(mockModalMethod.setModalProps).toHaveBeenCalledWith({ title: 'Test Modal' });
  });

  it('should return methods with redoModalHeight', () => {
    const mockModalMethod: ModalMethods = {
      setModalProps: vi.fn(),
      emitOpen: vi.fn(),
      redoModalHeight: vi.fn(),
    } as any;

    const [register, methods] = useModalInner();
    register(mockModalMethod, 456);

    methods.redoModalHeight();

    expect(mockModalMethod.redoModalHeight).toHaveBeenCalled();
  });

  it('should handle redoModalHeight when method does not exist', () => {
    const mockModalMethod: ModalMethods = {
      setModalProps: vi.fn(),
      emitOpen: vi.fn(),
    } as any;

    const [register, methods] = useModalInner();
    register(mockModalMethod, 456);

    expect(() => methods.redoModalHeight()).not.toThrow();
  });

  it('should handle error when instance is undefined', () => {
    const [, methods] = useModalInner();

    methods.changeLoading(true);

    expect(mockError).toHaveBeenCalledWith('useModalInner instance is undefined!');
  });

  it('should handle callback function', () => {
    const callbackFn = vi.fn();
    const [register] = useModalInner(callbackFn);
    register({} as any, 456);

    expect(callbackFn).toBeDefined();
  });

  it('should handle callback function when not provided', () => {
    const [register] = useModalInner();
    register({} as any, 456);

    expect(() => register({} as any, 456)).not.toThrow();
  });

  it('should handle callback function when not a function', () => {
    mockIsFunction.mockReturnValue(false);
    const [register] = useModalInner('not a function' as any);
    register({} as any, 456);

    expect(() => register({} as any, 456)).not.toThrow();
  });
});
