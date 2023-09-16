import axios from "axios";
const moment = require("moment");
export const UserModule = {
    state: () => ({
        user: {
            username: "",
            email: "",
            registration: "",
            postsCount: null,
            commentsCount: null,
            likesCount: null,
            todosCount: null,
        },
    }),
    getters: {},
    mutations: {
        SET_INFO_ABOUT_FETCHED_USER(state, data) {
            console.log(data.postsCount[0].count);
            state.user.username = data.userInfo[0].username;
            state.user.email = data.userInfo[0].email;
            state.user.registration = data.userInfo[0].created_at;
            state.user.postsCount = data.postsCount[0].count;
            state.user.commentsCount = data.commentsCount[0].count;
            state.user.likesCount = data.likesCount[0].count;
            state.user.todosCount = data.todosCount[0].count;
        },
    },
    actions: {
        async getInfoAboutUser({ commit }) {
            try {
                const response = await axios.get("/api/user/info/");
                commit("SET_INFO_ABOUT_FETCHED_USER", response.data);
            } catch (error) {
                console.log(error);
            }
        },
    },
    namespaced: true,
};
