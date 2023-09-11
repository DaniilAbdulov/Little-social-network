import axios from "axios";

export const PostsModule = {
    state: () => ({
        post: {
            title: "",
            body: "",
        },
        posts: [],
        errorMessage: "",
        postPage: 1,
        postLimit: 3,
        totalPage: 0,
    }),
    getters: {},
    mutations: {
        SET_ALL_POSTS(state, posts) {
            state.posts = posts;
        },
        SET_ERROR_MESSAGE(state, message) {
            state.errorMessage = message;
        },
        // setPostPage(state, postPage) {
        //     state.postPage = postPage;
        // },
        // setTotalPage(state, totalPage) {
        //     state.totalPage = totalPage;
        // },
        // INCREMENT_POST_PAGE(state) {
        //     state.postPage += 1;
        // },
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
            const postPage = this.state.posts.postPage;
            const postLimit = this.state.posts.postLimit;
            try {
                const response = await axios.get("/api/post/allposts", {
                    params: { postPage: postPage, postLimit: postLimit },
                });
                // const totalCount = response.data.posts_length;
                // console.log(totalCount);
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
