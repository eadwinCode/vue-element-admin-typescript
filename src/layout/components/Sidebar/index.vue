<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item v-for="route in routes" :key="route.path" :item="route" 
        :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
import Logo from './Logo.vue'
import SidebarItem from './SidebarItem.vue'
import variables from '@/styles/variables.scss'
import { Component, Vue } from 'vue-property-decorator'
import { RouterOptions } from 'vue-router'
import { ISidebar } from '@/store/interfaces'
import { AppStateModule } from '../../../store/modules/app'
import { SettingsStateModule } from '../../../store/modules/settings'

@Component({
   components: { SidebarItem, Logo },
})
export default class Sidebar extends Vue{

    get sidebar(){
      return AppStateModule.sidebar
    }

    get routes(){
        return ((this.$router as any).options as RouterOptions).routes
    }

    get activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    }

    get showLogo() {
      return SettingsStateModule.sidebarLogo
    }

    get variables() {
      return variables
    }

    get isCollapse() {
      return !this.sidebar.opened
    }
}
</script>

<style>

</style>