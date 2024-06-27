/**
 * Created by OXOYO on 2019/5/29.
 *
 * 多语言
 */
import { createI18n } from 'vue-i18n'
import langs from './langs'

export default function (app, config) {
  const $X = app.config.globalProperties.$X
  let defLocale
  let locales
  if (typeof locales === 'object' && locales instanceof Object) {
    defLocale = config.hasOwnProperty('defLocale') ? config.defLocale : null
    locales = config.hasOwnProperty('locales') ? config.locales : null
  }
  // 合并语言包
  const langData = langs.data
  if (typeof locales === 'object' && locales instanceof Object) {
    Object.keys(locales).forEach(key => {
      if (langData.hasOwnProperty(key)) {
        langData[key] = {
          ...langData[key],
          ...locales[key]
        }
      } else {
        langData[key] = locales[key]
      }
    })
  }
  // 默认语言
  defLocale = $X.utils.storage.get('locale', $X.config.storage.prefix) || defLocale || Object.keys(langData)[0]
  
  // i18n实例
  const i18nInstance = createI18n({
    locale: defLocale,
    messages: langData,
    legacy: false,
    globalInjection: true, // 全局注册$t方法
  })
  return i18nInstance
}
