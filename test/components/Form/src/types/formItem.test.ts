import { describe, it, expect } from 'vitest';
import type { FormItem } from '/@/components/Form/src/types/formItem';

describe('components/Form/src/types/formItem', () => {
  describe('FormItem interface', () => {
    it('should define FormItem with all optional properties', () => {
      const formItem: FormItem = {
        colon: false,
        extra: 'Extra help text',
        hasFeedback: true,
        help: 'Help message',
        label: 'Field Label',
        required: true,
        validateStatus: 'success',
        htmlFor: 'input-field',
        labelAlign: 'left',
        name: 'fieldName',
        autoLink: true,
        validateFirst: false,
        validateTrigger: 'change',
      };

      expect(formItem.colon).toBe(false);
      expect(formItem.extra).toBe('Extra help text');
      expect(formItem.hasFeedback).toBe(true);
      expect(formItem.help).toBe('Help message');
      expect(formItem.label).toBe('Field Label');
      expect(formItem.required).toBe(true);
      expect(formItem.validateStatus).toBe('success');
      expect(formItem.htmlFor).toBe('input-field');
      expect(formItem.labelAlign).toBe('left');
      expect(formItem.name).toBe('fieldName');
      expect(formItem.autoLink).toBe(true);
      expect(formItem.validateFirst).toBe(false);
      expect(formItem.validateTrigger).toBe('change');
    });

    it('should support colon property as boolean', () => {
      const formItemTrue: FormItem = { colon: true };
      const formItemFalse: FormItem = { colon: false };

      expect(formItemTrue.colon).toBe(true);
      expect(formItemFalse.colon).toBe(false);
    });

    it('should support extra as string', () => {
      const formItem: FormItem = {
        extra: 'This is additional help text for the form field',
      };

      expect(formItem.extra).toBe('This is additional help text for the form field');
    });

    it('should support hasFeedback as boolean', () => {
      const formItemTrue: FormItem = { hasFeedback: true };
      const formItemFalse: FormItem = { hasFeedback: false };

      expect(formItemTrue.hasFeedback).toBe(true);
      expect(formItemFalse.hasFeedback).toBe(false);
    });

    it('should support help as string', () => {
      const formItem: FormItem = {
        help: 'Please enter a valid email address',
      };

      expect(formItem.help).toBe('Please enter a valid email address');
    });

    it('should support label as string', () => {
      const formItem: FormItem = {
        label: 'Email Address',
      };

      expect(formItem.label).toBe('Email Address');
    });

    it('should support labelCol property', () => {
      const formItem: FormItem = {
        labelCol: {
          span: 4,
          offset: 2,
          xs: { span: 24 },
          sm: { span: 6 },
        },
      };

      expect(formItem.labelCol).toEqual({
        span: 4,
        offset: 2,
        xs: { span: 24 },
        sm: { span: 6 },
      });
    });

    it('should support wrapperCol property', () => {
      const formItem: FormItem = {
        wrapperCol: {
          span: 20,
          offset: 4,
        },
      };

      expect(formItem.wrapperCol).toEqual({
        span: 20,
        offset: 4,
      });
    });

    it('should support colProps property', () => {
      const formItem: FormItem = {
        colProps: {
          span: 12,
          xs: 24,
          sm: 12,
          md: 8,
        },
      };

      expect(formItem.colProps).toEqual({
        span: 12,
        xs: 24,
        sm: 12,
        md: 8,
      });
    });

    it('should support required as boolean', () => {
      const formItemRequired: FormItem = { required: true };
      const formItemOptional: FormItem = { required: false };

      expect(formItemRequired.required).toBe(true);
      expect(formItemOptional.required).toBe(false);
    });

    it('should support all validateStatus values', () => {
      const statusEmpty: FormItem = { validateStatus: '' };
      const statusSuccess: FormItem = { validateStatus: 'success' };
      const statusWarning: FormItem = { validateStatus: 'warning' };
      const statusError: FormItem = { validateStatus: 'error' };
      const statusValidating: FormItem = { validateStatus: 'validating' };

      expect(statusEmpty.validateStatus).toBe('');
      expect(statusSuccess.validateStatus).toBe('success');
      expect(statusWarning.validateStatus).toBe('warning');
      expect(statusError.validateStatus).toBe('error');
      expect(statusValidating.validateStatus).toBe('validating');
    });

    it('should support htmlFor as string', () => {
      const formItem: FormItem = {
        htmlFor: 'username-input',
      };

      expect(formItem.htmlFor).toBe('username-input');
    });

    it('should support labelAlign values', () => {
      const labelAlignLeft: FormItem = { labelAlign: 'left' };
      const labelAlignRight: FormItem = { labelAlign: 'right' };

      expect(labelAlignLeft.labelAlign).toBe('left');
      expect(labelAlignRight.labelAlign).toBe('right');
    });

    it('should support name as string', () => {
      const formItem: FormItem = {
        name: 'user.email',
      };

      expect(formItem.name).toBe('user.email');
    });

    it('should support name as array of strings', () => {
      const formItem: FormItem = {
        name: ['user', 'contact', 'email'],
      };

      expect(formItem.name).toEqual(['user', 'contact', 'email']);
    });

    it('should support name as number', () => {
      const formItem: FormItem = {
        name: 0,
      };

      expect(formItem.name).toBe(0);
    });

    it('should support rules as single object', () => {
      const formItem: FormItem = {
        rules: {
          required: true,
          message: 'This field is required',
        },
      };

      expect(formItem.rules).toEqual({
        required: true,
        message: 'This field is required',
      });
    });

    it('should support rules as array of objects', () => {
      const formItem: FormItem = {
        rules: [
          { required: true, message: 'Required field' },
          { min: 5, message: 'Minimum 5 characters' },
          { pattern: /^[a-zA-Z]+$/, message: 'Only letters allowed' },
        ],
      };

      expect(Array.isArray(formItem.rules)).toBe(true);
      expect(formItem.rules).toHaveLength(3);
    });

    it('should support autoLink as boolean', () => {
      const formItemAutoLink: FormItem = { autoLink: true };
      const formItemNoAutoLink: FormItem = { autoLink: false };

      expect(formItemAutoLink.autoLink).toBe(true);
      expect(formItemNoAutoLink.autoLink).toBe(false);
    });

    it('should support validateFirst as boolean', () => {
      const formItemValidateFirst: FormItem = { validateFirst: true };
      const formItemNoValidateFirst: FormItem = { validateFirst: false };

      expect(formItemValidateFirst.validateFirst).toBe(true);
      expect(formItemNoValidateFirst.validateFirst).toBe(false);
    });

    it('should support validateTrigger as string', () => {
      const formItem: FormItem = {
        validateTrigger: 'blur',
      };

      expect(formItem.validateTrigger).toBe('blur');
    });

    it('should support validateTrigger as array of strings', () => {
      const formItem: FormItem = {
        validateTrigger: ['change', 'blur'],
      };

      expect(formItem.validateTrigger).toEqual(['change', 'blur']);
    });

    it('should support validateTrigger as false', () => {
      const formItem: FormItem = {
        validateTrigger: false,
      };

      expect(formItem.validateTrigger).toBe(false);
    });

    it('should support empty FormItem object', () => {
      const formItem: FormItem = {};

      expect(Object.keys(formItem)).toHaveLength(0);
    });

    it('should support complex validation rules', () => {
      const formItem: FormItem = {
        name: 'password',
        label: 'Password',
        required: true,
        hasFeedback: true,
        rules: [
          { required: true, message: 'Password is required' },
          { min: 8, message: 'Password must be at least 8 characters' },
          { 
            pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
            message: 'Password must contain uppercase, lowercase, number and special character' 
          },
        ],
        validateTrigger: ['change', 'blur'],
        validateFirst: true,
      };

      expect(formItem.name).toBe('password');
      expect(formItem.required).toBe(true);
      expect(Array.isArray(formItem.rules)).toBe(true);
      expect(formItem.rules).toHaveLength(3);
      expect(Array.isArray(formItem.validateTrigger)).toBe(true);
      expect(formItem.validateFirst).toBe(true);
    });

    it('should support responsive layout configuration', () => {
      const formItem: FormItem = {
        label: 'Responsive Field',
        labelCol: {
          xs: { span: 24 },
          sm: { span: 6 },
          md: { span: 4 },
          lg: { span: 3 },
          xl: { span: 2 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 18 },
          md: { span: 20 },
          lg: { span: 21 },
          xl: { span: 22 },
        },
      };

      expect(formItem.labelCol?.xs).toEqual({ span: 24 });
      expect(formItem.labelCol?.sm).toEqual({ span: 6 });
      expect(formItem.wrapperCol?.xs).toEqual({ span: 24 });
      expect(formItem.wrapperCol?.sm).toEqual({ span: 18 });
    });

    it('should support multilingual help text', () => {
      const formItem: FormItem = {
        label: '用户名',
        help: '请输入您的用户名，支持中英文字符',
        extra: 'Username should be unique across the system',
      };

      expect(formItem.label).toBe('用户名');
      expect(formItem.help).toBe('请输入您的用户名，支持中英文字符');
      expect(formItem.extra).toBe('Username should be unique across the system');
    });

    it('should support nested object names', () => {
      const formItem: FormItem = {
        name: ['user', 'profile', 'contact', 'email'],
      };

      expect(formItem.name).toEqual(['user', 'profile', 'contact', 'email']);
    });
  });
});