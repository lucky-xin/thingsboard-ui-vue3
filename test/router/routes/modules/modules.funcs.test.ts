import { describe, it, expect } from 'vitest';
import account from '/@/router/routes/modules/account';
import desktop from '/@/router/routes/modules/desktop';
import tb from '/@/router/routes/modules/tb';

function assertModuleShape(mod: any) {
  expect(typeof mod).toBe('object');
  expect(mod).toHaveProperty('path');
  expect(mod).toHaveProperty('name');
  expect(mod).toHaveProperty('component');
  expect(mod).toHaveProperty('meta');
}

describe('router/routes/modules/* funcs surrogate', () => {
  it('account module shape', () => {
    assertModuleShape(account);
    expect(Array.isArray(account.children)).toBe(true);
  });

  it('desktop module shape', () => {
    assertModuleShape(desktop);
    expect(Array.isArray(desktop.children)).toBe(true);
  });

  it('tb module shape', () => {
    assertModuleShape(tb);
    expect(Array.isArray(tb.children)).toBe(true);
  });
});

