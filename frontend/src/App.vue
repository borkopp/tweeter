<script setup>
import LeftSidebar from '@/components/Sidebar.vue'
import storeInitialize from '@/stores/StoreInitialize'

const initializer = storeInitialize()
initializer.initialize();
</script>
<template>
  <div v-if="initializer.initialized" id="app" class="app-container">
    <LeftSidebar v-if="initializer.initialized" />
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
