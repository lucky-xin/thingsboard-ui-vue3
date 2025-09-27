import { CSSProperties, VNodeChild } from 'vue';
import { createTypes, VueTypeValidableDef, VueTypesInterface } from 'vue-types';

export type VueNode = VNodeChild | JSX.Element;

interface PropTypes extends VueTypesInterface {
  readonly style: VueTypeValidableDef<CSSProperties>;
  readonly VNodeChild: VueTypeValidableDef<VueNode>;
}

const propTypes = createTypes({
  func: undefined,
  bool: undefined,
  string: undefined,
  number: undefined,
  object: undefined,
  integer: undefined,
}) as PropTypes;

// Extend using ES6+ class syntax
Object.defineProperties(propTypes, {
  style: {
    get() {
      return this.shape({
        type: [String, Object],
        default: undefined,
      });
    },
  },
  VNodeChild: {
    get() {
      return this.shape({
        type: undefined,
      });
    },
  },
});

export { propTypes };
