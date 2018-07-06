import Vue from 'vue'
import Router from 'vue-router'
import GraphResources from '~app/routes/graph.js'

require("~jbase/vuebase")

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    ...GraphResources.routes,
  ]
})
