<script setup>
import LeftSidebar from '@/components/Sidebar.vue'
import storeInitialize from '@/stores/StoreInitialize'

const initializer = storeInitialize()
initializer.initialize();
</script>
<template>
  <div id="app" class="app-container">
    <LeftSidebar />
    <router-view class="main-content" />
  </div>
</template>

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
