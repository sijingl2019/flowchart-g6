import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus  from 'element-plus'
import utils from './global/utils'
import components from './global/components'
import config from './config'
import i18n from './i18n'
import './assets/styles/main.less'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

app.use(router)
app.use(ElementPlus)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.use(components)
config.tools = config.tools(config.system)
config.materials = config.materials()
app.config.globalProperties.$X = {
    utils,
    config
}
const i18nInstance = i18n(app)
app.use(i18nInstance)

app.mount('#app')
export {
    app
}
