import { describe, it, expect, vi } from 'vitest';
import { App } from 'vue';

// Mock the withInstall utility
vi.mock('/@/utils', () => ({
  withInstall: vi.fn((component) => {
    // Create a new component object to avoid mutating the original
    const wrappedComponent = Object.assign({}, component, {
      install: vi.fn((app: App) => {
        app.component(component.name || 'MockComponent', component);
      })
    });
    return wrappedComponent;
  }),
}));

// Mock the container components
vi.mock('./src/collapse/CollapseContainer.vue', () => ({
  default: {
    name: 'CollapseContainer',
    props: {
      title: String,
      canExpand: Boolean,
      helpMessage: [String, Array],
      triggerWindowResize: Boolean,
      loading: Boolean,
      lazyTime: Number,
    },
    emits: ['expand'],
    setup() {
      return {};
    },
    template: '<div class="collapse-container">CollapseContainer Component</div>',
  },
}));

vi.mock('./src/ScrollContainer.vue', () => ({
  default: {
    name: 'ScrollContainer',
    props: {
      scrollHeight: Number,
      scrollOptions: Object,
    },
    setup() {
      return {};
    },
    template: '<div class="scroll-container">ScrollContainer Component</div>',
  },
}));

vi.mock('./src/LazyContainer.vue', () => ({
  default: {
    name: 'LazyContainer',
    props: {
      timeout: Number,
      viewport: [String, Object],
      threshold: [String, Number],
      direction: String,
      tag: String,
      maxWaitingTime: Number,
    },
    emits: ['init'],
    setup() {
      return {};
    },
    template: '<div class="lazy-container">LazyContainer Component</div>',
  },
}));

// Mock typing exports
vi.mock('./src/typing', () => ({
  LazyContainerDirection: 'LazyContainerDirection',
  ContainerScrollOptions: 'ContainerScrollOptions',
}));

describe('Container/index', () => {
  it('should export all container components with withInstall', async () => {
    const module = await import('/@/components/Container/index');
    
    expect(module).toBeDefined();
    expect(module.CollapseContainer).toBeDefined();
    expect(module.ScrollContainer).toBeDefined();
    expect(module.LazyContainer).toBeDefined();
  });

  it('should have install method for CollapseContainer', async () => {
    const module = await import('/@/components/Container/index');
    const { CollapseContainer } = module;
    
    expect(CollapseContainer.install).toBeDefined();
    expect(typeof CollapseContainer.install).toBe('function');
  });

  it('should have install method for ScrollContainer', async () => {
    const module = await import('/@/components/Container/index');
    const { ScrollContainer } = module;
    
    expect(ScrollContainer.install).toBeDefined();
    expect(typeof ScrollContainer.install).toBe('function');
  });

  it('should have install method for LazyContainer', async () => {
    const module = await import('/@/components/Container/index');
    const { LazyContainer } = module;
    
    expect(LazyContainer.install).toBeDefined();
    expect(typeof LazyContainer.install).toBeDefined();
  });

  it('should install components correctly', async () => {
    const module = await import('/@/components/Container/index');
    const { CollapseContainer, ScrollContainer, LazyContainer } = module;
    
    const mockApp = {
      component: vi.fn(),
    } as unknown as App;

    CollapseContainer.install!(mockApp);
    ScrollContainer.install!(mockApp);
    LazyContainer.install!(mockApp);

    expect(mockApp.component).toHaveBeenCalledTimes(3);
  });

  it('should have correct component names', async () => {
    const module = await import('/@/components/Container/index');
    const { CollapseContainer, ScrollContainer, LazyContainer } = module;
    
    expect(CollapseContainer.name).toBe('CollapseContainer');
    expect(ScrollContainer.name).toBe('ScrollContainer');
    expect(LazyContainer.name).toBe('LazyContainer');
  });

  it('should export typing module', async () => {
    const module = await import('/@/components/Container/index');
    
    // Just check that the module imports without error
    expect(module).toBeDefined();
  });

  it('should have correct props for CollapseContainer', async () => {
    const module = await import('/@/components/Container/index');
    const { CollapseContainer } = module;
    
    expect(CollapseContainer.props).toBeDefined();
    expect(CollapseContainer.props).toHaveProperty('title');
    expect(CollapseContainer.props).toHaveProperty('canExpand');
    expect(CollapseContainer.props).toHaveProperty('helpMessage');
    expect(CollapseContainer.props).toHaveProperty('triggerWindowResize');
    expect(CollapseContainer.props).toHaveProperty('loading');
    expect(CollapseContainer.props).toHaveProperty('lazyTime');
  });

  it('should have correct props for ScrollContainer', async () => {
    const module = await import('/@/components/Container/index');
    const { ScrollContainer } = module;
    
    expect(ScrollContainer.props).toBeDefined();
    expect(ScrollContainer.props).toHaveProperty('scrollHeight');
    expect(ScrollContainer.props).toHaveProperty('scrollOptions');
  });

  it('should have correct props for LazyContainer', async () => {
    const module = await import('/@/components/Container/index');
    const { LazyContainer } = module;
    
    expect(LazyContainer.props).toBeDefined();
    expect(LazyContainer.props).toHaveProperty('timeout');
    expect(LazyContainer.props).toHaveProperty('viewport');
    expect(LazyContainer.props).toHaveProperty('threshold');
    expect(LazyContainer.props).toHaveProperty('direction');
    expect(LazyContainer.props).toHaveProperty('tag');
    expect(LazyContainer.props).toHaveProperty('maxWaitingTime');
  });
});