
import { Component, Vue, Watch } from 'vue-property-decorator'
import store from '@/store'
import { RouteConfig } from 'vue-router'
import { DeviceType } from '@/store/interfaces'

const { body } = document
const WIDTH = 992 // refer to Bootstrap's responsive design

@Component({})
export default class ResizeHandleMixin extends Vue {
    get sidebar() {
        return this.$store.state.app.sidebar
      }
  
    get device() {
        return this.$store.state.app.device
    }

    @Watch("$route")
    private RouteChange(route: RouteConfig) {
        if (this.device === DeviceType.Mobile && this.sidebar.opened) {
            store.dispatch('app/closeSideBar', { withoutAnimation: false })
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
            store.dispatch('app/toggleDevice', 'mobile')
            store.dispatch('app/closeSideBar', { withoutAnimation: true })
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
            store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop')

            if (isMobile) {
                store.dispatch('app/closeSideBar', { withoutAnimation: true })
            }
        }
    }
}
