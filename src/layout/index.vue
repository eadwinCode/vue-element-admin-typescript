<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device==='mobile'&&sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
        <navbar />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script lang="ts">
import { Navbar, Sidebar, AppMain } from './components'
import ResizeHandleMixin from './mixins/ResizeHandler'
import { Component, Vue } from 'vue-property-decorator'
import { mixins } from 'vue-class-component'
import { DeviceType } from '../store/interfaces'


@Component({
    components: { Navbar,Sidebar,AppMain },
})
export default class Layout extends mixins(ResizeHandleMixin) {

    get fixedHeader() {
      return this.$store.state.settings.fixedHeader
    }

    get classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        openSidebar: this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === DeviceType.Mobile
      }
    }

    private handleClickOutside() {
      this.$store.dispatch('app/closeSideBar', { withoutAnimation: false })
    }
}
</script>

<style>

</style>