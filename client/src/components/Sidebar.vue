<template>

  <div class="o-page__sidebar js-page-sidebar"
       :class="{'is-minimized':isMinimized}">
    <div class="c-sidebar" :class="{'is-minimized':isMinimized}">
      <a class="c-sidebar__brand" href="#">
        <img class="c-sidebar__brand-img" src="/static/img/logo.png" alt="Logo"> Uniprocure
      </a>
      <ul class="c-sidebar__list">
        <li class="c-sidebar__item">
          <router-link class="c-sidebar__link" to="/">
            <span class="c-sidebar__icon u-mr-xsmall">
                                <i class="fa fa-home"></i>
                            </span> Dashboard
          </router-link>
        </li>
      </ul>

      <h4 class="c-sidebar__title" :class="{'u-hidden':isMinimized}">Inventory Management</h4>
      <ul class="c-sidebar__list">
        <li class="c-sidebar__item">
          <router-link class="c-sidebar__link" :to="{name:'Stock'}">
            <span class="c-sidebar__icon u-mr-xsmall">
            <i class="fa fa-barcode"></i></span>Manage Stock
          </router-link>
        </li>
        <li class="c-sidebar__item">
          <router-link class="c-sidebar__link" :to="{name:'Locations'}">
            <span class="c-sidebar__icon u-mr-xsmall"><i class="fa fa-map-marker-alt"></i></span>
            Manage Locations
          </router-link>
        </li>
        <li class="c-sidebar__item">
          <router-link class="c-sidebar__link" :to="{name:'Goods'}">
            <span class="c-sidebar__icon u-mr-xsmall">
              <i class="fa fa-box-open"></i></span>Receive Goods
          </router-link>
        </li>

        <li class="c-sidebar__item">
          <router-link class="c-sidebar__link" :to="{name:'Suppliers'}">
            <span class="c-sidebar__icon u-mr-xsmall"><i class="fa fa-handshake"></i></span>
            Manage Suppliers
          </router-link>
        </li>
        <li class="c-sidebar__item">
          <router-link class="c-sidebar__link" :to="{name:'Orders'}">
            <span class="c-sidebar__icon u-mr-xsmall">
              <i class="fa fa-file-invoice"></i></span>Manage Purchase Orders
          </router-link>
        </li>

      </ul>
      <!--
            <h4 class="c-sidebar__title" :class="{'u-hidden':isMinimized}">Catalogue Management</h4>
            <ul class="c-sidebar__list">
              <li class="c-sidebar__item">
                <a class="c-sidebar__link" target="_blank" href="boards.html">
                  <span class="c-sidebar__icon u-mr-xsmall">
                    <i class="fa fa-hand-paper-o"></i></span>
                  Boards (CRM)
                </a>
              </li>
              <li class="c-sidebar__item">
                <a class="c-sidebar__link" href="calendar.html">
                  <span class="c-sidebar__icon u-mr-xsmall"><i class="fa fa-calendar"></i></span>
                  Calendar
                </a>
              </li>
              <li class="c-sidebar__item">
                <a class="c-sidebar__link" target="_blank" href="news-feed.html">
                  <span class="c-sidebar__icon u-mr-xsmall"><i class="fa fa-newspaper-o"></i></span>News Feed
                </a>
              </li>
              <li class="c-sidebar__item">
                <a class="c-sidebar__link" href="messanger.html">
                  <span class="c-sidebar__icon u-mr-xsmall"> <i class="fa fa-comments-o"></i></span>
                  Messanger
                </a>
              </li>
              <li class="c-sidebar__item">
                <a class="c-sidebar__link" target="_blank" href="projects-board.html">
                  <span class="c-sidebar__icon u-mr-xsmall"><i class="fa fa-window-restore"></i></span>
                  Projects Board
                </a>
              </li>
            </ul>

            <h4 class="c-sidebar__title" :class="{'u-hidden':isMinimized}">Networking</h4>
            <ul class="c-sidebar__list">
              <li class="c-sidebar__item">
                <a class="c-sidebar__link" href="user-profile.html">
                  <span class="c-sidebar__icon u-mr-xsmall"><i class="fa fa-street-view"></i></span>
                  Add Trusts
                </a>
              </li>

              <li class="c-sidebar__item">
                <a class="c-sidebar__link" href="candidates.html">
                  <span class="c-sidebar__icon u-mr-xsmall"><i class="fa fa-users"></i></span>
                  Share Catalogues
                </a>
              </li>

              <li class="c-sidebar__item">
                <a class="c-sidebar__link" href="invoices.html">
                  <span class="c-sidebar__icon u-mr-xsmall"><i class="fa fa-files-o"></i></span>
                  View Shared Catalogues
                </a>
              </li>

            </ul>
      -->
      <h4 class="c-sidebar__title" :class="{'u-hidden':isMinimized}">Administration</h4>
      <ul class="c-sidebar__list">
        <li class="c-sidebar__item">
          <a class="c-sidebar__link" target="_blank" href="account-details.html">
            <span class="c-sidebar__icon u-mr-xsmall"><i class="fa fa-users"></i></span>
            Manage Users
          </a>
        </li>

      </ul>

    </div><!-- // .c-sidebar -->
  </div><!-- // .o-page__sidebar -->


</template>
<script>
  export default {
    name: 'Sidebar',
    props: ['mini'],
    computed: {
      isMinimized: function () {
        return this.$store.state.sidebarMinified == true;
      }
    },
    mounted: function () {
      this.$store.commit('sidebar', this.mini)
    },
    methods: {},
    watch: {
      $route(to, from){
        if (typeof to.meta.mini !== "undefined") {
          this.$store.commit('sidebar', to.meta.mini)
        }
      }
    }
  }
</script>
<style>
</style>
