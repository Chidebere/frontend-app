<template>
  <div id="app">
      <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      headerNavebar: 'div'
    }
  },
  watch: {
    $route (to, from) {
      document.title = to.meta.title || 'TVZ test'
    },
    immediate: true
  }
}
</script>
