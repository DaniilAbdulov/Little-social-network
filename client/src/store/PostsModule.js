import axios from "axios";

export const PostsModule = {
    state: () => ({
        post: {
            title: "",
            body: "",
        },
        posts: [],
        errorMessage: "",
        postPage: 0,
        postLimit: 3,
        postsCount: 0,
    }),
    getters: {},
    mutations: {
        SET_ALL_POSTS(state, posts) {
            state.posts = posts;
        },
        SET_ERROR_MESSAGE(state, message) {
            state.errorMessage = message;
        },
        INCREMENT_POST_PAGE(state) {
            state.postPage += state.postLimit;
        },
        SET_ALL_POSTS_COUNT(state, count) {
            state.postsCount = count;
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
        async getPosts({ commit }) {
            const postPage = this.state.posts.postPage;
            const postLimit = this.state.posts.postLimit;
            try {
                const response = await axios.get("/api/post/posts", {
                    params: { postPage: postPage, postLimit: postLimit },
                });
                commit("SET_ALL_POSTS", response.data.posts);
            } catch (error) {
                console.log(error);
            }
        },
        async getMorePosts({ commit }) {
            console.log("getMorePosts is still working");
            commit("INCREMENT_POST_PAGE");
            const postPage = this.state.posts.postPage;
            const postLimit = this.state.posts.postLimit;
            try {
                const response = await axios.get("/api/post/posts", {
                    params: { postPage: postPage, postLimit: postLimit },
                });
                commit("SET_ALL_POSTS_COUNT", response.data.posts_length);
                commit("SET_ALL_POSTS", [
                    ...this.state.posts.posts,
                    ...response.data.posts,
                ]);
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
