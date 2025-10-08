import type { App } from 'vue';
import { Button } from './Button';
import { Input } from 'ant-design-vue';

export function registerGlobComp(app: App) {
  // Check if Input and Button have install methods before using them as plugins
  if (Input && typeof (Input as any).install === 'function') {
    app.use(Input);
  }
  if (Button && typeof (Button as any).install === 'function') {
    app.use(Button);
  }
}
