import axios from "axios";
const moment = require("moment");
export const CommentsModule = {
    state: () => ({
        comment: {
            body: "",
            post_id: "",
        },
        comments: [],
        isLoading: false,
        commentsErrorMessage: "",
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
            state.commentsErrorMessage = message;
        },
        UPDATE__COMMENTS(state, comment) {
            state.comments.push(comment);
        },
        COMMENTS_AFTER_DELETE(state, com_id) {
            state.comments = state.comments.filter(
                (comment) => comment.id !== com_id
            );
        },
        ADD_COMMENT_METADATA(state) {
            state.comments.forEach((comment) => {
                const date = comment.created_at;
                const formattedDate = moment(date)
                    .local()
                    .locale("ru")
                    .format("DD MMMM YYYYг. в HH:mm");
                comment.time = formattedDate;
            });
        },
    },
    actions: {
        async createCommentInDB({ commit }, comment) {
            try {
                const response = await axios.post("/api/comment/newcomment", {
                    body: comment.body,
                    post_id: comment.post_id,
                });
                commit("UPDATE__COMMENTS", response.data.newComment[0]);
                commit("ADD_COMMENT_METADATA");
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
                commit("ADD_COMMENT_METADATA");
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
