import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'general.menu.dashboard',
    icon: 'pie-chart-outline',
    link: '/pages/dashboard',
  },
  {
    title: 'general.menu.consents_logs_group',
    group: true,
  },
  {
    title: 'general.menu.consents',
    icon: 'toggle-left-outline',
    link: '/pages/consents/register',
  },
  {
    title: 'general.menu.services',
    group: true,
  },
  {
    title: 'general.menu.availableservices',
    icon: 'grid-outline',
    link: '/pages/services/availableServices',
    home: true,
  },
  {
    title: 'general.menu.editor',
    icon: 'edit-outline',
    link: '/pages/services/service-editor',
  },
  {
    title: 'general.menu.connectors_adapters',
    group: true,
  },
  {
    title: 'general.menu.connectors',
    icon: 'link-2-outline',
    link: '/pages/services/availableConnectors',
  },
  {
    title: 'general.menu.adapters',
    icon: 'link-2-outline',
    link: '/pages/services/availableAdapters',
  },
  {
    title: 'general.menu.administration',
    group: true,
  },
  {
    title: 'general.menu.fedarated_catalogues',
    icon: 'link-2-outline',
    link: '/pages/management/federatedCatalogues',
  },
  {
    title: 'general.menu.remote_catalogues',
    icon: 'link-2-outline',
    link: '/pages/management/remoteCatalogues',
  },
  {
    title: 'general.menu.manage_configurations',
    icon: 'link-2-outline',
    link: '/pages/management/manageConfigurations',
  },
];
