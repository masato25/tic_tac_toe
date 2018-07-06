import MainGraph from '~vuecom/tic-graph/tic-graph.vue'

export default {
  comments: {
    MainGraph,
  },
  routes: [
    {
      path: "/ui/main",
      name: "MainGraph",
      component: MainGraph
    }
  ]
}
