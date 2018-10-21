import Vue from "vue";
import Router from "vue-router";

import Home from "@/components/Home";
import Dashboard from "@/components/Dashboard";
import Login from "@/components/Login";
import SignUp from "@/components/SignUp";
import Logout from "@/components/Logout";

import StockSummary from "@/components/Stock/Summary";
import StockDetails from "@/components/Stock/Details";
import UploadStock from "@/components/Stock/Upload";
import AddStock from "@/components/Stock/Add";

import LocationSummary from "@/components/Locations/Summary";
import LocationDetails from "@/components/Locations/Details";
import UploadLocations from "@/components/Locations/Upload";
import AddLocation from "@/components/Locations/Add";

import SuppliersSummary from "@/components/Suppliers/Summary";
import AddSupplier from "@/components/Suppliers/Add";
import SupplierDetails from "@/components/Suppliers/Details";

import OrderSummary from "@/components/Orders/Summary";

import GoodsSummary from "@/components/Goods/Summary";
import AddGoods from "@/components/Goods/Add";
import GoodsDetails from "@/components/Goods/Details";

import CatalogueSummary from "@/components/Catalogue/Summary";
import CatalogueDetails from "@/components/Catalogue/Details";
import AddCatalogue from "@/components/Catalogue/Add";

import Users from "@/components/Users/Summary";
import UsersAdd from "@/components/Users/Add";

import Checkout from "@/components/Checkout/Checkout"

Vue.use(Router);

const router = new Router({
    linkExactActiveClass: "is-active",
    routes: [
      {
        path: '/',
        component: Home,
        meta: {requiresAuth: true},
        children: [
          {
            path: 'stock',
            name: 'Stock',
            component: StockSummary,
            meta: {requiresAuth: true, mini: true}
          },
          {
            path: 'stock/details',
            name: 'StockDetails',
            component: StockDetails,
            meta: {requiresAuth: true, mini: true}
          },
          {
            path: 'stock/upload',
            name: 'UploadStock',
            component: UploadStock,
            meta: {requiresAuth: true, mini: true}
          },
          {
            path: 'stock/add',
            name: 'AddStock',
            component: AddStock,
            meta: {requiresAuth: true, mini: true}
          },
          {
            path: 'locations/details',
            name: 'LocationDetails',
            component: LocationDetails,
            meta: {requiresAuth: true, mini: true},
          },
          {
            path: 'locations',
            name: 'Locations',
            component: LocationSummary,
            meta: {requiresAuth: true, mini: true},
          },
          {
            path: 'locations/upload',
            name: 'UploadLocations',
            component: UploadLocations,
            meta: {requiresAuth: true, mini: true},
          },
          {
            path: 'locations/add',
            name: 'AddLocations',
            component: AddLocation,
            meta: {requiresAuth: true, mini: true},
          },
          {
            path: 'suppliers',
            name: 'Suppliers',
            component: SuppliersSummary,
            meta: {requiresAuth: true, mini: true}
          },
          {
            path: 'suppliers/add',
            name: 'AddSupplier',
            component: AddSupplier,
            meta: {requiresAuth: true, mini: true}
          },
          {
            path: 'suppliers/details',
            name: 'SupplierDetails',
            component: SupplierDetails,
            meta: {requiresAuth: true, mini: true}
          },
          {
            path: 'orders',
            name: 'Orders',
            component: OrderSummary,
            meta: {requiresAuth: true, mini: true}
          },
          {
            path: 'goods',
            name: 'Goods',
            component: GoodsSummary,
            meta: {requiresAuth: true, mini: true}
          },
          {
            path: 'goods/add',
            name: 'AddGoods',
            component: AddGoods,
            meta: {requiresAuth: true, mini: true},
          },
          {
            path: 'goods/details',
            name: 'GoodsDetails',
            component: GoodsDetails,
            meta: {requiresAuth: true, mini: true},
          },
          {
            path: 'catalogue',
            name: 'Catalogue',
            component: CatalogueSummary,
            meta: {requiresAuth: true, mini: true}
          },
          {
            path: 'catalogue/add',
            name: 'AddCatalogue',
            component: AddCatalogue,
            meta: {requiresAuth: true, mini: true},
          },
          {
            path: 'catalogue/details',
            name: 'CatalogueDetails',
            component: CatalogueDetails,
            meta: {requiresAuth: true, mini: true},
          },
          {
            path: 'users',
            name: 'Users',
            component: Users,
            meta: {requiresAuth: true, mini: true}
          },
          {
            path: 'users/add',
            name: 'AddUser',
            component: UsersAdd,
            meta: {requiresAuth: true, mini: true},
          },
          {
            path: 'checkout',
            name: 'Checkout',
            component: Checkout,
            meta: {requiresAuth: true, mini: true}
          },
          {
            path: '',
            name: 'Dashboard',
            component: Dashboard,
            meta: {requiresAuth: true, mini: false}
          }
        ]
      },
      {
        path: '/login',
        name: 'Login',
        component: Login
      },
      {
        path: '/sign-up',
        name: 'Sign Up',
        component: SignUp
      },
      {
        path: '/logout',
        name: 'Logout',
        component: Logout
      }
    ]
  })
;


router.beforeEach((to, from, next) => {

  if (to.matched.some(record => record.meta.requiresAuth)) {

    if (Vue.$jwt.hasToken()) {

      var token = Vue.$jwt.decode();
      var current_time = new Date().getTime() / 1000;
      if (current_time > token.exp) {
        next({path: '/login', query: {redirect: to.fullPath}});
      } else {
        if (to.meta.role) {
          if (token.data.user_roles.indexOf(to.meta.role) > -1) {
            next();
          } else {
            Vue.toasted.show("You don't have sufficient permission for this action!", {
              icon: "error",
              type: "error",
              duration: 3000
            });
            next({path: from.fullPath})
          }
        } else {
          next();
        }
      }

    } else {
      next({path: '/login', query: {redirect: to.fullPath}});
    }

  } else {
    next();
  }
});

export default router

