/**
 * Created by OXOYO on 2019/5/29.
 *
 * 全局组件
 */

import {
  ElMenu as Menu,
  ElMenuItem as MenuItem,
  ElTooltip as Tooltip,
  ElDivider as Divider,
  ElInputNumber as InputNumber,
  ElDropdown as Dropdown,
  ElDropdownMenu as DropdownMenu,
  ElDropdownItem as DropdownItem,
  ElIcon as Icon,
  ElMessage as Message,
  ElDialog as Modal,
  ElInput as Input,
  ElForm as Form,
  ElFormItem as FormItem,
  ElSlider as Slider,
  ElSelect as Select,
  ElOption as Option,
  ElButton as Button,
  ElTable as Table,
  ElTableColumn as TableColumn
} from 'element-plus'

import PickColors from 'vue-pick-colors'

import XIcon from './Icon/Index.vue'
import XTooltip from './Tooltip/Index.vue'
import XDivider from './Divider/Index.vue'
import XColorPicker from './ColorPicker/Index.vue'
import XNoData from './NoData/Index.vue'

const obj = {
  // ui组件
  Menu,
  MenuItem,
  Tooltip,
  Divider,
  InputNumber,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Icon,
  Message,
  Modal,
  Input,
  Form,
  FormItem,
  Slider,
  Select,
  Option,
  Button,
  Table,
  TableColumn,
  // 颜色选择器
  SketchPicker: PickColors,
  // 自定义组件
  XIcon,
  XTooltip,
  XDivider,
  XColorPicker,
  XNoData
}

const components = {}
components.install = function (app, options) {
  for (const name in obj) {
    if (name && obj[name]) {
      app.component(name, obj[name])
      if (['Message', 'Modal'].includes(name)) {
        console.log(app.config.globalProperties)
        app.config.globalProperties[`$${name}`] = obj[name]
      }
    }
  }
}

export default components
