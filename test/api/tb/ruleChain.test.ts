import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  ruleChainList,
  getRuleChainById,
  saveRuleChain,
  setDefaultRuleChain,
  setRootRuleChain,
  deleteRuleChain,
  getRuleChainOutputLabels,
  getRuleChainOutputLabelsUsage,
  getRuleChainMetaData,
  saveRuleChainMetaData,
} from '/@/api/tb/ruleChain';
import type {
  RuleChain,
  RuleNode,
  RuleChainMetaData,
  RuleChainOutputLabelsUsage,
} from '/@/api/tb/ruleChain';

// Mock defHttp
vi.mock('/@/utils/http/axios', () => ({
  defHttp: {
    get: vi.fn(),
    postJson: vi.fn(),
    post: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('api/tb/ruleChain', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('ruleChainList', () => {
    it('should call defHttp.get with correct URL and params including type', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = {
        data: [
          {
            id: 'rule-chain-1',
            createdTime: 1234567890,
            tenantId: 'tenant-1',
            name: 'Main Rule Chain',
            type: 'CORE',
            root: true,
            debugMode: false,
            firstRuleNodeId: 'rule-node-1',
            configuration: {
              version: '1.0',
              description: 'Main rule chain for device processing',
            },
            externalId: 'external-rule-chain-1',
            additionalInfo: {
              tags: ['main', 'core'],
              priority: 'high',
            },
          },
          {
            id: 'rule-chain-2',
            createdTime: 1234567891,
            tenantId: 'tenant-1',
            name: 'Edge Rule Chain',
            type: 'EDGE',
            root: false,
            debugMode: true,
            firstRuleNodeId: 'rule-node-2',
            configuration: {
              version: '2.0',
              description: 'Edge rule chain for local processing',
            },
            externalId: 'external-rule-chain-2',
            additionalInfo: {
              tags: ['edge', 'local'],
              priority: 'medium',
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
        textSearch: 'rule',
        sortProperty: 'name',
        sortOrder: 'ASC' as const,
      };
      const type = 'CORE';
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await ruleChainList(params, type);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/ruleChains',
        params: { type, ...params },
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle params without type', async () => {
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

      const result = await ruleChainList(params);

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/ruleChains',
        params: { type: undefined, ...params },
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getRuleChainById', () => {
    it('should call defHttp.get with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: RuleChain = {
        id: 'rule-chain-1',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        name: 'Main Rule Chain',
        type: 'CORE',
        root: true,
        debugMode: false,
        firstRuleNodeId: 'rule-node-1',
        configuration: {
          version: '1.0',
          description: 'Main rule chain for device processing',
        },
        externalId: 'external-rule-chain-1',
        additionalInfo: {
          tags: ['main', 'core'],
          priority: 'high',
        },
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getRuleChainById('rule-chain-1');

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/ruleChain/rule-chain-1',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('saveRuleChain', () => {
    it('should call defHttp.postJson with correct URL and data', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: RuleChain = {
        id: 'rule-chain-1',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        name: 'Main Rule Chain',
        type: 'CORE',
        root: true,
        debugMode: false,
        firstRuleNodeId: 'rule-node-1',
        configuration: {
          version: '1.0',
          description: 'Main rule chain for device processing',
        },
        externalId: 'external-rule-chain-1',
        additionalInfo: {
          tags: ['main', 'core'],
          priority: 'high',
        },
      };
      const testData: RuleChain = {
        id: 'rule-chain-1',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        name: 'Main Rule Chain',
        type: 'CORE',
        root: true,
        debugMode: false,
        firstRuleNodeId: 'rule-node-1',
        configuration: {
          version: '1.0',
          description: 'Main rule chain for device processing',
        },
        externalId: 'external-rule-chain-1',
        additionalInfo: {
          tags: ['main', 'core'],
          priority: 'high',
        },
      };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await saveRuleChain(testData);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/ruleChain',
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle any data type', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = { success: true };
      const testData = { name: 'New Rule Chain', type: 'CORE' };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await saveRuleChain(testData);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/ruleChain',
        data: testData,
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('setDefaultRuleChain', () => {
    it('should call defHttp.postJson with correct URL and params', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: RuleChain = {
        id: 'rule-chain-1',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        name: 'Default Rule Chain',
        type: 'CORE',
        root: true,
        debugMode: false,
        firstRuleNodeId: 'rule-node-1',
        configuration: {
          version: '1.0',
          description: 'Default rule chain for devices',
        },
        externalId: 'external-rule-chain-1',
        additionalInfo: {
          tags: ['default', 'core'],
          priority: 'high',
        },
      };
      const name = 'Default Rule Chain';
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await setDefaultRuleChain(name);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/ruleChain/device/default',
        params: { name },
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('setRootRuleChain', () => {
    it('should call defHttp.post with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: RuleChain = {
        id: 'rule-chain-1',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        name: 'Root Rule Chain',
        type: 'CORE',
        root: true,
        debugMode: false,
        firstRuleNodeId: 'rule-node-1',
        configuration: {
          version: '1.0',
          description: 'Root rule chain',
        },
        externalId: 'external-rule-chain-1',
        additionalInfo: {
          tags: ['root', 'core'],
          priority: 'high',
        },
      };
      vi.mocked(defHttp.post).mockResolvedValue(mockResponse);

      const result = await setRootRuleChain('rule-chain-1');

      expect(defHttp.post).toHaveBeenCalledWith({
        url: '/api/ruleChain/rule-chain-1/root',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deleteRuleChain', () => {
    it('should call defHttp.delete with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = undefined;
      vi.mocked(defHttp.delete).mockResolvedValue(mockResponse);

      const result = await deleteRuleChain('rule-chain-1');

      expect(defHttp.delete).toHaveBeenCalledWith({
        url: '/api/ruleChain/rule-chain-1',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getRuleChainOutputLabels', () => {
    it('should call defHttp.get with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: string[] = ['success', 'failure', 'timeout', 'error'];
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getRuleChainOutputLabels('rule-chain-1');

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/ruleChain/rule-chain-1/output/labels',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getRuleChainOutputLabelsUsage', () => {
    it('should call defHttp.get with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: RuleChainOutputLabelsUsage[] = [
        {
          ruleChainId: 'rule-chain-1',
          ruleNodeId: 'rule-node-1',
          ruleChainName: 'Main Rule Chain',
          ruleNodeName: 'Filter Node',
          labels: ['success', 'failure'],
        },
        {
          ruleChainId: 'rule-chain-2',
          ruleNodeId: 'rule-node-2',
          ruleChainName: 'Secondary Rule Chain',
          ruleNodeName: 'Transform Node',
          labels: ['timeout', 'error'],
        },
      ];
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getRuleChainOutputLabelsUsage('rule-chain-1');

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/ruleChain/rule-chain-1/output/labels/usage',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('getRuleChainMetaData', () => {
    it('should call defHttp.get with correct URL', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: RuleChainMetaData = {
        ruleChainId: 'rule-chain-1',
        firstNodeIndex: 0,
        nodes: [
          {
            id: 'rule-node-1',
            createdTime: 1234567890,
            ruleChainId: 'rule-chain-1',
            name: 'Filter Node',
            debugMode: false,
            singletonMode: true,
            type: 'FILTER',
            configuration: {
              filterType: 'JS',
              jsScript: 'return msg.temperature > 25;',
            },
            additionalInfo: {
              description: 'Temperature filter node',
            },
          },
          {
            id: 'rule-node-2',
            createdTime: 1234567891,
            ruleChainId: 'rule-chain-1',
            name: 'Transform Node',
            debugMode: false,
            singletonMode: true,
            type: 'TRANSFORM',
            configuration: {
              transformType: 'JS',
              jsScript: 'msg.temperature = msg.temperature * 1.8 + 32;',
            },
            additionalInfo: {
              description: 'Temperature conversion node',
            },
          },
        ],
        connections: [
          { fromIndex: 0, toIndex: 1, type: 'SUCCESS' },
        ],
        ruleChainConnections: [
          {
            fromIndex: 1,
            type: 'SUCCESS',
            targetRuleChainId: 'rule-chain-2',
            additionalInfo: {
              description: 'Forward to secondary chain',
            },
          },
        ],
      };
      vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

      const result = await getRuleChainMetaData('rule-chain-1');

      expect(defHttp.get).toHaveBeenCalledWith({
        url: '/api/ruleChain/rule-chain-1/metadata',
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('saveRuleChainMetaData', () => {
    it('should call defHttp.postJson with correct URL, data and params', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: RuleChainMetaData = {
        ruleChainId: 'rule-chain-1',
        firstNodeIndex: 0,
        nodes: [
          {
            id: 'rule-node-1',
            createdTime: 1234567890,
            ruleChainId: 'rule-chain-1',
            name: 'Filter Node',
            debugMode: false,
            singletonMode: true,
            type: 'FILTER',
            configuration: {
              filterType: 'JS',
              jsScript: 'return msg.temperature > 25;',
            },
            additionalInfo: {
              description: 'Temperature filter node',
            },
          },
        ],
        connections: [],
        ruleChainConnections: [],
      };
      const testData: RuleChainMetaData = {
        ruleChainId: 'rule-chain-1',
        firstNodeIndex: 0,
        nodes: [
          {
            id: 'rule-node-1',
            createdTime: 1234567890,
            ruleChainId: 'rule-chain-1',
            name: 'Filter Node',
            debugMode: false,
            singletonMode: true,
            type: 'FILTER',
            configuration: {
              filterType: 'JS',
              jsScript: 'return msg.temperature > 25;',
            },
            additionalInfo: {
              description: 'Temperature filter node',
            },
          },
        ],
        connections: [],
        ruleChainConnections: [],
      };
      const updateRelated = true;
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await saveRuleChainMetaData(testData, updateRelated);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/ruleChain/metadata',
        data: testData,
        params: { updateRelated },
      });
      expect(result).toEqual(mockResponse);
    });

    it('should use default updateRelated value', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse: RuleChainMetaData = {
        ruleChainId: 'rule-chain-1',
        firstNodeIndex: 0,
        nodes: [],
        connections: [],
        ruleChainConnections: [],
      };
      const testData: RuleChainMetaData = {
        ruleChainId: 'rule-chain-1',
        firstNodeIndex: 0,
        nodes: [],
        connections: [],
        ruleChainConnections: [],
      };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await saveRuleChainMetaData(testData);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/ruleChain/metadata',
        data: testData,
        params: { updateRelated: true },
      });
      expect(result).toEqual(mockResponse);
    });

    it('should handle any data type', async () => {
      const { defHttp } = await import('/@/utils/http/axios');
      const mockResponse = { success: true };
      const testData = { ruleChainId: 'rule-chain-1', nodes: [] };
      vi.mocked(defHttp.postJson).mockResolvedValue(mockResponse);

      const result = await saveRuleChainMetaData(testData);

      expect(defHttp.postJson).toHaveBeenCalledWith({
        url: '/api/ruleChain/metadata',
        data: testData,
        params: { updateRelated: true },
      });
      expect(result).toEqual(mockResponse);
    });
  });

  describe('Type definitions', () => {
    it('should create RuleChain object with all fields', () => {
      const ruleChain: RuleChain = {
        id: 'rule-chain-1',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        name: 'Main Rule Chain',
        type: 'CORE',
        root: true,
        debugMode: false,
        firstRuleNodeId: 'rule-node-1',
        configuration: {
          version: '1.0',
          description: 'Main rule chain for device processing',
          settings: {
            maxExecutionTime: 30000,
            maxRetries: 3,
            timeout: 5000,
          },
        },
        externalId: 'external-rule-chain-1',
        additionalInfo: {
          tags: ['main', 'core'],
          priority: 'high',
          author: 'Development Team',
          lastModified: '2023-01-01T00:00:00Z',
        },
      };

      expect(ruleChain.id).toBe('rule-chain-1');
      expect(ruleChain.createdTime).toBe(1234567890);
      expect(ruleChain.tenantId).toBe('tenant-1');
      expect(ruleChain.name).toBe('Main Rule Chain');
      expect(ruleChain.type).toBe('CORE');
      expect(ruleChain.root).toBe(true);
      expect(ruleChain.debugMode).toBe(false);
      expect(ruleChain.firstRuleNodeId).toBe('rule-node-1');
      expect(ruleChain.configuration.version).toBe('1.0');
      expect(ruleChain.configuration.description).toBe('Main rule chain for device processing');
      expect(ruleChain.configuration.settings?.maxExecutionTime).toBe(30000);
      expect(ruleChain.configuration.settings?.maxRetries).toBe(3);
      expect(ruleChain.configuration.settings?.timeout).toBe(5000);
      expect(ruleChain.externalId).toBe('external-rule-chain-1');
      expect(ruleChain.additionalInfo?.tags).toEqual(['main', 'core']);
      expect(ruleChain.additionalInfo?.priority).toBe('high');
      expect(ruleChain.additionalInfo?.author).toBe('Development Team');
      expect(ruleChain.additionalInfo?.lastModified).toBe('2023-01-01T00:00:00Z');
    });

    it('should create RuleChain object with EDGE type', () => {
      const ruleChain: RuleChain = {
        id: 'rule-chain-2',
        createdTime: 1234567891,
        tenantId: 'tenant-1',
        name: 'Edge Rule Chain',
        type: 'EDGE',
        root: false,
        debugMode: true,
        firstRuleNodeId: 'rule-node-2',
        configuration: {
          version: '2.0',
          description: 'Edge rule chain for local processing',
          edgeSettings: {
            offlineMode: true,
            syncInterval: 60000,
            maxQueueSize: 1000,
          },
        },
        externalId: 'external-rule-chain-2',
        additionalInfo: {
          tags: ['edge', 'local'],
          priority: 'medium',
        },
      };

      expect(ruleChain.id).toBe('rule-chain-2');
      expect(ruleChain.createdTime).toBe(1234567891);
      expect(ruleChain.tenantId).toBe('tenant-1');
      expect(ruleChain.name).toBe('Edge Rule Chain');
      expect(ruleChain.type).toBe('EDGE');
      expect(ruleChain.root).toBe(false);
      expect(ruleChain.debugMode).toBe(true);
      expect(ruleChain.firstRuleNodeId).toBe('rule-node-2');
      expect(ruleChain.configuration.version).toBe('2.0');
      expect(ruleChain.configuration.description).toBe('Edge rule chain for local processing');
      expect(ruleChain.configuration.edgeSettings?.offlineMode).toBe(true);
      expect(ruleChain.configuration.edgeSettings?.syncInterval).toBe(60000);
      expect(ruleChain.configuration.edgeSettings?.maxQueueSize).toBe(1000);
      expect(ruleChain.externalId).toBe('external-rule-chain-2');
      expect(ruleChain.additionalInfo?.tags).toEqual(['edge', 'local']);
      expect(ruleChain.additionalInfo?.priority).toBe('medium');
    });

    it('should create RuleNode object', () => {
      const ruleNode: RuleNode = {
        id: 'rule-node-1',
        createdTime: 1234567890,
        ruleChainId: 'rule-chain-1',
        name: 'Filter Node',
        debugMode: false,
        singletonMode: true,
        type: 'FILTER',
        configuration: {
          filterType: 'JS',
          jsScript: 'return msg.temperature > 25;',
          inputType: 'JSON',
          outputType: 'JSON',
        },
        additionalInfo: {
          description: 'Temperature filter node',
          author: 'Development Team',
          version: '1.0',
          tags: ['filter', 'temperature'],
        },
      };

      expect(ruleNode.id).toBe('rule-node-1');
      expect(ruleNode.createdTime).toBe(1234567890);
      expect(ruleNode.ruleChainId).toBe('rule-chain-1');
      expect(ruleNode.name).toBe('Filter Node');
      expect(ruleNode.debugMode).toBe(false);
      expect(ruleNode.singletonMode).toBe(true);
      expect(ruleNode.type).toBe('FILTER');
      expect(ruleNode.configuration.filterType).toBe('JS');
      expect(ruleNode.configuration.jsScript).toBe('return msg.temperature > 25;');
      expect(ruleNode.configuration.inputType).toBe('JSON');
      expect(ruleNode.configuration.outputType).toBe('JSON');
      expect(ruleNode.additionalInfo?.description).toBe('Temperature filter node');
      expect(ruleNode.additionalInfo?.author).toBe('Development Team');
      expect(ruleNode.additionalInfo?.version).toBe('1.0');
      expect(ruleNode.additionalInfo?.tags).toEqual(['filter', 'temperature']);
    });

    it('should create RuleChainMetaData object', () => {
      const ruleChainMetaData: RuleChainMetaData = {
        ruleChainId: 'rule-chain-1',
        firstNodeIndex: 0,
        nodes: [
          {
            id: 'rule-node-1',
            createdTime: 1234567890,
            ruleChainId: 'rule-chain-1',
            name: 'Filter Node',
            debugMode: false,
            singletonMode: true,
            type: 'FILTER',
            configuration: {
              filterType: 'JS',
              jsScript: 'return msg.temperature > 25;',
            },
            additionalInfo: {
              description: 'Temperature filter node',
            },
          },
          {
            id: 'rule-node-2',
            createdTime: 1234567891,
            ruleChainId: 'rule-chain-1',
            name: 'Transform Node',
            debugMode: false,
            singletonMode: true,
            type: 'TRANSFORM',
            configuration: {
              transformType: 'JS',
              jsScript: 'msg.temperature = msg.temperature * 1.8 + 32;',
            },
            additionalInfo: {
              description: 'Temperature conversion node',
            },
          },
        ],
        connections: [
          { fromIndex: 0, toIndex: 1, type: 'SUCCESS' },
          { fromIndex: 0, toIndex: 1, type: 'FAILURE' },
        ],
        ruleChainConnections: [
          {
            fromIndex: 1,
            type: 'SUCCESS',
            targetRuleChainId: 'rule-chain-2',
            additionalInfo: {
              description: 'Forward to secondary chain',
              condition: 'msg.temperature > 100',
            },
          },
        ],
      };

      expect(ruleChainMetaData.ruleChainId).toBe('rule-chain-1');
      expect(ruleChainMetaData.firstNodeIndex).toBe(0);
      expect(ruleChainMetaData.nodes).toHaveLength(2);
      expect(ruleChainMetaData.nodes?.[0]?.id).toBe('rule-node-1');
      expect(ruleChainMetaData.nodes?.[0]?.name).toBe('Filter Node');
      expect(ruleChainMetaData.nodes?.[0]?.type).toBe('FILTER');
      expect(ruleChainMetaData.nodes?.[1]?.id).toBe('rule-node-2');
      expect(ruleChainMetaData.nodes?.[1]?.name).toBe('Transform Node');
      expect(ruleChainMetaData.nodes?.[1]?.type).toBe('TRANSFORM');
      expect(ruleChainMetaData.connections).toHaveLength(2);
      expect(ruleChainMetaData.connections?.[0]?.fromIndex).toBe(0);
      expect(ruleChainMetaData.connections?.[0]?.toIndex).toBe(1);
      expect(ruleChainMetaData.connections?.[0]?.type).toBe('SUCCESS');
      expect(ruleChainMetaData.connections?.[1]?.fromIndex).toBe(0);
      expect(ruleChainMetaData.connections?.[1]?.toIndex).toBe(1);
      expect(ruleChainMetaData.connections?.[1]?.type).toBe('FAILURE');
      expect(ruleChainMetaData.ruleChainConnections).toHaveLength(1);
      expect(ruleChainMetaData.ruleChainConnections?.[0]?.fromIndex).toBe(1);
      expect(ruleChainMetaData.ruleChainConnections?.[0]?.type).toBe('SUCCESS');
      expect(ruleChainMetaData.ruleChainConnections?.[0]?.targetRuleChainId).toBe('rule-chain-2');
      expect(ruleChainMetaData.ruleChainConnections?.[0]?.additionalInfo?.description).toBe('Forward to secondary chain');
      expect(ruleChainMetaData.ruleChainConnections?.[0]?.additionalInfo?.condition).toBe('msg.temperature > 100');
    });

    it('should create RuleChainOutputLabelsUsage object', () => {
      const ruleChainOutputLabelsUsage: RuleChainOutputLabelsUsage = {
        ruleChainId: 'rule-chain-1',
        ruleNodeId: 'rule-node-1',
        ruleChainName: 'Main Rule Chain',
        ruleNodeName: 'Filter Node',
        labels: ['success', 'failure', 'timeout'],
      };

      expect(ruleChainOutputLabelsUsage.ruleChainId).toBe('rule-chain-1');
      expect(ruleChainOutputLabelsUsage.ruleNodeId).toBe('rule-node-1');
      expect(ruleChainOutputLabelsUsage.ruleChainName).toBe('Main Rule Chain');
      expect(ruleChainOutputLabelsUsage.ruleNodeName).toBe('Filter Node');
      expect(ruleChainOutputLabelsUsage.labels).toEqual(['success', 'failure', 'timeout']);
    });

    it('should handle complex rule chain configurations', () => {
      const complexRuleChain: RuleChain = {
        id: 'complex-rule-chain',
        createdTime: 1234567890,
        tenantId: 'tenant-1',
        name: 'Complex Processing Chain',
        type: 'CORE',
        root: false,
        debugMode: true,
        firstRuleNodeId: 'rule-node-1',
        configuration: {
          version: '3.0',
          description: 'Complex rule chain with multiple processing stages',
          stages: [
            {
              name: 'Input Validation',
              nodes: ['filter-node-1', 'filter-node-2'],
              timeout: 5000,
            },
            {
              name: 'Data Processing',
              nodes: ['transform-node-1', 'enrich-node-1'],
              timeout: 10000,
            },
            {
              name: 'Output Generation',
              nodes: ['output-node-1', 'notification-node-1'],
              timeout: 3000,
            },
          ],
          errorHandling: {
            maxRetries: 3,
            retryDelay: 1000,
            fallbackChain: 'fallback-rule-chain',
          },
          monitoring: {
            enabled: true,
            metrics: ['execution-time', 'success-rate', 'error-rate'],
            alerts: {
              highErrorRate: 0.1,
              slowExecution: 30000,
            },
          },
        },
        externalId: 'external-complex-rule-chain',
        additionalInfo: {
          tags: ['complex', 'processing', 'monitored'],
          priority: 'high',
          author: 'Platform Team',
          lastModified: '2023-01-01T00:00:00Z',
          documentation: 'https://docs.example.com/rule-chains/complex',
          dependencies: ['rule-chain-2', 'rule-chain-3'],
        },
      };

      expect(complexRuleChain.id).toBe('complex-rule-chain');
      expect(complexRuleChain.createdTime).toBe(1234567890);
      expect(complexRuleChain.tenantId).toBe('tenant-1');
      expect(complexRuleChain.name).toBe('Complex Processing Chain');
      expect(complexRuleChain.type).toBe('CORE');
      expect(complexRuleChain.root).toBe(false);
      expect(complexRuleChain.debugMode).toBe(true);
      expect(complexRuleChain.firstRuleNodeId).toBe('rule-node-1');
      expect(complexRuleChain.configuration.version).toBe('3.0');
      expect(complexRuleChain.configuration.description).toBe('Complex rule chain with multiple processing stages');
      expect(complexRuleChain.configuration.stages).toHaveLength(3);
      expect(complexRuleChain.configuration.stages?.[0]?.name).toBe('Input Validation');
      expect(complexRuleChain.configuration.stages?.[0]?.nodes).toEqual(['filter-node-1', 'filter-node-2']);
      expect(complexRuleChain.configuration.stages?.[0]?.timeout).toBe(5000);
      expect(complexRuleChain.configuration.stages?.[1]?.name).toBe('Data Processing');
      expect(complexRuleChain.configuration.stages?.[1]?.nodes).toEqual(['transform-node-1', 'enrich-node-1']);
      expect(complexRuleChain.configuration.stages?.[1]?.timeout).toBe(10000);
      expect(complexRuleChain.configuration.stages?.[2]?.name).toBe('Output Generation');
      expect(complexRuleChain.configuration.stages?.[2]?.nodes).toEqual(['output-node-1', 'notification-node-1']);
      expect(complexRuleChain.configuration.stages?.[2]?.timeout).toBe(3000);
      expect(complexRuleChain.configuration.errorHandling?.maxRetries).toBe(3);
      expect(complexRuleChain.configuration.errorHandling?.retryDelay).toBe(1000);
      expect(complexRuleChain.configuration.errorHandling?.fallbackChain).toBe('fallback-rule-chain');
      expect(complexRuleChain.configuration.monitoring?.enabled).toBe(true);
      expect(complexRuleChain.configuration.monitoring?.metrics).toEqual(['execution-time', 'success-rate', 'error-rate']);
      expect(complexRuleChain.configuration.monitoring?.alerts?.highErrorRate).toBe(0.1);
      expect(complexRuleChain.configuration.monitoring?.alerts?.slowExecution).toBe(30000);
      expect(complexRuleChain.externalId).toBe('external-complex-rule-chain');
      expect(complexRuleChain.additionalInfo?.tags).toEqual(['complex', 'processing', 'monitored']);
      expect(complexRuleChain.additionalInfo?.priority).toBe('high');
      expect(complexRuleChain.additionalInfo?.author).toBe('Platform Team');
      expect(complexRuleChain.additionalInfo?.lastModified).toBe('2023-01-01T00:00:00Z');
      expect(complexRuleChain.additionalInfo?.documentation).toBe('https://docs.example.com/rule-chains/complex');
      expect(complexRuleChain.additionalInfo?.dependencies).toEqual(['rule-chain-2', 'rule-chain-3']);
    });
  });
});