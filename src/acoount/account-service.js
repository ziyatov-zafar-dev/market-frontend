import axios from "axios";
import {userApiUrls} from "@/constants";

export default class AccountService {
    constructor(router, store) {
        this.router = router;
        this.store = store;
        this.init();
    }

    init() {
        const token = localStorage.getItem("refresh_token") || sessionStorage.getItem("refresh_token");
        if (!this.store.getters.account && !this.store.getters.logon && token) {
            this.retrieveAccount();
        }
    }

    retrieveAccount() {
        axios
            .get(`${userApiUrls.userinfo}`)
            .then(response => {
                const account = response.data.data;
                this.store.commit("userIdentity", account);
                console.log('Account', response.data);
                if (account && response.data.success) {
                    // ✅ Mutation nomini to'g'riladik
                    this.store.commit("userIdentity", account);
                    if (sessionStorage.getItem("request-url")) {
                        this.router.replace(sessionStorage.getItem("request-url"));
                        sessionStorage.removeItem("request-url");
                    } else {
                        console.log("No request-url found");
                    }
                } else {
                    this.store.commit("logout");
                    this.router.push("/");
                    sessionStorage.removeItem("request-url");
                    sessionStorage.removeItem("refresh_token");
                }
            })
            .catch(() => {
                this.store.commit("logout");
                this.router.push("/");
            });
    }

    hasAnyAuthorityAndAuth(authorities) {
        if (typeof authorities === "string") {
            authorities = [authorities];
        }
        if (!this.authenticated && this.userAuthorities) {
            const token = localStorage.getItem("refresh_token") || sessionStorage.getItem("refresh_token");
            if (!this.store.getters.account && !this.store.getters.logon && token) {
                return this.retrieveAccount();
            } else {
                return new Promise((resolve) => {
                    resolve(false);
                })
            }
        }
        for (let i = 0; i < authorities.length; i++) {
            if (this.userAuthorities.include[authorities[i]]) {
                return new Promise((resolve) => {
                    resolve(true);

                })
            }
        }
        return new Promise((resolve) => {
            resolve(false);
        })
    }

    hasAnyAuthority(authorities) {
        if (typeof authorities === "string") {
            authorities = [authorities];
        }
        if (!this.authenticated && this.userAuthorities) {
            return false;
        }
        for (let i = 0; i < authorities.length; i++) {
            if (this.userAuthorities.include[authorities[i]]) {
                return true;
            }
        }
        return false;

    }

    get authenticated() {
        return this.store.getters.authenticated;
    }

    get userAuthorities() {
        return this.store.getters.account.authorities;
    }
}
