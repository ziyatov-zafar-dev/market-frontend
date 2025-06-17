import HelloWorld from "./components/HelloWorld";
import Login from "./components/login.vue";
export default [
    {path: '/', component: HelloWorld},
    {path: '/login', component: Login},
    {path: '*', redirect: '/'},
]