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
import { mapGetters } from 'vuex'
import Logo from './Logo.vue'
import SidebarItem from './SidebarItem.vue'
import variables from '@/styles/variables.scss'
import { Component, Vue } from 'vue-property-decorator'
import { Getters } from '@/store/getters'
import { RouterOptions } from 'vue-router'
import { ISidebar } from '@/store/interfaces'

@Component({
   components: { SidebarItem, Logo }, 
   computed: {...mapGetters([Getters.sidebar])},
})
export default class Sidebar extends Vue{

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
      return this.$store.state.settings.sidebarLogo
    }

    get variables() {
      return variables
    }

    get isCollapse() {
      return !((this as any).sidebar as ISidebar).opened
    }
}
</script>

<style>

</style>