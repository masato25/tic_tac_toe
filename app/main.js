import Vue from 'vue'
import GraphResources from '~app/routes/graph.js'
import router from './router'
import VueI18n from 'vue-i18n'
// import i18nConfig from '~app/i18n/bundleall.js'

Vue.config.productionTip = false
Vue.use(VueI18n)
// const i18n = new VueI18n(i18nConfig)

new Vue({
  //store,
  //i18n,
  el: ".container",
  template: `
    <el-row>
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="1">
          Tic Tac Toe
        </el-menu-item>
      </el-menu>
      <el-row class="row_container">
        <el-col :span="3">
          &nbsp;
        </el-col>
        <el-col :span="18">
          <router-view>
          </router-view>
        </el-col>
        <el-col :span="3">
          &nbsp;
        </el-col>
      </el-row>
    </el-row>
    `,
  router,
  data() {
    return {};
  },
  components: Object.assign({}, GraphResources.components),
  created(){
    this.$router.push({name: "MainGraph"})
  },
  methods: {
    handleSelect(){
      //do noting
    }
  }
})
