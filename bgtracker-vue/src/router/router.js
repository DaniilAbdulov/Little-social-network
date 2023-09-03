import { createRouter, createWebHistory } from "vue-router";
import LogIn from "@/components/LogIn";
import SignUp from "@/components/SignUp";
import HomePage from "@/components/HomePage";

const routes = [
    {
        path: "/",
        component: HomePage,
    },
    {
        path: "/login",
        component: LogIn,
    },
    {
        path: "/signup",
        component: SignUp,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
