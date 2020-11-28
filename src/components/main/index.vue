<template>
  <section :class="['nm-main', sidebarCollapse ? 'collapse' : '', hideLeftMenus ? 'no-menus' : '']">
    <section class="nm-main-left">
      <nm-menus />
    </section>
    <section class="nm-main-right">
      <section class="nm-content">
        <transition name="fade-transverse">
          <keep-alive v-if="showTabnav" :include="keepAlive">
            <router-view v-if="routerViewVisible" :key="$route.path" />
          </keep-alive>

          <router-view v-if="!showTabnav && routerViewVisible" :key="$route.path" />
        </transition>
      </section>
    </section>
  </section>
</template>
<script>
import { mapState } from 'vuex'
import NmMenus from '../menus'
export default {
  components: { NmMenus },
  props: {
    routerViewVisible: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    ...mapState('app/skins/classics', { hideLeftMenus: s => s.hideLeftMenus, sidebarCollapse: s => s.sidebar.collapse }),
    ...mapState('app/page', ['keepAlive']),
    ...mapState('app/config', { showTabnav: s => s.component.tabnav.enabled })
  }
}
</script>
