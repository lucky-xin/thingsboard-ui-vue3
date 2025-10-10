import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock defHttp
vi.mock('/@/utils/http/axios', () => ({
  defHttp: {
    get: vi.fn(),
  },
}));

// Mock enums
vi.mock('/@/enums/componentEnum', () => ({
  ComponentDescriptorType: {
    FILTER: 'FILTER',
    TRANSFORM: 'TRANSFORM',
    ACTION: 'ACTION',
  },
}));

describe('componentDescriptor', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should call getComponentDescriptorList with correct parameters', async () => {
    const { defHttp } = await import('/@/utils/http/axios');
    const { ComponentDescriptorType } = await import('/@/enums/componentEnum');
    const { getComponentDescriptorList } = await import('/@/api/tb/componentDescriptor');

    const mockResponse = [
      {
        id: '1',
        name: 'Test Component',
        clazz: 'com.test.Component',
        type: ComponentDescriptorType.FILTER,
        scope: 'SYSTEM',
        clusteringMode: 'SINGLETON',
        configurationVersion: 1,
        configurationDescriptor: {
          nodeDefinition: {
            configDirective: 'test-directive',
            customRelations: false,
            defaultConfiguration: {},
            description: 'Test component',
            details: 'Test details',
            docUrl: 'https://test.com',
            icon: 'test-icon',
            iconUrl: 'https://test.com/icon',
            inEnabled: true,
            outEnabled: true,
            relationTypes: [],
            ruleChainNode: true,
          },
        },
        createdTime: 1234567890,
      },
    ];

    vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

    const result = await getComponentDescriptorList(
      [ComponentDescriptorType.FILTER, ComponentDescriptorType.TRANSFORM],
      'CORE'
    );

    expect(defHttp.get).toHaveBeenCalledWith({
      url: '/api/components',
      params: {
        componentTypes: 'FILTER,TRANSFORM',
        ruleChainType: 'CORE',
      },
    });
    expect(result).toEqual(mockResponse);
  });

  it('should call getComponentDescriptorByClazz with correct parameters', async () => {
    const { defHttp } = await import('/@/utils/http/axios');
    const { getComponentDescriptorByClazz } = await import('/@/api/tb/componentDescriptor');

    const mockResponse = {
      id: '1',
      name: 'Test Component',
      clazz: 'com.test.Component',
      type: 'FILTER',
      scope: 'SYSTEM',
      clusteringMode: 'SINGLETON',
      configurationVersion: 1,
      configurationDescriptor: {
        nodeDefinition: {
          configDirective: 'test-directive',
          customRelations: false,
          defaultConfiguration: {},
          description: 'Test component',
          details: 'Test details',
          docUrl: 'https://test.com',
          icon: 'test-icon',
          iconUrl: 'https://test.com/icon',
          inEnabled: true,
          outEnabled: true,
          relationTypes: [],
          ruleChainNode: true,
        },
      },
      createdTime: 1234567890,
    };

    vi.mocked(defHttp.get).mockResolvedValue(mockResponse);

    const result = await getComponentDescriptorByClazz('com.test.Component');

    expect(defHttp.get).toHaveBeenCalledWith({
      url: '/api/components/com.test.Component',
    });
    expect(result).toEqual(mockResponse);
  });

  it('should handle empty component types array', async () => {
    const { defHttp } = await import('/@/utils/http/axios');
    const { ComponentDescriptorType } = await import('/@/enums/componentEnum');
    const { getComponentDescriptorList } = await import('/@/api/tb/componentDescriptor');

    vi.mocked(defHttp.get).mockResolvedValue([]);

    const result = await getComponentDescriptorList([], 'EDGE');

    expect(defHttp.get).toHaveBeenCalledWith({
      url: '/api/components',
      params: {
        componentTypes: '',
        ruleChainType: 'EDGE',
      },
    });
    expect(result).toEqual([]);
  });

  it('should handle single component type', async () => {
    const { defHttp } = await import('/@/utils/http/axios');
    const { ComponentDescriptorType } = await import('/@/enums/componentEnum');
    const { getComponentDescriptorList } = await import('/@/api/tb/componentDescriptor');

    vi.mocked(defHttp.get).mockResolvedValue([]);

    const result = await getComponentDescriptorList([ComponentDescriptorType.ACTION], 'CORE');

    expect(defHttp.get).toHaveBeenCalledWith({
      url: '/api/components',
      params: {
        componentTypes: 'ACTION',
        ruleChainType: 'CORE',
      },
    });
    expect(result).toEqual([]);
  });

  it('should handle edge case with special characters in clazz', async () => {
    const { defHttp } = await import('/@/utils/http/axios');
    const { getComponentDescriptorByClazz } = await import('/@/api/tb/componentDescriptor');

    vi.mocked(defHttp.get).mockResolvedValue({});

    const result = await getComponentDescriptorByClazz('com.test.Special$Component');

    expect(defHttp.get).toHaveBeenCalledWith({
      url: '/api/components/com.test.Special$Component',
    });
    expect(result).toEqual({});
  });
});