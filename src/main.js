import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import Router from "./routes";
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css'
import * as config from './config/config.js'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(ElementUI)
config.initVueApp(Vue)

const router = new VueRouter({
    routes: Router
})


new Vue({
    render: h => h(App),
    router: router,
}).$mount('#app')
