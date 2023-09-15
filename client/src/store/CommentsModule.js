import axios from "axios";
export const CommentsModule = {
    state: () => ({
        comment: {
            body: "",
            post_id: "",
        },
        comments: [],
        isLoading: false,
        errorMessage: "",
    }),
    getters: {},
    mutations: {
        SET_COMMENTS_OF_POST(state, comments) {
            state.comments = comments;
        },
        SET_LOADING(state, loading) {
            state.isLoading = loading;
        },
        SET_ERROR_MESSAGE(state, message) {
            state.errorMessage = message;
        },
        UPDATE__COMMENTS(state, comment) {
            state.comments.push(comment);
        },
        COMMENTS_AFTER_DELETE(state, com_id) {
            console.log(com_id);
            state.comments = state.comments.filter(
                (comment) => comment.id !== com_id
            );
        },
    },
    actions: {
        async createCommentInDB({ commit }, comment) {
            try {
                const response = await axios.post("/api/comment/newcomment", {
                    body: comment.body,
                    post_id: comment.post_id,
                });
                console.log(response);
                commit("UPDATE__COMMENTS", response.data);
            } catch (error) {
                commit("SET_ERROR_MESSAGE", error.response.data.message);
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
                commit("SET_ERROR_MESSAGE", error.response.data.message);
                commit("SET_LOADING", false);
            }
        },
        async deleteComment({ commit }, { com, postId }) {
            try {
                await axios.delete("/api/comment/deletecomment", {
                    data: { comment_id: com.id, user_id: com.user_id },
                });
                commit("COMMENTS_AFTER_DELETE", com.id);
            } catch (error) {
                commit("SET_ERROR_MESSAGE", error.response.data.message);
            }
        },
    },
    namespaced: true,
};
