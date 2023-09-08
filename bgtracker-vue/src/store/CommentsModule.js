import axios from "axios";
export const CommentsModule = {
    state: () => ({
        comment: {
            body: "",
            post_id: "",
        },
        comments: [],
        isLoading: false,
    }),
    getters: {},
    mutations: {
        SET_COMMENTS_OF_POST(state, comments) {
            state.comments = comments;
        },
        SET_LOADING(state, loading) {
            state.isLoading = loading;
        },
    },
    actions: {
        async createCommentInDB({ dispatch }, comment) {
            try {
                await axios.post("/api/comment/newcomment", {
                    body: comment.body,
                    post_id: comment.post_id,
                });
                dispatch("getCommentsOfPost", comment.post_id);
            } catch (error) {
                console.log(error);
            }
        },
        async getCommentsOfPost({ commit }, postId) {
            try {
                commit("SET_LOADING", true);
                const response = await axios.get(
                    `/api/comment/commentsofpost/${postId}`
                );
                commit("SET_COMMENTS_OF_POST", response.data.comments);
                console.log(response.data.comments);
                commit("SET_LOADING", false);
            } catch (error) {
                console.log(error);
                commit("SET_LOADING", false);
            }
        },
    },
    namespaced: true,
};
