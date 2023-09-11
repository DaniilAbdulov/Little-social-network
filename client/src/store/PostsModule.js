import axios from "axios";

export const PostsModule = {
    state: () => ({
        post: {
            title: "",
            body: "",
        },
        posts: [],
        errorMessage: "",
    }),
    getters: {},
    mutations: {
        SET_ALL_POSTS(state, posts) {
            state.posts = posts;
        },
        SET_ERROR_MESSAGE(state, message) {
            state.errorMessage = message;
        },
    },
    actions: {
        async createPostInDB({ dispatch }, post) {
            try {
                await axios.post("/api/post/newpost", {
                    title: post.title,
                    body: post.body,
                });
                dispatch("getAllPosts");
            } catch (error) {
                console.log(error);
            }
        },
        async getAllPosts({ commit }) {
            try {
                const response = await axios.get("/api/post/allposts");
                commit("SET_ALL_POSTS", response.data.posts);
            } catch (error) {
                console.log(error);
            }
        },
        async deletePost({ commit, dispatch }, post) {
            try {
                await axios.delete("/api/post/deletepost", {
                    data: {
                        post_id: post.id,
                        user_id: post.user_id,
                    },
                });
                dispatch("getAllPosts");
            } catch (error) {
                commit("SET_ERROR_MESSAGE", error.response.data.message);
            }
        },
    },
    namespaced: true,
};
