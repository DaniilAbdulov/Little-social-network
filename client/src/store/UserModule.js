import axios from "axios";
import { format, parseISO } from "date-fns";
import { enUS } from "date-fns/locale";

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
            const {
                userInfo: [{ username, email }],
                postsCount: [{ count: postsCount }],
                commentsCount: [{ count: commentsCount }],
                likesCount: [{ count: likesCount }],
                todosCount: [{ count: todosCount }],
            } = data;
            Object.assign(state.user, {
                username,
                email,
                postsCount,
                commentsCount,
                likesCount,
                todosCount,
            });
        },
        ADD_USER_REGISTRATED(state, data) {
            const date = data.userInfo[0].created_at;
            const formattedDate = format(
                parseISO(date),
                "dd MMMM yyyy'г. in' HH:mm",
                { locale: enUS }
            );
            state.user.registration = formattedDate;
        },
    },
    actions: {
        async getInfoAboutUser({ commit }) {
            try {
                const response = await axios.get("/api/user/info/");
                commit("SET_INFO_ABOUT_FETCHED_USER", response.data);
                commit("ADD_USER_REGISTRATED", response.data);
            } catch (error) {
                console.log(error);
            }
        },
    },
    namespaced: true,
};
