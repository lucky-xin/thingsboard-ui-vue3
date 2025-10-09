import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  saveQueue,
  queueList,
  getQueueByName,
  getQueueById,
  deleteQueue,
} from '/@/api/tb/queue';
import type { Queue } from '/@/api/tb/queue';

// Mock defHttp
vi.mock('/@/utils/http/axios', () => ({
  defHttp: {
    get: vi.fn(),
    postJson: vi.fn(),
    delete: vi.fn(),
  },
}));

// Mock queue enums
vi.mock('/@/enums/queueEnum', () => ({
  ProcessingStrategyType: {
    SKIP_ALL_FAILURES: 'SKIP_ALL_FAILURES',
    SKIP_ALL_FAILURES_AND_TIMED_OUT: 'SKIP_ALL_FAILURES_AND_TIMED_OUT',
    RETRY_ALL: 'RETRY_ALL',
    RETRY_FAILED: 'RETRY_FAILED',
    RETRY_TIMED_OUT: 'RETRY_TIMED_OUT',
    RETRY_FAILED_AND_TIMED_OUT: 'RETRY_FAILED_AND_TIMED_OUT',
  },
  SubmitStrategyType: {
    SEQUENTIAL_BY_ORIGINATOR: 'SEQUENTIAL_BY_ORIGINATOR',
    SEQUENTIAL_BY_TENANT: 'SEQUENTIAL_BY_TENANT',
    BURST: 'BURST',
  },
}));

