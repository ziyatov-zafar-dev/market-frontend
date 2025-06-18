import Vuex from 'vuex';
import Vue from 'vue';
import VuexPersistence  from "vuex-persist";

const vuexLocal = new VuexPersistence({
    storage: window.localStorage,
    // storageKey: window.localStorage,
})


Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        logon: false,
        userIdentity: null,
        authenticated: false
    },

    mutations: {
        // Kirish jarayoni boshlandi
        authenticate(state) {
            state.logon = true;
        },

        // Foydalanuvchi ma'lumotlari muvaffaqiyatli olindi
        userIdentity(state, identity) {
            state.userIdentity = identity;
            state.authenticated = true;
            state.logon = false;
        },

        // Chiqish
        logout(state) {
            state.userIdentity = null;
            state.authenticated = false;
            state.logon = false;
        }
    },

    getters: {
        logon: state => state.logon,
        authenticated: state => state.authenticated,
        account: state => state.userIdentity
    },
    plugins: [vuexLocal.plugin]
});
