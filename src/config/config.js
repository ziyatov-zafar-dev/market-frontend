import {setAxiosInter} from "@/config/axios-interceptor";

export function initVueApp(vue) {
    setAxiosInter(() => console.log("Unauthorized",vue));
}