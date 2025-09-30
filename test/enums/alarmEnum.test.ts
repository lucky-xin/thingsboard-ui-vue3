import { describe, it, expect } from 'vitest';
import {
  ALarmShowStatus,
  AlarmStatus,
  AlarmSeverity,
  ALARM_SHOW_STATUS_OPTIONS,
  ALARM_STATUS_OPTIONS,
  ALARM_SEVERITY_OPTIONS,
  AlarmConditionKeyType,
  ALARM_CONDITION_KEY_TYPE_OPTIONS,
  AlarmConditionValueType,
  ALARM_CONDITION_VALUE_TYPE_OPTIONS,
  PredicateOperation,
  PREDICATE_OPERATION_OPTIONS,
} from '/@/enums/alarmEnum';

// Build configuration mocks
Object.defineProperty(globalThis, '__COLOR_PLUGIN_OUTPUT_FILE_NAME__', {
  value: 'mock-theme.css',
  writable: true
});
Object.defineProperty(globalThis, '__VITE_PLUGIN_THEME__', {
  value: true,
  writable: true
});

describe('alarmEnum', () => {
  describe('ALarmShowStatus', () => {
    it('should have correct values', () => {
      expect(ALarmShowStatus.ACTIVE_UNACK).toBe('ACTIVE_UNACK');
      expect(ALarmShowStatus.ACTIVE_ACK).toBe('ACTIVE_ACK');
      expect(ALarmShowStatus.CLEARED_UNACK).toBe('CLEARED_UNACK');
      expect(ALarmShowStatus.CLEARED_ACK).toBe('CLEARED_ACK');
    });
  });

  describe('AlarmStatus', () => {
    it('should have correct values', () => {
      expect(AlarmStatus.ACTIVE).toBe('ACTIVE');
      expect(AlarmStatus.CLEARED).toBe('CLEARED');
      expect(AlarmStatus.ACK).toBe('ACK');
      expect(AlarmStatus.UNACK).toBe('UNACK');
    });
  });

  describe('AlarmSeverity', () => {
    it('should have correct values', () => {
      expect(AlarmSeverity.CRITICAL).toBe('CRITICAL');
      expect(AlarmSeverity.MAJOR).toBe('MAJOR');
      expect(AlarmSeverity.MINOR).toBe('MINOR');
      expect(AlarmSeverity.WARNING).toBe('WARNING');
      expect(AlarmSeverity.INDETERMINATE).toBe('INDETERMINATE');
    });
  });

  describe('ALARM_SHOW_STATUS_OPTIONS', () => {
    it('should be an array with correct structure', () => {
      expect(Array.isArray(ALARM_SHOW_STATUS_OPTIONS)).toBe(true);
      expect(ALARM_SHOW_STATUS_OPTIONS.length).toBeGreaterThan(0);
      ALARM_SHOW_STATUS_OPTIONS.forEach(option => {
        expect(option).toHaveProperty('label');
        expect(option).toHaveProperty('value');
      });
    });
  });

  describe('ALARM_STATUS_OPTIONS', () => {
    it('should be an array with correct structure', () => {
      expect(Array.isArray(ALARM_STATUS_OPTIONS)).toBe(true);
      expect(ALARM_STATUS_OPTIONS.length).toBeGreaterThan(0);
      ALARM_STATUS_OPTIONS.forEach(option => {
        expect(option).toHaveProperty('label');
        expect(option).toHaveProperty('value');
      });
    });
  });

  describe('ALARM_SEVERITY_OPTIONS', () => {
    it('should be an array with correct structure', () => {
      expect(Array.isArray(ALARM_SEVERITY_OPTIONS)).toBe(true);
      expect(ALARM_SEVERITY_OPTIONS.length).toBeGreaterThan(0);
      ALARM_SEVERITY_OPTIONS.forEach(option => {
        expect(option).toHaveProperty('label');
        expect(option).toHaveProperty('value');
      });
    });
  });

  describe('AlarmConditionKeyType', () => {
    it('should have correct values', () => {
      expect(AlarmConditionKeyType.ATTRIBUTE).toBe('ATTRIBUTE');
      expect(AlarmConditionKeyType.TIME_SERIES).toBe('TIME_SERIES');
      expect(AlarmConditionKeyType.CONSTANT).toBe('CONSTANT');
    });
  });

  describe('ALARM_CONDITION_KEY_TYPE_OPTIONS', () => {
    it('should be an array with correct structure', () => {
      expect(Array.isArray(ALARM_CONDITION_KEY_TYPE_OPTIONS)).toBe(true);
      expect(ALARM_CONDITION_KEY_TYPE_OPTIONS.length).toBeGreaterThan(0);
      ALARM_CONDITION_KEY_TYPE_OPTIONS.forEach(option => {
        expect(option).toHaveProperty('label');
        expect(option).toHaveProperty('value');
      });
    });
  });

  describe('AlarmConditionValueType', () => {
    it('should have correct values', () => {
      expect(AlarmConditionValueType.STRING).toBe('STRING');
      expect(AlarmConditionValueType.NUMERIC).toBe('NUMERIC');
      expect(AlarmConditionValueType.BOOLEAN).toBe('BOOLEAN');
      expect(AlarmConditionValueType.DATE_TIME).toBe('DATE_TIME');
    });
  });

  describe('ALARM_CONDITION_VALUE_TYPE_OPTIONS', () => {
    it('should be an array with correct structure', () => {
      expect(Array.isArray(ALARM_CONDITION_VALUE_TYPE_OPTIONS)).toBe(true);
      expect(ALARM_CONDITION_VALUE_TYPE_OPTIONS.length).toBeGreaterThan(0);
      ALARM_CONDITION_VALUE_TYPE_OPTIONS.forEach(option => {
        expect(option).toHaveProperty('label');
        expect(option).toHaveProperty('value');
      });
    });
  });

  describe('PredicateOperation', () => {
    it('should have correct values', () => {
      expect(PredicateOperation.EQUAL).toBe('EQUAL');
      expect(PredicateOperation.NOT_EQUAL).toBe('NOT_EQUAL');
      expect(PredicateOperation.STARTS_WITH).toBe('STARTS_WITH');
      expect(PredicateOperation.ENDS_WITH).toBe('ENDS_WITH');
      expect(PredicateOperation.CONTAINS).toBe('CONTAINS');
      expect(PredicateOperation.NOT_CONTAINS).toBe('NOT_CONTAINS');
      expect(PredicateOperation.IN).toBe('IN');
      expect(PredicateOperation.NOT_IN).toBe('NOT_IN');
      expect(PredicateOperation.LESS).toBe('LESS');
      expect(PredicateOperation.GREATER).toBe('GREATER');
      expect(PredicateOperation.GREATER_OR_EQUAL).toBe('GREATER_OR_EQUAL');
      expect(PredicateOperation.LESS_OR_EQUAL).toBe('LESS_OR_EQUAL');
    });
  });

  describe('PREDICATE_OPERATION_OPTIONS', () => {
    it('should be an array with correct structure', () => {
      expect(Array.isArray(PREDICATE_OPERATION_OPTIONS)).toBe(true);
      expect(PREDICATE_OPERATION_OPTIONS.length).toBeGreaterThan(0);
      PREDICATE_OPERATION_OPTIONS.forEach(option => {
        expect(option).toHaveProperty('label');
        expect(option).toHaveProperty('value');
      });
    });
  });

});
