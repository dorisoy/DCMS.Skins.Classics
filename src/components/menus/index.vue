<template>
  <section v-if="leftMenus && leftMenus.length > 0" class="nm-menus">
    <el-scrollbar>
      <el-menu :default-active="active" :unique-opened="uniqueOpened" :collapse="collapse" :collapse-transition="false">
        <template v-for="menu in leftMenus">
          <el-submenu v-if="menu.type === 0" :key="menu.id" :index="menu.id + ''">
            <template v-slot:title>
              <nm-icon :name="menu.icon" class="nm-menus-icon" :style="{ color: menu.iconColor }" />
              <span>{{ menu.name }}</span>
            </template>
            <template v-for="item in menu.children">
              <menu-item v-if="item.show" :key="item.id" :menu="item" :parent-index="menu.id" />
            </template>
          </el-submenu>

          <el-menu-item v-else :key="menu.id" :index="menu.id + ''" @click="go(menu, $event)">
            <nm-icon :name="menu.icon" class="nm-menus-icon" :style="{ color: menu.iconColor }" />
            <span>{{ menu.name }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </el-scrollbar>
  </section>
</template>
<script>
import { mapState } from 'vuex'
import { open } from 'netmodular-ui/packages/utils/menu'
import MenuItem from 'netmodular-ui/packages/skins/pretty/components/menus/item'
export default {
  components: { MenuItem },
  computed: {
    ...mapState('app/config', { uniqueOpened: s => s.component.menu.uniqueOpened }),
    ...mapState('app/skins/classics/sidebar', ['collapse']),
    ...mapState('app/skins/classics', ['leftMenus']),
    ...mapState('app/account', ['routeMenus']),
    ...mapState('app/page', ['current']),
    active: {
      get() {
        if (this.current.name && this.routeMenus) {
          let routeMenu = this.routeMenus.get(this.current.name)

          if (routeMenu) {
            return routeMenu.menu.id
          }
        }
        return '-1'
      },
      set() {}
    }
  },
  methods: {
    go(menu, e) {
      if (e.$el.classList.contains('is-active')) {
        return
      }

      open(this.$router, menu)
    }
  }
}
</script>
