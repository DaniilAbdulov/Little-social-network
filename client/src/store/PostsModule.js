import axios from "axios";
import moment from "moment";
export const PostsModule = {
    state: () => ({
        post: {
            title: "",
            body: "",
        },
        posts: [],
        postErrorMessage: "",
        requestedCountOfPosts: 0,
        postLimit: 4,
        postsCount: 0,
    }),
    getters: {},
    mutations: {
        SET_ALL_POSTS(state, posts) {
            state.posts = posts;
        },
        SET_ERROR_MESSAGE(state, message) {
            state.postErrorMessage = message;
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
                const date = post.created_at;
                const formattedDate = moment(date)
                    .local()
                    .locale("ru")
                    .format("DD MMMM YYYYг. в HH:mm");
                post.time = formattedDate;
                post.indexOfPopular = +post.comment_count + +post.likes_count;
                post.body_length = post.body.length;
            });
        },
        ADD_NEW_POST(state, post) {
            state.posts.unshift(post);
        },
        POSTS_AFTER_DELETE(state, post_id) {
            state.posts = state.posts.filter((post) => post.id !== post_id);
        },
    },
    actions: {
        async createPostInDB({ commit }, post) {
            try {
                const response = await axios.post("/api/post/newpost", {
                    title: post.title,
                    body: post.body,
                });
                commit("ADD_NEW_POST", response.data.post[0]);
                commit("ADD_POST_METADATA");
            } catch (error) {
                console.log(error);
            }
        },
        async getPosts({ state, commit }) {
            commit("EMPTY_COUNT_OF_REQUESTED_POSTS");
            const requestedCountOfPosts = state.requestedCountOfPosts;
            const postLimit = state.postLimit;
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
        async getMorePosts({ state, commit }) {
            commit("INCREMENT_POST_PAGE");
            const requestedCountOfPosts = state.requestedCountOfPosts;
            const postLimit = state.postLimit;
            const postsCount = state.postsCount;
            if (requestedCountOfPosts + postLimit * 2 > postsCount * 2) {
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
            commit("SET_ERROR_MESSAGE", "");
            try {
                await axios.delete("/api/post/deletepost", {
                    data: {
                        post_id: post.id,
                        user_id: post.user_id,
                    },
                });
                commit("POSTS_AFTER_DELETE", post.id);
            } catch (error) {
                commit("SET_ERROR_MESSAGE", error.response.data.message);
            }
        },
    },
    namespaced: true,
};
