
<template>
  <component v-bind="componentProps.props" :is="componentProps.is">
    <slot />
  </component>
</template>

<script lang="ts">
interface dynamicComponent {
  is?: string;
  props: object;
}
import { isExternal } from "@/utils/validate";
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class Sidebarlink extends Vue {
  @Prop({ default: "", required: true }) private to!: String;
  private componentProps!: dynamicComponent;

  created(){
    this.componentProps = this.linkProps(this.to as string);
  }
  private linkProps(url: string) {
    if (isExternal(url)) {
      return{
        is: "a",
        props: {
          href: url,
          target: "_blank",
          rel: "noopener"
        }
      };
    }
    return {
      is: "router-link",
      props: {
        to: url
      }
    };
  }
}
</script>
