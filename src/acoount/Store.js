import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex);
export default new Vuex.Store({
        state: {
            logon: false,
            userIdentity: null,
            authenticated: false
        },
        mutations: {
            authenticate(state) {
                state.logon = true;
            },
            authenticated(state, identity) {
                state.userIdentity = identity;
                state.authenticated = false;
                state.logon = false;
            },
            logout(state) {
                state.userIdentity = null;
                state.authenticated = false;
                state.logon = false;
            }
        },
        getters: {
            logon: state => state.logon,
            authenticated: state => state.authenticated,
            account: state => state.userIdentity,

        }
    }
)
