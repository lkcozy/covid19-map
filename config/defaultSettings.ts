import { Settings as LayoutSettings } from '@ant-design/pro-layout'

export default {
  navTheme: 'dark',
  primaryColor: '#1890ff',
  layout: 'top',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  menu: {
    locale: true,
  },
  title: 'L&W Map',
  pwa: false,
  iconfontUrl: '',
  splitMenus: false,
  footerRender: false,
} as LayoutSettings & {
  pwa: boolean
}
