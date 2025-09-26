import { describe, it, expect } from 'vitest';

const entries = [
  '/@/components/WangEditor',
  '/@/components/Time',
  '/@/components/Verify',
  '/@/components/ValidCode',
  '/@/components/StrengthMeter',
  '/@/components/Transition',
  '/@/components/SimpleMenu',
  '/@/components/Table',
  '/@/components/Tree',
  '/@/components/Copyright',
  '/@/components/Preview',
  '/@/components/Dialog',
  '/@/components/CountTo',
  '/@/components/ColorPicker',
  '/@/components/Qrcode',
  '/@/components/Scrollbar',
  '/@/components/CountDown',
  '/@/components/ContextMenu',
  '/@/components/Dropdown',
  '/@/components/Page',
  '/@/components/Authentication',
  '/@/components/Loading',
  '/@/components/Menu',
  '/@/components/CollapseForm',
  '/@/components/Excel',
  '/@/components/Form',
  '/@/components/Basic',
  '/@/components/CodeEditor',
  '/@/components/Resizer',
  '/@/components/Cropper',
  '/@/components/ClickOutSide',
  '/@/components/Button',
  '/@/components/Authority',
  '/@/components/Modal',
  '/@/components/Container',
  '/@/components/Description',
  '/@/components/Application',
  '/@/components/Icon',
];

describe('components index more coverage', () => {
  for (const path of entries) {
    it(`${path} should load`, async () => {
      const mod = await import(path);
      expect(mod).toBeDefined();
      // 至少应当有一个导出
      expect(Object.keys(mod).length).toBeGreaterThan(0);
    });
  }
});


