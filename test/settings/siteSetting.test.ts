import { describe, it, expect } from 'vitest';
import * as siteSetting from '/@/settings/siteSetting';

describe('settings/siteSetting', () => {
  it('should export GITHUB_URL', () => {
    expect(siteSetting.GITHUB_URL).toBe('https://github.com/oliver225/thingsboard-ui-vue');
  });

  it('should export GITEE_URL', () => {
    expect(siteSetting.GITEE_URL).toBe('https://gitee.com/oliver225/thingsboard-ui-vue3');
  });

  it('should export DOC_URL', () => {
    expect(siteSetting.DOC_URL).toBe('https://thingsboard.io/docs');
  });

  it('should export SITE_URL', () => {
    expect(siteSetting.SITE_URL).toBe('http://thingsboard.yantsing.com/');
  });
});
