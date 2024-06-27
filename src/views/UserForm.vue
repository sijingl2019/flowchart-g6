<template>
    <div class="about">
      <el-form>
        <el-input v-model="name" placeholder="请输入姓名"></el-input>
        <el-input v-model="age" placeholder="请输入年龄"></el-input>
        <el-button type="primary" @click="submitForm">提交</el-button>

        <XDivider></XDivider>
        <XIcon :iconfont="iconFont"></XIcon>
        <XNoData/>
        <XTooltip content="这是一个提示">
          this is a tooltip
        </XTooltip>
        <XColorPicker v-model="fillColor" @on-change="val => handleColorChange(val, 'fillColor')"></XColorPicker>
      </el-form>
    </div>
  </template>
  <script>
export default {
  mounted() {

  },
    data() {
      return {
        name: '',
        age: '',
        iconFont: 'history',
        fillColor: '#ff00ff'
      }
    },
    methods: {
      handleColorChange(color, from) {
        console.log(color, from)
      },
      submitForm() {
        // 处理表单提交逻辑
        console.log('姓名：', this.name)
        console.log('年龄：', this.age)
      }
    }
}
</script>
  
  <style>
  @media (min-width: 1024px) {
    .about {
      min-height: 100vh;
      display: flex;
      align-items: center;
    }
  }
  </style>