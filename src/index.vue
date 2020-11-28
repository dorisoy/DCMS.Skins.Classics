<template>
  <div class="nm-wrapper">
    <nm-header />
    <nm-tabnav v-if="showTabnav">
      <template v-slot:before>
        <div :class="['nm-sidebar-toggle-btn', hideLeftMenus ? 'disabled' : '']">
          <a @click.prevent="sidebarToggle">
            <nm-icon :name="sidebarCollapse ? 'indent-left' : 'indent-right'"></nm-icon>
          </a>
        </div>
      </template>
    </nm-tabnav>
    <nm-main :router-view-visible="routerViewVisible" />
  </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import NmHeader from './components/header'
import NmMain from './components/main'
export default {
  components: { NmHeader, NmMain },
  data() {
    return {
      routerViewVisible: true
    }
  },
  computed: {
    ...mapState('app/skins/classics', ['leftMenus', 'hideLeftMenus']),
    ...mapState('app/skins/classics/sidebar', { sidebarCollapse: 'collapse' }),
    ...mapState('app/config', { showTabnav: s => s.component.tabnav.enabled })
  },
  provide() {
    return {
      reload: this.reload
    }
  },
  methods: {
    ...mapActions('app/skins/classics/sidebar', { sidebarToggle_: 'toggle' }),
    ...mapMutations('app/page', ['keepAliveRemove']),
    reload(name) {
      this.routerViewVisible = false
      this.keepAliveRemove(name)

      this.$nextTick(() => {
        this.routerViewVisible = true
      })
    },
    sidebarToggle() {
      if (this.hideLeftMenus) return

      this.sidebarToggle_()
    }
  }
}
</script>
<style lang="scss">
@import './styles/_index.scss';
</style>
