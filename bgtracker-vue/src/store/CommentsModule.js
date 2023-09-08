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
        SET_COMMENTS_OF_POST(state, comments) {
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
                dispatch("getCommentsOfPost", comment.post_id);
            } catch (error) {
                console.log(error);
            }
        },
        async getCommentsOfPost({ commit }, postId) {
            try {
                const response = await axios.get(
                    `/api/comment/commentsofpost/${postId}`
                );
                commit("SET_COMMENTS_OF_POST", response.data.comments);
            } catch (error) {
                console.log(error);
            }
        },
    },
    namespaced: true,
};
