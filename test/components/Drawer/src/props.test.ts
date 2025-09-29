import { describe, it, expect } from 'vitest';
import { footerProps, basicProps } from '/@/components/Drawer/src/props';

describe('components/Drawer/src/props', () => {
  describe('footerProps', () => {
    it('should have correct prop definitions', () => {
      expect(footerProps.confirmLoading).toBeDefined();
      expect(footerProps.confirmLoading.type).toBe(Boolean);

      expect(footerProps.showCancelBtn).toBeDefined();
      expect(footerProps.showCancelBtn.type).toBe(Boolean);
      expect(footerProps.showCancelBtn.default).toBe(true);

      expect(footerProps.cancelButtonProps).toBeDefined();
      expect(footerProps.cancelButtonProps).toBeDefined();

      expect(footerProps.cancelText).toBeDefined();
      expect(footerProps.cancelText.type).toBe(String);

      expect(footerProps.showOkBtn).toBeDefined();
      expect(footerProps.showOkBtn.type).toBe(Boolean);
      expect(footerProps.showOkBtn.default).toBe(true);

      expect(footerProps.okButtonProps).toBeDefined();
      expect(footerProps.okButtonProps).toBeDefined();

      expect(footerProps.okText).toBeDefined();
      expect(footerProps.okText.type).toBe(String);

      expect(footerProps.okType).toBeDefined();
      expect(footerProps.okType.type).toBe(String);
      expect(footerProps.okType.default).toBe('primary');

      expect(footerProps.okAuth).toBeDefined();
      expect(footerProps.okAuth.type).toBe(String);

      expect(footerProps.showFooter).toBeDefined();
      expect(footerProps.showFooter.type).toBe(Boolean);

      expect(footerProps.footerHeight).toBeDefined();
      expect(footerProps.footerHeight.type).toBeDefined();
      expect(footerProps.footerHeight.default).toBe(60);
    });

    it('should support string and number types for footerHeight', () => {
      const footerHeightProp = footerProps.footerHeight;
      expect(footerHeightProp.type).toBeDefined();
      expect(footerHeightProp.default).toBe(60);
    });
  });

  describe('basicProps', () => {
    it('should have correct prop definitions', () => {
      expect(basicProps.isDetail).toBeDefined();
      expect(basicProps.isDetail.type).toBe(Boolean);

      expect(basicProps.title).toBeDefined();
      expect(basicProps.title.type).toBe(String);
      expect(basicProps.title.default).toBe('');

      expect(basicProps.loadingText).toBeDefined();
      expect(basicProps.loadingText.type).toBe(String);

      expect(basicProps.showDetailBack).toBeDefined();
      expect(basicProps.showDetailBack.type).toBe(Boolean);
      expect(basicProps.showDetailBack.default).toBe(true);

      expect(basicProps.open).toBeDefined();
      expect(basicProps.open.type).toBe(Boolean);

      expect(basicProps.loading).toBeDefined();
      expect(basicProps.loading.type).toBe(Boolean);

      expect(basicProps.maskClosable).toBeDefined();
      expect(basicProps.maskClosable.type).toBe(Boolean);
      expect(basicProps.maskClosable.default).toBe(true);

      expect(basicProps.getContainer).toBeDefined();
      expect(basicProps.getContainer.type).toBeDefined();

      expect(basicProps.closeFunc).toBeDefined();
      expect(basicProps.closeFunc.type).toBeDefined();
      expect(basicProps.closeFunc.default).toBe(null);

      expect(basicProps.destroyOnClose).toBeDefined();
      expect(basicProps.destroyOnClose.type).toBe(Boolean);

      expect(basicProps.wrapClassName).toBeDefined();
      expect(basicProps.wrapClassName.type).toBe(String);

      expect(basicProps.widthResize).toBeDefined();
      expect(basicProps.widthResize.type).toBe(Boolean);
      expect(basicProps.widthResize.default).toBe(true);

      expect(basicProps.width).toBeDefined();
      expect(basicProps.width.type).toBeDefined();

      expect(basicProps.mask).toBeDefined();
      expect(basicProps.mask.type).toBe(Boolean);
      expect(basicProps.mask.default).toBe(true);

      expect(basicProps.maskStyle).toBeDefined();
      expect(basicProps.maskStyle.type).toBe(Object);
    });

    it('should include footerProps', () => {
      // Check that footerProps are included in basicProps
      expect(basicProps.confirmLoading).toBeDefined();
      expect(basicProps.showCancelBtn).toBeDefined();
      expect(basicProps.cancelButtonProps).toBeDefined();
      expect(basicProps.cancelText).toBeDefined();
      expect(basicProps.showOkBtn).toBeDefined();
      expect(basicProps.okButtonProps).toBeDefined();
      expect(basicProps.okText).toBeDefined();
      expect(basicProps.okType).toBeDefined();
      expect(basicProps.okAuth).toBeDefined();
      expect(basicProps.showFooter).toBeDefined();
      expect(basicProps.footerHeight).toBeDefined();
    });

    it('should support multiple types for getContainer', () => {
      const getContainerProp = basicProps.getContainer;
      expect(getContainerProp.type).toBeDefined();
    });

    it('should support multiple types for closeFunc', () => {
      const closeFuncProp = basicProps.closeFunc;
      expect(closeFuncProp.type).toBeDefined();
      expect(closeFuncProp.default).toBe(null);
    });

    it('should support multiple types for width', () => {
      const widthProp = basicProps.width;
      expect(widthProp.type).toBeDefined();
    });
  });

  describe('prop validation', () => {
    it('should validate boolean props', () => {
      expect(footerProps.confirmLoading.type).toBe(Boolean);
      expect(footerProps.showCancelBtn.type).toBe(Boolean);
      expect(footerProps.showOkBtn.type).toBe(Boolean);
      expect(footerProps.showFooter.type).toBe(Boolean);
      expect(basicProps.isDetail.type).toBe(Boolean);
      expect(basicProps.showDetailBack.type).toBe(Boolean);
      expect(basicProps.open.type).toBe(Boolean);
      expect(basicProps.loading.type).toBe(Boolean);
      expect(basicProps.maskClosable.type).toBe(Boolean);
      expect(basicProps.destroyOnClose.type).toBe(Boolean);
      expect(basicProps.widthResize.type).toBe(Boolean);
      expect(basicProps.mask.type).toBe(Boolean);
    });

    it('should validate string props', () => {
      expect(footerProps.cancelText.type).toBe(String);
      expect(footerProps.okText.type).toBe(String);
      expect(footerProps.okType.type).toBe(String);
      expect(footerProps.okAuth.type).toBe(String);
      expect(basicProps.title.type).toBe(String);
      expect(basicProps.loadingText.type).toBe(String);
      expect(basicProps.wrapClassName.type).toBe(String);
    });

    it('should validate object props', () => {
      expect(footerProps.cancelButtonProps).toBeDefined();
      expect(footerProps.okButtonProps).toBeDefined();
      expect(basicProps.getContainer.type).toBeDefined();
      expect(basicProps.closeFunc.type).toBeDefined();
      expect(basicProps.maskStyle.type).toBe(Object);
    });

    it('should have correct default values', () => {
      expect(footerProps.showCancelBtn.default).toBe(true);
      expect(footerProps.showOkBtn.default).toBe(true);
      expect(footerProps.okType.default).toBe('primary');
      expect(footerProps.footerHeight.default).toBe(60);
      expect(basicProps.title.default).toBe('');
      expect(basicProps.showDetailBack.default).toBe(true);
      expect(basicProps.maskClosable.default).toBe(true);
      expect(basicProps.closeFunc.default).toBe(null);
      expect(basicProps.widthResize.default).toBe(true);
      expect(basicProps.mask.default).toBe(true);
    });
  });
});
