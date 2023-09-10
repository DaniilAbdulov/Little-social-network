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
                commit("SET_LOADING", false);
            } catch (error) {
                console.log(error);
                commit("SET_LOADING", false);
            }
        },
        async deleteComment({ dispatch }, { com, postId }) {
            try {
                await axios.delete("/api/comment/deletecomment", {
                    data: { comment_id: com.id },
                });
                dispatch("getCommentsOfPost", postId);
            } catch (error) {
                console.log(error);
            }
        },
    },
    namespaced: true,
};
