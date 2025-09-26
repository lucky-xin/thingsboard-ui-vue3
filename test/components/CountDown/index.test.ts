import { describe, it, expect, vi } from 'vitest';
import { App } from 'vue';

// Mock the withInstall utility
vi.mock('/@/utils', () => ({
  withInstall: vi.fn((component) => {
    const wrappedComponent = component;
    wrappedComponent.install = vi.fn((app: App) => {
      app.component(component.name || 'MockComponent', component);
    });
    return wrappedComponent;
  }),
}));

// Mock the CountButton component
vi.mock('./src/CountButton.vue', () => ({
  default: {
    name: 'CountButton',
    props: {
      value: [String, Number],
      count: Number,
      beforeStartFunc: Function,
      type: String,
      size: String,
      disabled: Boolean,
      loading: Boolean,
    },
    emits: ['update:value', 'change', 'end'],
    setup() {
      return {};
    },
    template: '<button class="count-button">CountButton Component</button>',
  },
}));

// Mock the CountdownInput component
vi.mock('./src/CountdownInput.vue', () => ({
  default: {
    name: 'CountdownInput',
    props: {
      value: [String, Number],
      count: Number,
      sendCodeApi: Function,
      placeholder: String,
      size: String,
      disabled: Boolean,
    },
    emits: ['update:value', 'change', 'send'],
    setup() {
      return {};
    },
    template: '<div class="countdown-input">CountdownInput Component</div>',
  },
}));

describe('CountDown/index', () => {
  it('should export CountdownInput and CountButton components with withInstall', async () => {
    const module = await import('/@/components/CountDown/index');
    
    expect(module).toBeDefined();
    expect(module.CountdownInput).toBeDefined();
    expect(module.CountButton).toBeDefined();
  });

  it('should have install method for CountdownInput', async () => {
    const module = await import('/@/components/CountDown/index');
    const { CountdownInput } = module;
    
    expect(CountdownInput.install).toBeDefined();
    expect(typeof CountdownInput.install).toBe('function');
  });

  it('should have install method for CountButton', async () => {
    const module = await import('/@/components/CountDown/index');
    const { CountButton } = module;
    
    expect(CountButton.install).toBeDefined();
    expect(typeof CountButton.install).toBe('function');
  });

  it('should install components correctly', async () => {
    const module = await import('/@/components/CountDown/index');
    const { CountdownInput, CountButton } = module;
    
    const mockApp = {
      component: vi.fn(),
    } as unknown as App;

    CountdownInput.install!(mockApp);
    CountButton.install!(mockApp);

    expect(mockApp.component).toHaveBeenCalledTimes(2);
  });

  it('should have correct component names', async () => {
    const module = await import('/@/components/CountDown/index');
    const { CountdownInput, CountButton } = module;
    
    expect(CountdownInput.name).toBe('CountdownInput');
    expect(CountButton.name).toBe('CountButton');
  });

  it('should export only CountdownInput and CountButton', async () => {
    const module = await import('/@/components/CountDown/index');
    const exports = Object.keys(module);
    
    expect(exports).toEqual(['CountdownInput', 'CountButton']);
  });

  it('should have correct props for CountButton', async () => {
    const module = await import('/@/components/CountDown/index');
    const { CountButton } = module;
    
    expect(CountButton.props).toBeDefined();
    expect(CountButton.props).toHaveProperty('value');
    expect(CountButton.props).toHaveProperty('count');
    expect(CountButton.props).toHaveProperty('beforeStartFunc');
    expect(CountButton.props).toHaveProperty('type');
    expect(CountButton.props).toHaveProperty('size');
    expect(CountButton.props).toHaveProperty('disabled');
    expect(CountButton.props).toHaveProperty('loading');
  });

  it('should have correct props for CountdownInput', async () => {
    const module = await import('/@/components/CountDown/index');
    const { CountdownInput } = module;
    
    expect(CountdownInput.props).toBeDefined();
    expect(CountdownInput.props).toHaveProperty('value');
    expect(CountdownInput.props).toHaveProperty('count');
    expect(CountdownInput.props).toHaveProperty('sendCodeApi');
    expect(CountdownInput.props).toHaveProperty('placeholder');
    expect(CountdownInput.props).toHaveProperty('size');
    expect(CountdownInput.props).toHaveProperty('disabled');
  });

  it('should have correct emits for CountButton', async () => {
    const module = await import('/@/components/CountDown/index');
    const { CountButton } = module;
    
    expect(CountButton.emits).toBeDefined();
    expect(CountButton.emits).toContain('update:value');
    expect(CountButton.emits).toContain('change');
    expect(CountButton.emits).toContain('end');
  });

  it('should have correct emits for CountdownInput', async () => {
    const module = await import('/@/components/CountDown/index');
    const { CountdownInput } = module;
    
    expect(CountdownInput.emits).toBeDefined();
    expect(CountdownInput.emits).toContain('update:value');
    expect(CountdownInput.emits).toContain('change');
    expect(CountdownInput.emits).toContain('send');
  });
});