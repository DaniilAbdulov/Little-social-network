import { createRouter, createWebHistory } from "vue-router";
import HomePage from "@/views/HomePage";
import PostPage from "@/views/PostPage";
import PostIdPage from "@/views/PostIdPage";
import ToDo from "@/views/ToDo";
import UserPage from "@/views/UserPage";

const routes = [
    {
        path: "/",
        component: HomePage,
    },
    {
        path: "/posts",
        component: PostPage,
    },
    {
        path: "/user",
        component: UserPage,
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
