import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  getAlarmById,
  getAlarmInfoById,
  saveAlarm,
  deleteAlarm,
  ackAlarm,
  clearAlarm,
  assignAlarm,
  unAssignAlarm,
  getAlarmInfoList,
  getAlarmInfoByEntity,
  getHighestAlarmSeverity,
  saveAlarmComment,
  deleteAlarmComment,
  alarmCommentList,
} from '/@/api/tb/alarm';
import type {
  Alarm,
  AlarmInfo,
  AlarmComment,
  AlarmCommentInfo,
} from '/@/api/tb/alarm';

// Mock defHttp
vi.mock('/@/utils/http/axios', () => ({
  defHttp: {
    get: vi.fn(),
    postJson: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('api/tb/alarm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getAlarmById', () => {
    it('should call defHttp.get with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: Alarm = {
        id: 'alarm-1',
        createdTime: 1234567890,
        name: 'Test Alarm',
        type: 'temperature',
        status: 'ACTIVE',
        severity: 'CRITICAL',
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getAlarmById('alarm-1');

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/alarm/alarm-1',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getAlarmInfoById', () => {
    it('should call defHttp.get with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: AlarmInfo = {
        id: 'alarm-1',
        createdTime: 1234567890,
        name: 'Test Alarm',
        type: 'temperature',
        status: 'ACTIVE',
        severity: 'CRITICAL',
        originatorName: 'Device 1',
        originatorLabel: 'Temperature Sensor',
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getAlarmInfoById('alarm-1');

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/alarm/info/alarm-1',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('saveAlarm', () => {
    it('should call defHttp.postJson with correct data', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: Alarm = {
        id: 'alarm-1',
        createdTime: 1234567890,
        name: 'Test Alarm',
        type: 'temperature',
      };
      const testData: Alarm = {
        id: 'alarm-1',
        createdTime: 1234567890,
        name: 'Test Alarm',
        type: 'temperature',
      };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await saveAlarm(testData);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/alarm',
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle any data type', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = { success: true };
      const testData = { name: 'New Alarm', type: 'humidity' };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await saveAlarm(testData);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/alarm',
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deleteAlarm', () => {
    it('should call defHttp.delete with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = undefined;
      vi.mocked(defHttp.delete).mockResolvedValue(mockResponse);

      const result = await deleteAlarm('alarm-1');

      expect(defHttp.delete).toHaveBeenCalledWith({
        url: '/api/alarm/alarm-1',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('ackAlarm', () => {
    it('should call defHttp.post with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: AlarmInfo = {
        id: 'alarm-1',
        createdTime: 1234567890,
        acknowledged: true,
        ackTs: 1234567891,
      };
      vi.mocked(defHttp.post).mockResolvedValue(mockResponse);

      const result = await ackAlarm('alarm-1');

      expect(defHttp.post).toHaveBeenCalledWith({
        url: '/api/alarm/alarm-1/ack',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('clearAlarm', () => {
    it('should call defHttp.post with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: AlarmInfo = {
        id: 'alarm-1',
        createdTime: 1234567890,
        cleared: true,
        clearTs: 1234567891,
      };
      vi.mocked(defHttp.post).mockResolvedValue(mockResponse);

      const result = await clearAlarm('alarm-1');

      expect(defHttp.post).toHaveBeenCalledWith({
        url: '/api/alarm/alarm-1/clear',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('assignAlarm', () => {
    it('should call defHttp.post with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: Alarm = {
        id: 'alarm-1',
        createdTime: 1234567890,
        assigneeId: 'user-1',
        assignTs: 1234567891,
      };
      vi.mocked(defHttp.post).mockResolvedValue(mockResponse);

      const result = await assignAlarm('alarm-1', 'user-1');

      expect(defHttp.post).toHaveBeenCalledWith({
        url: '/api/alarm/alarm-1/assign/user-1',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('unAssignAlarm', () => {
    it('should call defHttp.delete with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = undefined;
      vi.mocked(defHttp.delete).mockResolvedValue(mockResponse);

      const result = await unAssignAlarm('alarm-1');

      expect(defHttp.delete).toHaveBeenCalledWith({
        url: '/api/alarm/alarm-1/assign',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getAlarmInfoList', () => {
    it('should call defHttp.get with correct URL and params', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = {
        data: [
          {
            id: 'alarm-1',
            createdTime: 1234567890,
            name: 'Test Alarm 1',
          },
          {
            id: 'alarm-2',
            createdTime: 1234567891,
            name: 'Test Alarm 2',
          },
        ],
        hasNext: false,
        totalElements: 2,
        totalPages: '1',
      };
      const params = {
        pageSize: 10,
        page: 1,
        textSearch: 'test',
        sortProperty: 'createdTime',
        sortOrder: 'DESC' as const,
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getAlarmInfoList(params);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/v2/alarms',
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getAlarmInfoByEntity', () => {
    it('should call defHttp.get with correct URL and params', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = {
        data: [
          {
            id: 'alarm-1',
            createdTime: 1234567890,
            name: 'Device Alarm',
          },
        ],
        hasNext: false,
        totalElements: 1,
        totalPages: '1',
      };
      const params = {
        pageSize: 10,
        page: 1,
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getAlarmInfoByEntity(params, 'DEVICE', 'device-1');

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/v2/alarm/DEVICE/device-1',
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getHighestAlarmSeverity', () => {
    it('should call defHttp.get with correct URL and params', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = 'CRITICAL';
      const params = {
        searchStatus: 'ACTIVE',
        status: 'ACTIVE',
        assigneeId: 'user-1',
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getHighestAlarmSeverity('DEVICE', 'device-1', params);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/alarm/highestSeverity/DEVICE/device-1',
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('saveAlarmComment', () => {
    it('should call defHttp.postJson with correct URL and data', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: AlarmComment = {
        id: 'comment-1',
        createdTime: 1234567890,
        alarmId: 'alarm-1',
        userId: 'user-1',
        type: 'OTHER',
        comment: { text: 'Test comment' },
      };
      const testData: AlarmComment = {
        id: 'comment-1',
        createdTime: 1234567890,
        alarmId: 'alarm-1',
        userId: 'user-1',
        type: 'OTHER',
        comment: { text: 'Test comment' },
      };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await saveAlarmComment(testData, 'alarm-1');

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/alarm/alarm-1/comment',
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle any data type', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = { success: true };
      const testData = { comment: 'New comment', type: 'SYSTEM' };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await saveAlarmComment(testData, 'alarm-1');

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/alarm/alarm-1/comment',
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deleteAlarmComment', () => {
    it('should call defHttp.delete with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = undefined;
      vi.mocked(defHttp.delete).mockResolvedValue(mockResponse);

      const result = await deleteAlarmComment('comment-1', 'alarm-1');

      expect(defHttp.delete).toHaveBeenCalledWith({
        url: '/api/alarm/alarm-1/comment/comment-1',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('alarmCommentList', () => {
    it('should call defHttp.get with correct URL and params', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = {
        data: [
          {
            id: 'comment-1',
            createdTime: 1234567890,
            alarmId: 'alarm-1',
            type: 'OTHER',
            comment: { text: 'Test comment' },
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
          },
        ],
        hasNext: false,
        totalElements: 1,
        totalPages: '1',
      };
      const params = {
        pageSize: 10,
        page: 1,
        textSearch: 'test',
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await alarmCommentList('alarm-1', params);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/alarm/alarm-1/comment',
        params,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('Type definitions', () => {
    it('should create Alarm object', () => {
      const alarm: Alarm = {
        id: 'alarm-1',
        createdTime: 1234567890,
        name: 'Temperature Alarm',
        type: 'temperature',
        status: 'ACTIVE',
        originator: 'device-1',
        severity: 'CRITICAL',
        acknowledged: false,
        cleared: false,
        propagate: true,
        propagateToOwner: true,
        propagateToTenant: false,
        propagateRelationTypes: ['CONTAINS'],
        startTs: 1234567890,
        endTs: 1234567899,
        ackTs: 1234567891,
        clearTs: 1234567892,
        assignTs: 1234567893,
        assigneeId: 'user-1',
        tenantId: 'tenant-1',
        customerId: 'customer-1',
        details: { data: 'Temperature exceeded threshold' },
      };

      expect(alarm.id).toBe('alarm-1');
      expect(alarm.createdTime).toBe(1234567890);
      expect(alarm.name).toBe('Temperature Alarm');
      expect(alarm.type).toBe('temperature');
      expect(alarm.status).toBe('ACTIVE');
      expect(alarm.originator).toBe('device-1');
      expect(alarm.severity).toBe('CRITICAL');
      expect(alarm.acknowledged).toBe(false);
      expect(alarm.cleared).toBe(false);
      expect(alarm.propagate).toBe(true);
      expect(alarm.propagateToOwner).toBe(true);
      expect(alarm.propagateToTenant).toBe(false);
      expect(alarm.propagateRelationTypes).toEqual(['CONTAINS']);
      expect(alarm.startTs).toBe(1234567890);
      expect(alarm.endTs).toBe(1234567899);
      expect(alarm.ackTs).toBe(1234567891);
      expect(alarm.clearTs).toBe(1234567892);
      expect(alarm.assignTs).toBe(1234567893);
      expect(alarm.assigneeId).toBe('user-1');
      expect(alarm.tenantId).toBe('tenant-1');
      expect(alarm.customerId).toBe('customer-1');
      expect(alarm.details).toEqual({ data: 'Temperature exceeded threshold' });
    });

    it('should create AlarmInfo object', () => {
      const alarmInfo: AlarmInfo = {
        id: 'alarm-1',
        createdTime: 1234567890,
        name: 'Temperature Alarm',
        type: 'temperature',
        status: 'ACTIVE',
        severity: 'CRITICAL',
        originatorName: 'Device 1',
        originatorLabel: 'Temperature Sensor',
        assignee: {
          id: 'user-1',
          firstName: 'John',
          lastName: 'Doe',
          email: 'john@example.com',
        },
      };

      expect(alarmInfo.id).toBe('alarm-1');
      expect(alarmInfo.name).toBe('Temperature Alarm');
      expect(alarmInfo.originatorName).toBe('Device 1');
      expect(alarmInfo.originatorLabel).toBe('Temperature Sensor');
      expect(alarmInfo.assignee?.id).toBe('user-1');
      expect(alarmInfo.assignee?.firstName).toBe('John');
      expect(alarmInfo.assignee?.lastName).toBe('Doe');
      expect(alarmInfo.assignee?.email).toBe('john@example.com');
    });

    it('should create AlarmComment object', () => {
      const alarmComment: AlarmComment = {
        id: 'comment-1',
        createdTime: 1234567890,
        alarmId: 'alarm-1',
        userId: 'user-1',
        type: 'OTHER',
        comment: { text: 'Test comment', subtype: 'manual', userId: 'user-1' },
      };

      expect(alarmComment.id).toBe('comment-1');
      expect(alarmComment.createdTime).toBe(1234567890);
      expect(alarmComment.alarmId).toBe('alarm-1');
      expect(alarmComment.userId).toBe('user-1');
      expect(alarmComment.type).toBe('OTHER');
      expect(alarmComment.comment.text).toBe('Test comment');
      expect(alarmComment.comment.subtype).toBe('manual');
      expect(alarmComment.comment.userId).toBe('user-1');
    });

    it('should create AlarmCommentInfo object', () => {
      const alarmCommentInfo: AlarmCommentInfo = {
        id: 'comment-1',
        createdTime: 1234567890,
        alarmId: 'alarm-1',
        userId: 'user-1',
        type: 'SYSTEM',
        comment: { text: 'System comment' },
        firstName: 'System',
        lastName: 'User',
        email: 'system@example.com',
      };

      expect(alarmCommentInfo.id).toBe('comment-1');
      expect(alarmCommentInfo.createdTime).toBe(1234567890);
      expect(alarmCommentInfo.alarmId).toBe('alarm-1');
      expect(alarmCommentInfo.userId).toBe('user-1');
      expect(alarmCommentInfo.type).toBe('SYSTEM');
      expect(alarmCommentInfo.comment.text).toBe('System comment');
      expect(alarmCommentInfo.firstName).toBe('System');
      expect(alarmCommentInfo.lastName).toBe('User');
      expect(alarmCommentInfo.email).toBe('system@example.com');
    });
  });
});