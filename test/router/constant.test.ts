import { describe, it, expect, vi } from 'vitest';

describe('router/constant', () => {
  it('should export REDIRECT_NAME constant', async () => {
    const { REDIRECT_NAME } = await import('/@/router/constant');
    expect(REDIRECT_NAME).toBe('Redirect');
  });

  it('should export PARENT_LAYOUT_NAME constant', async () => {
    const { PARENT_LAYOUT_NAME } = await import('/@/router/constant');
    expect(PARENT_LAYOUT_NAME).toBe('ParentLayout');
  });

  it('should export PAGE_NOT_FOUND_NAME constant', async () => {
    const { PAGE_NOT_FOUND_NAME } = await import('/@/router/constant');
    expect(PAGE_NOT_FOUND_NAME).toBe('PageNotFound');
  });

  it('should export LAYOUT function', async () => {
    const { LAYOUT } = await import('/@/router/constant');
    expect(LAYOUT).toBeDefined();
    expect(typeof LAYOUT).toBe('function');
  });

  it('should export AUTH_LAYOUT function', async () => {
    const { AUTH_LAYOUT } = await import('/@/router/constant');
    expect(AUTH_LAYOUT).toBeDefined();
    expect(typeof AUTH_LAYOUT).toBe('function');
  });

  it('should export IFRAME_BLANK function', async () => {
    const { IFRAME_BLANK } = await import('/@/router/constant');
    expect(IFRAME_BLANK).toBeDefined();
    expect(typeof IFRAME_BLANK).toBe('function');
  });

  it('should export IFRAME_SIMPLE function', async () => {
    const { IFRAME_SIMPLE } = await import('/@/router/constant');
    expect(IFRAME_SIMPLE).toBeDefined();
    expect(typeof IFRAME_SIMPLE).toBe('function');
  });

  it('should export EXCEPTION_COMPONENT function', async () => {
    const { EXCEPTION_COMPONENT } = await import('/@/router/constant');
    expect(EXCEPTION_COMPONENT).toBeDefined();
    expect(typeof EXCEPTION_COMPONENT).toBe('function');
  });

  it('should export getParentLayout function', async () => {
    const { getParentLayout } = await import('/@/router/constant');
    expect(getParentLayout).toBeDefined();
    expect(typeof getParentLayout).toBe('function');
  });

  it('should return parent layout component from getParentLayout', async () => {
    const { getParentLayout, PARENT_LAYOUT_NAME } = await import('/@/router/constant');
    
    const layoutComponent = getParentLayout('test');
    expect(layoutComponent).toBeDefined();
    expect(typeof layoutComponent).toBe('function');
    
    // Test the returned promise
    const result = await layoutComponent();
    expect(result).toEqual({
      name: PARENT_LAYOUT_NAME,
    });
  });

  it('should return parent layout component from getParentLayout without name', async () => {
    const { getParentLayout, PARENT_LAYOUT_NAME } = await import('/@/router/constant');
    
    const layoutComponent = getParentLayout();
    expect(layoutComponent).toBeDefined();
    expect(typeof layoutComponent).toBe('function');
    
    // Test the returned promise
    const result = await layoutComponent();
    expect(result).toEqual({
      name: PARENT_LAYOUT_NAME,
    });
  });
});
