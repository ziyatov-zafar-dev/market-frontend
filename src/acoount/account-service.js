import store from "@/acoount/Store";
import axios from "axios";
import {userApiUrls} from "@/constants";

export default class AccountService {
    constructor(router) {
        this.router = router;
        this.init();
    }

    init() {
        const token = localStorage.getItem("refresh_token") || sessionStorage.getItem("refresh_token");
        if (!store.getters.account && !store.getters.logon && token) {
            this.retrieveAccount()
        }

    }

    retrieveAccount() {
        store.commit("authenticate");
        axios
            .get(`${userApiUrls.userinfo}`)
            .then(response => {
                const account = response.data.data;
                console.log('Account',account);
                if (account) {
                    store.commit("userIdentity", account);
                    if (sessionStorage.getItem("request-url")) {
                        this.router.replace(sessionStorage.getItem("request-url"));
                        sessionStorage.removeItem("request-url");
                    }
                } else {
                    store.commit("logout");
                    this.router.push("/");
                    sessionStorage.removeItem("request-url");
                    sessionStorage.removeItem("refresh_token");
                }
            })
            .catch(() => {
                store.commit("logout");
                this.router.push("/");
            })

    }
}