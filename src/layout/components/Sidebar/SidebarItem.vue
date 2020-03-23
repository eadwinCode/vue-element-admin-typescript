<template>
  <div v-if="!item.hidden">
    <template
      v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow"
    >
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{'submenu-title-noDropdown':!isNest}"
        >
        <svg-icon v-if="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :icon-class="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" />
        <span v-if="onlyOneChild.meta.title" slot="title">{{onlyOneChild.meta.title}}</span>
          
        </el-menu-item>
      </app-link>
    </template>

    <el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template slot="title">
        <svg-icon v-if="item.meta && item.meta.icon" :icon-class="item.meta.icon" />
        <span v-if="item.meta && item.meta.title" slot="title">{{item.meta && item.meta.title}}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script lang="ts">
import path from "path";
import { isExternal } from "@/utils/validate";
import AppLink from "./Link.vue";
import FixiOSBug from "./FixiOSBug";
import { IRouteDefinition } from "@/router/interfaces";
import { Component, Vue, Prop } from "vue-property-decorator";
import { mixins } from "vue-class-component";

interface childContent extends IRouteDefinition {
  noShowingChildren?: boolean;
}

@Component({
  components: { AppLink }
})
export default class SidebarItem extends mixins(FixiOSBug) {
  @Prop({ default: null, required: true }) private item!: object;
  @Prop({ default: false }) private isNest!: boolean;
  @Prop({ default: "" }) private basePath!: string;

  private onlyOneChild!: childContent;

  private hasOneShowingChild(children = [], parent: IRouteDefinition) {
    const showingChildren = children.filter((item: IRouteDefinition) => {
      if (item.hidden) {
        return false;
      } else {
        // Temp set(will be used if only has one showing child)
        this.onlyOneChild = item;
        return true;
      }
    });

    // When there is only one child router, the child router is displayed by default
    if (showingChildren.length === 1) {
      return true;
    }

    // Show parent if there are no child router to display
    if (showingChildren.length === 0) {
      this.onlyOneChild = { ...parent, path: "", noShowingChildren: true };
      return true;
    }

    return false;
  }

  private resolvePath(routePath: string) {
    if (isExternal(routePath)) {
      return routePath;
    }
    if (isExternal(this.basePath)) {
      return this.basePath;
    }
    return path.resolve(this.basePath, routePath);
  }
}
</script>

<style>
</style>