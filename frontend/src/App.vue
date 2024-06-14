<template>
  <div id="app" class="app-container">
    <LeftSidebar />
    <router-view class="main-content" />
  </div>
</template>

<script>
import LeftSidebar from './components/Sidebar.vue';

export default {
  name: 'App',
  components: {
    LeftSidebar,
  },
};
</script>

<style lang="scss">
@import './css/global.scss';

.app-container {
  display: flex;
  height: 100vh;
}

.main-content {
  flex-grow: 1;
  padding: 20px;
}
</style>
