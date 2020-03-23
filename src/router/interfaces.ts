import { RouteConfig } from 'vue-router';

export interface IRouteMeta {
    
    roles?: Array<string>    // control the page roles (you can set multiple roles)
    title?: string           // the name show in sidebar and breadcrumb (recommend set)
    icon?: string            // the icon show in the sidebar
    breadcrumb?: boolean     // if set false, the item will hidden in breadcrumb(default is true)
    activeMenu?: string      // if set path, the sidebar will highlight the path you set
}

export interface IRouteDefinition extends RouteConfig{
    meta?: IRouteMeta
    hidden?: boolean         // if set true, item will not show in the sidebar(default is false)
    alwaysShow?: boolean     // if set true, will always show the root menu
}