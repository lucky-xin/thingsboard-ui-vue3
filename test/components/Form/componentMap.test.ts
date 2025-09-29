import { describe, it, expect } from 'vitest';
import { h, defineComponent } from 'vue';
import { componentMap, add, del } from '/@/components/Form/src/componentMap';

const Dummy = defineComponent({ name: 'DummyComp', setup: () => () => h('div', 'dummy') });

describe('components/Form/componentMap', () => {
  it('should add a component to componentMap', () => {
    add('None', Dummy as any);
    expect(componentMap.get('None')).toBe(Dummy);
  });

  it('should delete a component from componentMap', () => {
    add('Divider', Dummy as any);
    expect(componentMap.get('Divider')).toBe(Dummy);
    del('Divider');
    expect(componentMap.get('Divider')).not.toBe(Dummy);
  });
});
