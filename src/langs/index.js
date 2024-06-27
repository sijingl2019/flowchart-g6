/**
 * Created by OXOYO on 2019/5/29.
 *
 * 语言包
 */
// 导入iview语言包
import _en from 'element-plus/dist/locale/en.js'
import _zh from 'element-plus/dist/locale/zh-cn.js'

// 导入系统语言包
import zh from './zh-CN'
import en from './en-US'
import zhCNIcon from '@/assets/images/langs/zh-CN.png'
import enUSIcon from '@/assets/images/langs/en-US.png'

export default {
  label: {
    'zh-CN': '简体中文',
    'en-US': 'English'
  },
  icon: {
    'zh-CN': zhCNIcon,
    'en-US': enUSIcon
  },
  data: {
    'zh-CN': { ..._zh, ...zh },
    'en-US': { ..._en, ...en }
  }
}
