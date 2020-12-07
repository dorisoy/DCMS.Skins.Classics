<template>
  <section class="nm-header">
    <!--logo-->
    <section class="nm-header-logo">
      <img :src="logoUrl" class="nm-header-logo-img" :alt="title" :title="title" />
      <div class="nm-header-logo-text">{{ title }}</div>
    </section>
    <!--导航栏-->
    <section class="nm-header-nav">
      <el-tabs v-model="tabName" type="card" @tab-click="onTabClick">
        <el-tab-pane v-for="menu in menus" :key="menu.id" :name="menu.id" @click="onTabClick(menu)"
          ><span slot="label"> <nm-icon v-if="menu.icon" :name="menu.icon" :style="{ color: menu.iconColor }" />{{ menu.name }}</span>
        </el-tab-pane>
      </el-tabs>
    </section>
    <!--工具栏-->
    <nm-toolbar />
  </section>
</template>
<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import { open } from 'dcms-ui/packages/utils/menu'

export default {
  data() {
    return {
      tabName: ''
    }
  },
  computed: {
    ...mapGetters('app/config', ['logoUrl']),
    ...mapState('app/config', { title: s => s.system.title }),
    ...mapState('app/account', ['menus', 'routeMenus']),
    ...mapState('app/page', ['current'])
  },
  methods: {
    ...mapMutations('app/skins/classics', ['setLeftMenus']),
    onTabClick(tab) {
      //如果点击的是当前已打开的菜单，则不执行任何操作
      if (tab.name === this.getCurrTabName()) return
      let menu = this.menus.find(m => m.id === tab.name)
      if (menu) {
        // 如果是节点类型的菜单
        if (menu.type === 0) {
          const { children } = menu
          this.setLeftMenus(children)
          if (children && children.length > 0) {
            open(this.$router, children[0])
          }
        } else {
          open(this.$router, menu)
        }
      }
    },
    getCurrTabName() {
      if (this.current.name && this.routeMenus) {
        let routeMenu = this.routeMenus.get(this.current.name)
        if (routeMenu) {
          for (var i = 0; i < this.menus.length; i++) {
            let menu = this.menus[i]
            if (menu.id === routeMenu.menu.rootId) {
              return menu.id
            }
          }
        }
      }
      return null
    }
  },
  watch: {
    current() {
      let leftMenus = []
      if (this.current.name && this.routeMenus) {
        let routeMenu = this.routeMenus.get(this.current.name)
        if (routeMenu) {
          for (var i = 0; i < this.menus.length; i++) {
            let menu = this.menus[i]
            if (menu.id === routeMenu.menu.rootId) {
              this.tabName = menu.id
              leftMenus = menu.children
              break
            }
          }
        }
      }
      this.setLeftMenus(leftMenus)
    }
  }
}
</script>
