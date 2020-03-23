import Cookies from 'js-cookie'

const SIDE_BAR_STATUS_KEY = 'sidebarStatus'

export const getSidebarStatus = () => {
    return Cookies.get(SIDE_BAR_STATUS_KEY)
}

export const setSidebarStatus = (sidebarStatus: 'opened'| 'closed') => {
    return Cookies.set(SIDE_BAR_STATUS_KEY, sidebarStatus)
}