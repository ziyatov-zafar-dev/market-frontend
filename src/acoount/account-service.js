import store from "@/acoount/Store";
import axios from "axios";
import {userApiUrls} from "@/constants";

export default class AccountService {
    init() {
        const token = localStorage.getItem("refresh_token") || sessionStorage.getItem("refresh_token");
        if (!store.getters.account && !store.getters.logon && token) {
            this.retrieveAccount()
        }

    }

    retrieveAccount() {
        store.commit("authenticate");
        axios
            .get(`/${userApiUrls.userinfo}`)
        .then(response => {
            const account = response.data.data;
            if (account) {
                store.commit("userIdentity", account);
                store.commit("authenticate", true);
            }
        })

    }
}