import { createRouter, createWebHistory } from "vue-router";
import LogIn from "@/views/LogIn";
import SignUp from "@/views/SignUp";
import HomePage from "@/views/HomePage";

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
