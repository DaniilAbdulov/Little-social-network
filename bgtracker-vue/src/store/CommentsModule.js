import axios from "axios";
export const CommentsModule = {
    state: () => ({
        comment: {
            body: "",
            post_id: "",
        },
        comments: [],
    }),
    getters: {},
    mutations: {
        SET_ALL_COMMENTS(state, comments) {
            state.comments = comments;
        },
    },
    actions: {
        async createCommentInDB({ dispatch }, comment) {
            try {
                await axios.post("/api/comment/newcomment", {
                    body: comment.body,
                    post_id: comment.post_id,
                });
                dispatch("getAllcomments", comment.post_id);
            } catch (error) {
                console.log(error);
            }
        },
        async getAllcomments({ commit }, postId) {
            try {
                const response = await axios.get(
                    `/api/comment/commentsofpost/${postId}`
                );
                commit("SET_ALL_COMMENTS", response.data.comments);
            } catch (error) {
                console.log(error);
            }
        },
    },
    namespaced: true,
};
