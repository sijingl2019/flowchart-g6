<style scoped lang="less" rel="stylesheet/less">
  .materials-editor {
    display: inline-block;
    width: 100%;
    height: 100%;
    user-select: none;
    overflow: hidden;
    background: #f8f9fa;
  }
</style>
<template>
    <ToolBar :editorData="editorData" :toolList="toolList" :currentItem="currentItem"></ToolBar>
    <Sketchpad></Sketchpad>
</template>
<script>
import ToolBar from './containers/ToolBar.vue';
  // import utils from '@/global/g6/utils'
  // 扩展了节点、边的G6
  // import G6 from '@/global/g6/index'
  // import * as G6Util from '@antv/util'
  // 自定义栅格插件
  // import XGrid from '@/global/g6/plugins/XGrid'
  // 背景图
  // import XBackground from '@/global/g6/plugins/XBackground'
  // 全屏
  // import screenfull from 'screenfull'
  // 热键
  // import Mousetrap from 'mousetrap'
export default {
  components: {
    ToolBar
  },
    props: {
      maxLogSize: {
        type: Number,
        default: 20
      }
    },
    data () {
      return {
        editorInfo: {},
        defInfo: {
          // 编辑器状态：add || edit || preview
          status: 'add'
        },
        editor: null,
        mode: 'edit',
        isFullScreen: false,
        clipboard: {
          data: null,
          // 粘贴计数器
          count: 0
        },
        // 工具列表
        toolList: [],
        // 快捷键列表
        shortcutMap: {},
        // 物料列表
        materialList: [],
        // 当前激活元素
        currentItem: []
      }
    },
    computed: {
      editorData () {
        return this.editor && this.editor.$D ? this.editor.$D : null
      },
      editorConfig () {
        return this.editor && this.editor.$C ? this.editor.$C : null
      }
    },
  methods: {
    init () {
      const _t = this
        // 初始化存储数据
        const { toolList, shortcutMap } = _t.$X.config.tools
        console.log(toolList, 'tool list')
        const materials = _t.$X.config.materials
        _t.toolList = toolList
        _t.shortcutMap = shortcutMap
        _t.materialList = materials
        // _t.$X.utils.storage.set('toolList', toolList, _t.$X.config.storage.prefix)
        // _t.$X.utils.storage.set('shortcutMap', shortcutMap, _t.$X.config.storage.prefix)
        // _t.$X.utils.storage.set('materials', materials, _t.$X.config.storage.prefix)
        // _t.$X.utils.storage.set('log', {
        //   current: null,
        //   list: []
        // }, _t.$X.config.storage.prefix)
        // const el = _t.$el
        // // 画板
        // const sketchpad = el.querySelector('#sketchpad')
        // const plugins = []
        // if (_t.$X.config.infoPanel.navigator.enable) {
        //   // 导航器
        //   const navigator = el.querySelector('#navigator')
        //   // const size = [300, 200]
        //   const size = [
        //     navigator.clientWidth,
        //     parseInt(navigator.clientWidth * sketchpad.clientHeight / sketchpad.clientWidth)
        //   ]
        //   const navigatorConfig = _t.$X.config.infoPanel.navigator.config || {}
        //   const minimap = new G6.Minimap({
        //     container: navigator,
        //     // FIXME 【BUG】type 为 keyShape 时导航图中元素显示错位，暂改为 delegate
        //     type: 'delegate',
        //     size: size,
        //     delegateStyle: {
        //       fill: '#ffffff',
        //       stroke: '#000000'
        //     },
        //     ...navigatorConfig
        //   })
        //   plugins.push(minimap)
        // }
        // const grid = new G6.Grid()
        // const minimap = new G6.Minimap({
        //   size: [100, 100],
        //   className: 'minimap',
        //   type: 'delegate',
        // });
        // const background = new XBackground()
        // plugins.push(grid)
        // plugins.push(background)
        // plugins.push(minimap)
        // // 生成编辑器实例
        // _t.editor = new G6.Graph({
        //   plugins,
        //   container: sketchpad,
        //   width: sketchpad.clientWidth,
        //   height: sketchpad.clientHeight,
        //   fitView: true,
        //   fitViewPadding: 20,
        //   autoPaint: true,
        //   // renderer: 'svg',
        //   // 模式
        //   modes: {
        //     edit: [
        //       {
        //         type: 'node-control',
        //         config: {
        //           shapeControlPoint: {
        //             // 是否在缩放、旋转节点时更新所有与之相连的边
        //             updateEdge: false
        //           },
        //           dragNode: {
        //             // 是否在拖拽节点时更新所有与之相连的边
        //             updateEdge: false
        //           },
        //           // 是否支持在节点上添加文本
        //           nodeLabel: true,
        //           // 是否支持在边上添加文本
        //           edgeLabel: true,
        //           // tooltip 是否启用
        //           tooltip: {
        //             shapeControl: true,
        //             dragNode: true,
        //             dragEdge: true
        //           },
        //           // 是否启用对齐线
        //           alignLine: {
        //             enable: true,
        //             style: {
        //               stroke: '#FFA500',
        //               lineWidth: 1
        //             }
        //           }
        //         }
        //       }
        //     ],
        //     // 只读，
        //     preview: [
        //       'zoom-canvas',
        //       'drag-canvas',
        //       'preview-canvas'
        //     ]
        //   },
        //   // 分组样式
        //   groupType: 'rect',
        //   groupStyle: {
        //     default: {
        //       lineWidth: 1,
        //       stroke: '#29B6F2',
        //       // lineDash: [ 5, 5 ],
        //       strokeOpacity: 1,
        //       fill: '#29B6F2',
        //       fillOpacity: 0.1,
        //       opacity: 1,
        //       minDis: 0,
        //       maxDis: 0
        //     }
        //   }
        // })
        // // 挂载G6配置
        // _t.editor.$C = G6.$C
        // // 挂载编辑器$D命名空间，用于Vue组件与Graph之间传值
        // _t.editor.$D = {
        //   fill: '#FFFFFF',
        //   fillOpacity: 1,
        //   lineColor: '#000000',
        //   strokeOpacity: 1,
        //   lineWidth: 1,
        //   lineType: 'x-line',
        //   lineDash: 'solid',
        //   startArrow: false,
        //   endArrow: false,
        //   lineAppendWidth: 10,
        //   autoRotate: true
        // }
        // // 关闭局部渲染
        // // _t.editor.get('canvas').set('localRefresh', false)
        // // 设置模式为编辑
        // _t.doSetMode('edit')
        // // 绑定事件
        // _t.editor.on('canvas:mousedown', _t._canvasMousedown)
        // // 绑定事件
        // _t.editor.on('node:mousedown', _t._nodeMousedown)
        // _t.editor.on('node:mouseover', _t._nodeHover)
        // _t.editor.on('node:mouseout', _t._nodeOut)
        // _t.editor.on('edge:mousedown', _t._edgeMousedown)
        // _t.editor.on('editor:getItem', function (data) {
        //   _t.currentItem = data
        // })
        // _t.editor.on('editor:setItem', function (data) {
        //   data.forEach((item, index) => {
        //     const model = item.model
        //     // if (item.type === 'edge') {
        //     //   TODO 处理箭头
        //     // }
        //     const shapeItem = _t.editor.findById(item.id)
        //     if (!index) {
        //       // 更新第一个节点
        //       _t.editor.updateItem(shapeItem, model)
        //     } else {
        //       // FIXME 更新同组节点，只更新样式部分
        //       _t.editor.updateItem(shapeItem, {
        //         style: data[0].model.style
        //       })
        //     }
        //   })
        //   _t.editor.paint()
        // })
        // _t.editor.on('editor:contextmenu', function (data) {
        //   _t.$X.utils.bus.$emit('editor/contextmenu/open', data)
        // })
        // _t.editor.on('editor:record', function (from) {
        //   // console.log('editor:record from', from)
        //   // 更新操作日志
        //   _t.doUpdateLog({
        //     action: 'record',
        //     data: {
        //       time: new Date(),
        //       content: _t.editor.save()
        //     }
        //   })
        // })
        // // 绑定热键
        // _t.bindShortcuts()
        // // 绑定unload
        // _t.bindUnload()
    }
  },
  created() {
    console.log(this.$X.config, 'config')
    let _t = this
    _t.$nextTick(() => {
      _t.init()
    })
  }
}
</script>