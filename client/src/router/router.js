import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage";
// import LogIn from "@/views/LogIn";
import SignUp from "@/views/SignUp";
import PostPage from "@/views/PostPage";
import PostIdPage from "@/views/PostIdPage";
import ToDo from "@/views/ToDo";

const routes = [
    {
        path: "/",
        component: HomePage,
    },
    {
        path: "/posts",
        component: PostPage,
    },
    // {
    //     path: "/login",
    //     component: LogIn,
    // },
    {
        path: "/signup",
        component: SignUp,
    },
    {
        path: "/post/:id/comments",
        component: PostIdPage,
    },
    {
        path: "/todo",
        component: ToDo,
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

export default router;
