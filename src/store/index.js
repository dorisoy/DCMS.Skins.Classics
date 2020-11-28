import sidebar from 'netmodular-ui/packages/skins/pretty/store/modules/sidebar'
export default {
  namespaced: true,
  state: {
    leftMenus: [],
    hideLeftMenus: false
  },
  mutations: {
    setLeftMenus(state, menus) {
      state.leftMenus = menus
      state.hideLeftMenus = !menus || menus.length < 1
    }
  },
  modules: {
    sidebar
  }
}
