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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
