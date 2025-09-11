import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const account: AppRouteModule = {
  path: '/account',
  name: 'Account',
  component: LAYOUT,
  redirect: '/account/center',
  meta: {
    icon: 'i-ion:person-outline',
    hideMenu: true,
    title: t('sys.account.center'),
    orderNo: 100000,
  },
  children: [
    {
      path: 'center',
      name: 'AccountCenter',
      component: () => import('/@/layouts/views/account/center.vue'),
      meta: {
        icon: 'i-ion:person-outline',
        hideMenu: true,
        title: t('sys.account.center'),
      },
    },
    {
      path: 'modPwd',
      name: 'AccountModPwd',
      component: () => import('/@/layouts/views/account/modPwd.vue'),
      meta: {
        icon: 'i-ant-design:key-outlined',
        hideMenu: true,
        title: t('sys.account.modifyPwd'),
      },
    },
  ],
};

export default account;
