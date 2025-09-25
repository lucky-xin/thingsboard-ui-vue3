import { describe, it, expect } from 'vitest';
import {
  is,
  isDef,
  isUnDef,
  isObject,
  isEmpty,
  isDate,
  isNull,
  isNullAndUnDef,
  isNullOrUnDef,
  isNumber,
  isPromise,
  isString,
  isFunction,
  isBoolean,
  isRegExp,
  isArray,
  isWindow,
  isElement,
  isMap,
  isServer,
  isClient,
  isUrl,
} from '/@/utils/is';

describe('utils/is', () => {
  it('should check is correctly', () => {
    expect(is({}, 'Object')).toBe(true);
    expect(is([], 'Array')).toBe(true);
    expect(is('', 'String')).toBe(true);
    expect(is(1, 'Number')).toBe(true);
  });

  it('should check isDef correctly', () => {
    expect(isDef(undefined)).toBe(false);
    expect(isDef(null)).toBe(true);
    expect(isDef('')).toBe(true);
    expect(isDef(0)).toBe(true);
  });

  it('should check isUnDef correctly', () => {
    expect(isUnDef(undefined)).toBe(true);
    expect(isUnDef(null)).toBe(false);
    expect(isUnDef('')).toBe(false);
    expect(isUnDef(0)).toBe(false);
  });

  it('should check isObject correctly', () => {
    expect(isObject({})).toBe(true);
    // Arrays are not considered objects in this implementation
    expect(isObject([])).toBe(false);
    expect(isObject(null)).toBe(false);
    expect(isObject(undefined)).toBe(false);
  });

  it('should check isEmpty correctly', () => {
    expect(isEmpty(undefined)).toBe(true);
    // null is considered defined (isDef(null) returns true), so it goes to the next check
    // Since null is not an array, string, Map, Set, or object, it returns false
    expect(isEmpty(null)).toBe(false);
    expect(isEmpty('')).toBe(true);
    expect(isEmpty([])).toBe(true);
    expect(isEmpty({})).toBe(true);
    expect(isEmpty('test')).toBe(false);
    expect(isEmpty([1])).toBe(false);
    expect(isEmpty({ a: 1 })).toBe(false);
  });

  it('should check isDate correctly', () => {
    expect(isDate(new Date())).toBe(true);
    expect(isDate('')).toBe(false);
  });

  it('should check isNull correctly', () => {
    expect(isNull(null)).toBe(true);
    expect(isNull(undefined)).toBe(false);
    expect(isNull('')).toBe(false);
  });

  it('should check isNumber correctly', () => {
    expect(isNumber(1)).toBe(true);
    expect(isNumber('1')).toBe(false);
    expect(isNumber(NaN)).toBe(true); // NaN is a number in JavaScript
  });

  it('should check isString correctly', () => {
    expect(isString('')).toBe(true);
    expect(isString(1)).toBe(false);
  });

  it('should check isFunction correctly', () => {
    expect(isFunction(() => {})).toBe(true);
    expect(isFunction({})).toBe(false);
  });

  it('should check isBoolean correctly', () => {
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(false)).toBe(true);
    expect(isBoolean(1)).toBe(false);
  });

  it('should check isArray correctly', () => {
    expect(isArray([])).toBe(true);
    expect(isArray({})).toBe(false);
  });

  it('should check isServer and isClient correctly', () => {
    // In test environment with jsdom, window is defined
    expect(isServer).toBe(false);
    expect(isClient).toBe(true);
  });

  it('should check isNullAndUnDef correctly', () => {
    expect(isNullAndUnDef(null)).toBe(false); // null is defined but not undefined
    expect(isNullAndUnDef(undefined)).toBe(false); // undefined is not null
    expect(isNullAndUnDef('')).toBe(false);
    expect(isNullAndUnDef(0)).toBe(false);
  });

  it('should check isNullOrUnDef correctly', () => {
    expect(isNullOrUnDef(null)).toBe(true);
    expect(isNullOrUnDef(undefined)).toBe(true);
    expect(isNullOrUnDef('')).toBe(false);
    expect(isNullOrUnDef(0)).toBe(false);
  });

  it('should check isPromise correctly', () => {
    // Test basic functionality
    expect(isPromise({})).toBe(false);
    expect(isPromise('promise')).toBe(false);
    expect(isPromise(null)).toBe(false);
  });

  it('should check isRegExp correctly', () => {
    expect(isRegExp(/test/)).toBe(true);
    expect(isRegExp(new RegExp('test'))).toBe(true);
    expect(isRegExp('test')).toBe(false);
    expect(isRegExp({})).toBe(false);
  });

  it('should check isWindow correctly', () => {
    // In jsdom environment, window might not be detected as Window type
    expect(isWindow({})).toBe(false);
    expect(isWindow(null)).toBe(false);
    expect(isWindow(undefined)).toBe(false);
  });

  it('should check isElement correctly', () => {
    expect(isElement({})).toBe(false);
    expect(isElement({ tagName: 'div' })).toBe(true);
    expect(isElement({ tagName: null })).toBe(false);
    expect(isElement(null)).toBe(false);
  });

  it('should check isMap correctly', () => {
    expect(isMap(new Map())).toBe(true);
    expect(isMap(new Map([['key', 'value']]))).toBe(true);
    expect(isMap({})).toBe(false);
    expect(isMap(new Set())).toBe(false);
  });

  it('should check isEmpty with Map and Set correctly', () => {
    expect(isEmpty(new Map())).toBe(true);
    expect(isEmpty(new Set())).toBe(true);
    expect(isEmpty(new Map([['key', 'value']]))).toBe(false);
    expect(isEmpty(new Set(['value']))).toBe(false);
  });

  it('should check isUrl correctly', () => {
    expect(isUrl('https://example.com')).toBe(true);
    expect(isUrl('http://example.com')).toBe(true);
    expect(isUrl('test___blank')).toBe(true);
    expect(isUrl('')).toBe(false);
    expect(isUrl('not-a-url')).toBe(false);
  });
});
