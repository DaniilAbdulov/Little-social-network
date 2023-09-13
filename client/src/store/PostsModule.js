import axios from "axios";

export const PostsModule = {
    state: () => ({
        post: {
            title: "",
            body: "",
        },
        posts: [],
        errorMessage: "",
        requestedCountOfPosts: 0,
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
            state.requestedCountOfPosts += state.postLimit;
        },
        EMPTY_COUNT_OF_REQUESTED_POSTS(state) {
            state.requestedCountOfPosts = 0;
        },
        SET_ALL_POSTS_COUNT(state, count) {
            state.postsCount = count;
        },
        UPDATE_POSTS(state, payload) {
            state.posts = [...state.posts, ...payload];
        },
        ADD_POST_METADATA(state) {
            state.posts.forEach((post) => {
                post.indexOfPopular = +post.comment_count + +post.likes_count;
                post.body_length = post.body.length;
            });
        },
    },
    actions: {
        async createPostInDB({ dispatch }, post) {
            try {
                await axios.post("/api/post/newpost", {
                    title: post.title,
                    body: post.body,
                });
                dispatch("getPosts");
            } catch (error) {
                console.log(error);
            }
        },
        async getPosts({ commit }) {
            commit("EMPTY_COUNT_OF_REQUESTED_POSTS");
            const requestedCountOfPosts =
                this.state.posts.requestedCountOfPosts;
            const postLimit = this.state.posts.postLimit;
            try {
                const response = await axios.get("/api/post/posts", {
                    params: {
                        requestedCountOfPosts: requestedCountOfPosts,
                        postLimit: postLimit,
                    },
                });
                commit("SET_ALL_POSTS_COUNT", response.data.posts_length);
                commit("SET_ALL_POSTS", response.data.posts);
                commit("ADD_POST_METADATA");
            } catch (error) {
                console.log(error);
            }
        },
        async getMorePosts({ commit }) {
            commit("INCREMENT_POST_PAGE");
            const requestedCountOfPosts =
                this.state.posts.requestedCountOfPosts;
            const postLimit = this.state.posts.postLimit;
            const postsCount = this.state.posts.postsCount;
            if (
                requestedCountOfPosts + postsCount !== requestedCountOfPosts &&
                requestedCountOfPosts > postsCount
            ) {
                return;
            }
            try {
                const response = await axios.get("/api/post/posts", {
                    params: {
                        requestedCountOfPosts: requestedCountOfPosts,
                        postLimit: postLimit,
                    },
                });

                const data = [...response.data.posts];
                commit("UPDATE_POSTS", data);
                commit("ADD_POST_METADATA");
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
                dispatch("getPosts");
            } catch (error) {
                commit("SET_ERROR_MESSAGE", error.response.data.message);
            }
        },
    },
    namespaced: true,
};