describe('api/tb/queue', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('saveQueue', () => {
    it('should call defHttp.postJson with correct URL, params and data', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: Queue = {
        id: 'queue-1',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        name: 'Main Queue',
        topic: 'main-topic',
        pollInterval: 1000,
        partitions: 4,
        consumerPerPartition: true,
        packProcessingTimeout: 5000,
        submitStrategy: {
          type: 'SEQUENTIAL_BY_ORIGINATOR' as any,
          batchSize: 100,
        },
        processingStrategy: {
          type: 'RETRY_FAILED' as any,
          retries: 3,
          failurePercentage: 0.1,
          pauseBetweenRetries: 1000,
          maxPauseBetweenRetries: 10000,
        },
        additionalInfo: {
          description: 'Main processing queue',
        },
      };
      const testData: Queue = {
        id: 'queue-1',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        name: 'Main Queue',
        topic: 'main-topic',
        pollInterval: 1000,
        partitions: 4,
        consumerPerPartition: true,
        packProcessingTimeout: 5000,
        submitStrategy: {
          type: 'SEQUENTIAL_BY_ORIGINATOR' as any,
          batchSize: 100,
        },
        processingStrategy: {
          type: 'RETRY_FAILED' as any,
          retries: 3,
          failurePercentage: 0.1,
          pauseBetweenRetries: 1000,
          maxPauseBetweenRetries: 10000,
        },
        additionalInfo: {
          description: 'Main processing queue',
        },
      };
      const serviceType = 'TB_RULE_ENGINE';
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await saveQueue(serviceType, testData);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/queues',
        params: { serviceType },
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle different service types', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = { success: true };
      const testData = { name: 'Test Queue', topic: 'test-topic' };
      const serviceTypes = ['TB_CORE', 'TB_RULE_ENGINE', 'TB_TRANSPORT', 'JS_EXECUTOR', 'TB_VC_EXECUTOR'] as const;
      
      for (const serviceType of serviceTypes) {
        vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);
        await saveQueue(serviceType, testData);
        expect(defHttp.postJson).toHaveBeenCalledWith({
          url: '/api/queues',
          params: { serviceType },
          data: testData,
        });
      }
    });

    it('should handle any data type', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = { success: true };
      const testData = { name: 'New Queue', topic: 'new-topic' };
      const serviceType = 'TB_RULE_ENGINE';
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await saveQueue(serviceType, testData);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/queues',
        params: { serviceType },
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle undefined data', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = { success: true };
      const serviceType = 'TB_RULE_ENGINE';
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await saveQueue(serviceType);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/queues',
        params: { serviceType },
        data: undefined,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('queueList', () => {
    it('should call defHttp.get with correct URL and params including serviceType', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = {
        data: [
          {
            id: 'queue-1',
            createdTime: 1234567890,
            tenantId: 'tenant-1',
            name: 'Main Queue',
            topic: 'main-topic',
            pollInterval: 1000,
            partitions: 4,
            consumerPerPartition: true,
            packProcessingTimeout: 5000,
            submitStrategy: {
              type: 'SEQUENTIAL_BY_ORIGINATOR' as any,
              batchSize: 100,
            },
            processingStrategy: {
              type: 'RETRY_FAILED' as any,
              retries: 3,
              failurePercentage: 0.1,
              pauseBetweenRetries: 1000,
              maxPauseBetweenRetries: 10000,
            },
            additionalInfo: {
              description: 'Main processing queue',
            },
          },
          {
            id: 'queue-2',
            createdTime: 1234567891,
            tenantId: 'tenant-1',
            name: 'Secondary Queue',
            topic: 'secondary-topic',
            pollInterval: 2000,
            partitions: 2,
            consumerPerPartition: false,
            packProcessingTimeout: 10000,
            submitStrategy: {
              type: 'BURST' as any,
              batchSize: 50,
            },
            processingStrategy: {
              type: 'SKIP_ALL_FAILURES' as any,
              retries: 0,
              failurePercentage: 0.05,
              pauseBetweenRetries: 500,
              maxPauseBetweenRetries: 5000,
            },
            additionalInfo: {
              description: 'Secondary processing queue',
            },
          },
        ],
        hasNext: false,
        totalElements: 2,
        totalPages: '1',
      };
      const params = {
        pageSize: 10,
        page: 1,
        textSearch: 'queue',
        sortProperty: 'name',
        sortOrder: 'ASC' as const,
      };
      const serviceType = 'TB_RULE_ENGINE';
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await queueList(params, serviceType);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/queues',
        params: { serviceType, ...params },
      });
      expect(result).toEqual(mockResponse);
    });

    it('should use default serviceType when not provided', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = {
        data: [],
        hasNext: false,
        totalElements: 0,
        totalPages: '0',
      };
      const params = {
        pageSize: 10,
        page: 1,
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await queueList(params);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/queues',
        params: { serviceType: 'TB_RULE_ENGINE', ...params },
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getQueueByName', () => {
    it('should call defHttp.get with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: Queue = {
        id: 'queue-1',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        name: 'Main Queue',
        topic: 'main-topic',
        pollInterval: 1000,
        partitions: 4,
        consumerPerPartition: true,
        packProcessingTimeout: 5000,
        submitStrategy: {
          type: 'SEQUENTIAL_BY_ORIGINATOR' as any,
          batchSize: 100,
        },
        processingStrategy: {
          type: 'RETRY_FAILED' as any,
          retries: 3,
          failurePercentage: 0.1,
          pauseBetweenRetries: 1000,
          maxPauseBetweenRetries: 10000,
        },
        additionalInfo: {
          description: 'Main processing queue',
        },
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getQueueByName('Main Queue');

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/queues/name/Main Queue',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getQueueById', () => {
    it('should call defHttp.get with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: Queue = {
        id: 'queue-1',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        name: 'Main Queue',
        topic: 'main-topic',
        pollInterval: 1000,
        partitions: 4,
        consumerPerPartition: true,
        packProcessingTimeout: 5000,
        submitStrategy: {
          type: 'SEQUENTIAL_BY_ORIGINATOR' as any,
          batchSize: 100,
        },
        processingStrategy: {
          type: 'RETRY_FAILED' as any,
          retries: 3,
          failurePercentage: 0.1,
          pauseBetweenRetries: 1000,
          maxPauseBetweenRetries: 10000,
        },
        additionalInfo: {
          description: 'Main processing queue',
        },
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getQueueById('queue-1');

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/queues/queue-1',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deleteQueue', () => {
    it('should call defHttp.delete with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = undefined;
      vi.mocked(defHttp.delete).mockResolvedValue(mockResponse);

      const result = await deleteQueue('queue-1');

      expect(defHttp.delete).toHaveBeenCalledWith({
        url: '/api/queues/queue-1',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('Type definitions', () => {
    it('should create Queue object with all fields', () => {
      const queue: Queue = {
        id: 'queue-1',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        name: 'Main Queue',
        topic: 'main-topic',
        pollInterval: 1000,
        partitions: 4,
        consumerPerPartition: true,
        packProcessingTimeout: 5000,
        submitStrategy: {
          type: 'SEQUENTIAL_BY_ORIGINATOR' as any,
          batchSize: 100,
        },
        processingStrategy: {
          type: 'RETRY_FAILED' as any,
          retries: 3,
          failurePercentage: 0.1,
          pauseBetweenRetries: 1000,
          maxPauseBetweenRetries: 10000,
        },
        additionalInfo: {
          description: 'Main processing queue',
        },
      };

      expect(queue.id).toBe('queue-1');
      expect(queue.createdTime).toBe(1234567890);
      expect(queue.tenantId).toBe('tenant-1');
      expect(queue.name).toBe('Main Queue');
      expect(queue.topic).toBe('main-topic');
      expect(queue.pollInterval).toBe(1000);
      expect(queue.partitions).toBe(4);
      expect(queue.consumerPerPartition).toBe(true);
      expect(queue.packProcessingTimeout).toBe(5000);
      expect(queue.submitStrategy.type).toBe('SEQUENTIAL_BY_ORIGINATOR');
      expect(queue.submitStrategy.batchSize).toBe(100);
      expect(queue.processingStrategy.type).toBe('RETRY_FAILED');
      expect(queue.processingStrategy.retries).toBe(3);
      expect(queue.processingStrategy.failurePercentage).toBe(0.1);
      expect(queue.processingStrategy.pauseBetweenRetries).toBe(1000);
      expect(queue.processingStrategy.maxPauseBetweenRetries).toBe(10000);
      expect(queue.additionalInfo.description).toBe('Main processing queue');
    });

    it('should create Queue object with minimal fields', () => {
      const queue: Queue = {
        id: 'queue-minimal',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        name: 'Minimal Queue',
        topic: 'minimal-topic',
        submitStrategy: {
          type: 'BURST' as any,
        },
        processingStrategy: {
          type: 'SKIP_ALL_FAILURES' as any,
        },
        additionalInfo: {},
      };

      expect(queue.id).toBe('queue-minimal');
      expect(queue.createdTime).toBe(1234567890);
      expect(queue.tenantId).toBe('tenant-1');
      expect(queue.name).toBe('Minimal Queue');
      expect(queue.topic).toBe('minimal-topic');
      expect(queue.submitStrategy.type).toBe('BURST');
      expect(queue.processingStrategy.type).toBe('SKIP_ALL_FAILURES');
      expect(queue.additionalInfo).toEqual({});
      expect(queue.pollInterval).toBeUndefined();
      expect(queue.partitions).toBeUndefined();
      expect(queue.consumerPerPartition).toBeUndefined();
      expect(queue.packProcessingTimeout).toBeUndefined();
      expect(queue.submitStrategy.batchSize).toBeUndefined();
      expect(queue.processingStrategy.retries).toBeUndefined();
      expect(queue.processingStrategy.failurePercentage).toBeUndefined();
      expect(queue.processingStrategy.pauseBetweenRetries).toBeUndefined();
      expect(queue.processingStrategy.maxPauseBetweenRetries).toBeUndefined();
    });

    it('should handle different submit strategy types', () => {
      const sequentialByOriginatorQueue: Queue = {
        id: 'queue-1',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        name: 'Sequential by Originator Queue',
        topic: 'sequential-originator-topic',
        submitStrategy: {
          type: 'SEQUENTIAL_BY_ORIGINATOR' as any,
          batchSize: 100,
        },
        processingStrategy: {
          type: 'RETRY_FAILED' as any,
        },
        additionalInfo: {},
      };

      const sequentialByTenantQueue: Queue = {
        id: 'queue-2',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        name: 'Sequential by Tenant Queue',
        topic: 'sequential-tenant-topic',
        submitStrategy: {
          type: 'SEQUENTIAL_BY_TENANT' as any,
          batchSize: 200,
        },
        processingStrategy: {
          type: 'RETRY_FAILED' as any,
        },
        additionalInfo: {},
      };

      const burstQueue: Queue = {
        id: 'queue-3',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        name: 'Burst Queue',
        topic: 'burst-topic',
        submitStrategy: {
          type: 'BURST' as any,
          batchSize: 500,
        },
        processingStrategy: {
          type: 'RETRY_FAILED' as any,
        },
        additionalInfo: {},
      };

      expect(sequentialByOriginatorQueue.submitStrategy.type).toBe('SEQUENTIAL_BY_ORIGINATOR');
      expect(sequentialByOriginatorQueue.submitStrategy.batchSize).toBe(100);

      expect(sequentialByTenantQueue.submitStrategy.type).toBe('SEQUENTIAL_BY_TENANT');
      expect(sequentialByTenantQueue.submitStrategy.batchSize).toBe(200);

      expect(burstQueue.submitStrategy.type).toBe('BURST');
      expect(burstQueue.submitStrategy.batchSize).toBe(500);
    });

    it('should handle different processing strategy types', () => {
      const skipAllFailuresQueue: Queue = {
        id: 'queue-1',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        name: 'Skip All Failures Queue',
        topic: 'skip-all-failures-topic',
        submitStrategy: {
          type: 'BURST' as any,
        },
        processingStrategy: {
          type: 'SKIP_ALL_FAILURES' as any,
          retries: 0,
          failurePercentage: 0.05,
          pauseBetweenRetries: 0,
          maxPauseBetweenRetries: 0,
        },
        additionalInfo: {},
      };

      const skipAllFailuresAndTimedOutQueue: Queue = {
        id: 'queue-2',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        name: 'Skip All Failures and Timed Out Queue',
        topic: 'skip-all-failures-and-timed-out-topic',
        submitStrategy: {
          type: 'BURST' as any,
        },
        processingStrategy: {
          type: 'SKIP_ALL_FAILURES_AND_TIMED_OUT' as any,
          retries: 0,
          failurePercentage: 0.1,
          pauseBetweenRetries: 0,
          maxPauseBetweenRetries: 0,
        },
        additionalInfo: {},
      };

      const retryAllQueue: Queue = {
        id: 'queue-3',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        name: 'Retry All Queue',
        topic: 'retry-all-topic',
        submitStrategy: {
          type: 'BURST' as any,
        },
        processingStrategy: {
          type: 'RETRY_ALL' as any,
          retries: 5,
          failurePercentage: 0.2,
          pauseBetweenRetries: 2000,
          maxPauseBetweenRetries: 20000,
        },
        additionalInfo: {},
      };

      const retryFailedQueue: Queue = {
        id: 'queue-4',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        name: 'Retry Failed Queue',
        topic: 'retry-failed-topic',
        submitStrategy: {
          type: 'BURST' as any,
        },
        processingStrategy: {
          type: 'RETRY_FAILED' as any,
          retries: 3,
          failurePercentage: 0.15,
          pauseBetweenRetries: 1500,
          maxPauseBetweenRetries: 15000,
        },
        additionalInfo: {},
      };

      const retryTimedOutQueue: Queue = {
        id: 'queue-5',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        name: 'Retry Timed Out Queue',
        topic: 'retry-timed-out-topic',
        submitStrategy: {
          type: 'BURST' as any,
        },
        processingStrategy: {
          type: 'RETRY_TIMED_OUT' as any,
          retries: 2,
          failurePercentage: 0.08,
          pauseBetweenRetries: 1000,
          maxPauseBetweenRetries: 10000,
        },
        additionalInfo: {},
      };

      const retryFailedAndTimedOutQueue: Queue = {
        id: 'queue-6',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        name: 'Retry Failed and Timed Out Queue',
        topic: 'retry-failed-and-timed-out-topic',
        submitStrategy: {
          type: 'BURST' as any,
        },
        processingStrategy: {
          type: 'RETRY_FAILED_AND_TIMED_OUT' as any,
          retries: 4,
          failurePercentage: 0.12,
          pauseBetweenRetries: 1200,
          maxPauseBetweenRetries: 12000,
        },
        additionalInfo: {},
      };

      expect(skipAllFailuresQueue.processingStrategy.type).toBe('SKIP_ALL_FAILURES');
      expect(skipAllFailuresQueue.processingStrategy.retries).toBe(0);
      expect(skipAllFailuresQueue.processingStrategy.failurePercentage).toBe(0.05);

      expect(skipAllFailuresAndTimedOutQueue.processingStrategy.type).toBe('SKIP_ALL_FAILURES_AND_TIMED_OUT');
      expect(skipAllFailuresAndTimedOutQueue.processingStrategy.retries).toBe(0);
      expect(skipAllFailuresAndTimedOutQueue.processingStrategy.failurePercentage).toBe(0.1);

      expect(retryAllQueue.processingStrategy.type).toBe('RETRY_ALL');
      expect(retryAllQueue.processingStrategy.retries).toBe(5);
      expect(retryAllQueue.processingStrategy.failurePercentage).toBe(0.2);
      expect(retryAllQueue.processingStrategy.pauseBetweenRetries).toBe(2000);
      expect(retryAllQueue.processingStrategy.maxPauseBetweenRetries).toBe(20000);

      expect(retryFailedQueue.processingStrategy.type).toBe('RETRY_FAILED');
      expect(retryFailedQueue.processingStrategy.retries).toBe(3);
      expect(retryFailedQueue.processingStrategy.failurePercentage).toBe(0.15);
      expect(retryFailedQueue.processingStrategy.pauseBetweenRetries).toBe(1500);
      expect(retryFailedQueue.processingStrategy.maxPauseBetweenRetries).toBe(15000);

      expect(retryTimedOutQueue.processingStrategy.type).toBe('RETRY_TIMED_OUT');
      expect(retryTimedOutQueue.processingStrategy.retries).toBe(2);
      expect(retryTimedOutQueue.processingStrategy.failurePercentage).toBe(0.08);
      expect(retryTimedOutQueue.processingStrategy.pauseBetweenRetries).toBe(1000);
      expect(retryTimedOutQueue.processingStrategy.maxPauseBetweenRetries).toBe(10000);

      expect(retryFailedAndTimedOutQueue.processingStrategy.type).toBe('RETRY_FAILED_AND_TIMED_OUT');
      expect(retryFailedAndTimedOutQueue.processingStrategy.retries).toBe(4);
      expect(retryFailedAndTimedOutQueue.processingStrategy.failurePercentage).toBe(0.12);
      expect(retryFailedAndTimedOutQueue.processingStrategy.pauseBetweenRetries).toBe(1200);
      expect(retryFailedAndTimedOutQueue.processingStrategy.maxPauseBetweenRetries).toBe(12000);
    });

    it('should handle complex queue configurations', () => {
      const complexQueue: Queue = {
        id: 'complex-queue',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        name: 'Complex Processing Queue',
        topic: 'complex-processing-topic',
        pollInterval: 500,
        partitions: 8,
        consumerPerPartition: true,
        packProcessingTimeout: 30000,
        submitStrategy: {
          type: 'SEQUENTIAL_BY_ORIGINATOR' as any,
          batchSize: 1000,
        },
        processingStrategy: {
          type: 'RETRY_ALL' as any,
          retries: 10,
          failurePercentage: 0.25,
          pauseBetweenRetries: 5000,
          maxPauseBetweenRetries: 60000,
        },
        additionalInfo: {
          description: 'Complex queue for high-throughput processing',
          tags: ['high-priority', 'critical', 'monitored'],
          environment: 'production',
          owner: 'platform-team',
          monitoring: {
            enabled: true,
            alertThreshold: 0.1,
            metrics: ['throughput', 'latency', 'error-rate'],
          },
          scaling: {
            minPartitions: 4,
            maxPartitions: 16,
            autoScale: true,
            scaleUpThreshold: 0.8,
            scaleDownThreshold: 0.3,
          },
        },
      };

      expect(complexQueue.id).toBe('complex-queue');
      expect(complexQueue.createdTime).toBe(1234567890);
      expect(complexQueue.tenantId).toBe('tenant-1');
      expect(complexQueue.name).toBe('Complex Processing Queue');
      expect(complexQueue.topic).toBe('complex-processing-topic');
      expect(complexQueue.pollInterval).toBe(500);
      expect(complexQueue.partitions).toBe(8);
      expect(complexQueue.consumerPerPartition).toBe(true);
      expect(complexQueue.packProcessingTimeout).toBe(30000);
      expect(complexQueue.submitStrategy.type).toBe('SEQUENTIAL_BY_ORIGINATOR');
      expect(complexQueue.submitStrategy.batchSize).toBe(1000);
      expect(complexQueue.processingStrategy.type).toBe('RETRY_ALL');
      expect(complexQueue.processingStrategy.retries).toBe(10);
      expect(complexQueue.processingStrategy.failurePercentage).toBe(0.25);
      expect(complexQueue.processingStrategy.pauseBetweenRetries).toBe(5000);
      expect(complexQueue.processingStrategy.maxPauseBetweenRetries).toBe(60000);
      expect(complexQueue.additionalInfo.description).toBe('Complex queue for high-throughput processing');
      expect(complexQueue.additionalInfo.tags).toEqual(['high-priority', 'critical', 'monitored']);
      expect(complexQueue.additionalInfo.environment).toBe('production');
      expect(complexQueue.additionalInfo.owner).toBe('platform-team');
      expect(complexQueue.additionalInfo.monitoring?.enabled).toBe(true);
      expect(complexQueue.additionalInfo.monitoring?.alertThreshold).toBe(0.1);
      expect(complexQueue.additionalInfo.monitoring?.metrics).toEqual(['throughput', 'latency', 'error-rate']);
      expect(complexQueue.additionalInfo.scaling?.minPartitions).toBe(4);
      expect(complexQueue.additionalInfo.scaling?.maxPartitions).toBe(16);
      expect(complexQueue.additionalInfo.scaling?.autoScale).toBe(true);
      expect(complexQueue.additionalInfo.scaling?.scaleUpThreshold).toBe(0.8);
      expect(complexQueue.additionalInfo.scaling?.scaleDownThreshold).toBe(0.3);
    });
  });
});