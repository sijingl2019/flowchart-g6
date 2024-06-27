<script setup>
import { RouterLink, RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
function flowWindow(href) {
  window.open(href,"_blank")
}
</script>

<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo menu"
      mode="horizontal"
    >
      <el-menu-item index="1"><RouterLink to="/">Home</RouterLink></el-menu-item>
      <el-menu-item index="2"><RouterLink to="/about">About</RouterLink></el-menu-item>
      <el-menu-item index="3"><RouterLink to="/login">User</RouterLink></el-menu-item>
      <el-menu-item index="4"><RouterLink to="/flow">Flow</RouterLink></el-menu-item>
    </el-menu>
    <RouterView /> 
  </div>
<!-- <header>
  <div class="wrapper">
      <HelloWorld :msg="$t('L10454')" />
      <nav>
        
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/login">User</RouterLink>
        <RouterLink to="/flow" v-slot="{href}">
          <div class="hot-item" @click="flowWindow(href)">
            Flow
          </div>
        </RouterLink>
      </nav>
    </div>
  </header>
  <RouterView /> -->
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

header .menu {
    height: 40px;
}

/* nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
} */
</style>
