import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

//element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
import { message} from 'tools/resetMessage';Vue.prototype.$message = message; //重置element-ui中message消息提示

//github第三方表格插件
import ZkTable from 'vue-table-with-tree-grid'
Vue.component("ZkTable", ZkTable)

// echars
import echarts from "echarts";
Vue.prototype.$echarts = echarts;



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
