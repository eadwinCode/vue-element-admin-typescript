
import { Component, Vue, Watch } from 'vue-property-decorator'
import { RouteConfig } from 'vue-router'
import { DeviceType } from '@/store/interfaces'
import { AppStateModule } from '@/store/modules/app'

const { body } = document
const WIDTH = 992 // refer to Bootstrap's responsive design

@Component({})
export default class ResizeHandleMixin extends Vue {
    get sidebar() {
        return AppStateModule.sidebar
      }
  
    get device() {
        return AppStateModule.device
    }

    @Watch("$route")
    private RouteChange(route: RouteConfig) {
        if (this.device === DeviceType.Mobile && this.sidebar.opened) {
            AppStateModule.closeSideBar({ withoutAnimation: false })
        }
    }

    beforeMount() {
        window.addEventListener('resize', this.$_resizeHandler)
    }
    
    beforeDestroy() {
        window.removeEventListener('resize', this.$_resizeHandler)
    }

    mounted() {
        const isMobile = this.$_isMobile()
        if (isMobile) {
            AppStateModule.toggleDevice(DeviceType.Mobile)
            AppStateModule.closeSideBar({ withoutAnimation: true })
        }
    }
    // use $_ for mixins properties
    // https://vuejs.org/v2/style-guide/index.html#Private-property-names-essential
    private $_isMobile() {
        const rect = body.getBoundingClientRect()
        return rect.width - 1 < WIDTH
    }

    private $_resizeHandler() {
        if (!document.hidden) {
            const isMobile = this.$_isMobile()
            AppStateModule.toggleDevice(isMobile ? DeviceType.Mobile : DeviceType.Desktop)

            if (isMobile) {
                AppStateModule.closeSideBar({ withoutAnimation: true })
            }
        }
    }
}
