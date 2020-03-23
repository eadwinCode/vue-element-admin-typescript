import { Component, Vue, Watch } from 'vue-property-decorator'
import { DeviceType } from '@/store/interfaces'

@Component({})
export default class FixiOSBug extends Vue {
  get device() {
    return this.$store.state.app.device
  }

  private fixBugIniOS() {
    const $subMenu = this.$refs.subMenu as any
    if ($subMenu) {
      const handleMouseleave = $subMenu.handleMouseleave
      $subMenu.handleMouseleave = (e: any) => {
        if (this.device === DeviceType.Mobile) {
          return
        }
        handleMouseleave(e)
      }
    }
  }
  mounted() {
    // In order to fix the click on menu on the ios device will trigger the mouseleave bug
    // https://github.com/PanJiaChen/vue-element-admin/issues/1135
    this.fixBugIniOS()
  }
}
