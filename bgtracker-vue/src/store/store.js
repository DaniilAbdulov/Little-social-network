import { createStore } from "vuex";
import axios from "axios";
export default createStore({
    state: {
        user: {
            id: null,
            email: "",
            username: "",
        },
    },
    getters: {
        isAuthenticated(state) {
            return !!state.user.id;
        },
    },
    mutations: {
        CURRENT_USER_FETCHED(state, user) {
            state.user.id = user.id;
            state.user.email = user.email;
            state.user.username = user.username;
        },
    },
    actions: {
        async initialLoad(context) {
            if (localStorage.bjtrackerjwt) {
                axios.defaults.headers.common.Authorization = `Bearer ${localStorage.bjtrackerjwt}`;
                const res = await axios.get("/api/auth/currentUser");
                context.commit("CURRENT_USER_FETCHED", res.data.user);
            }
        },
        async logInUser({ commit }, { username, password }) {
            try {
                const response = await axios.post("/api/auth/login", {
                    username,
                    password,
                });
                const { user, token } = response.data;
                commit("CURRENT_USER_FETCHED", user);
                localStorage.setItem("bjtrackerjwt", token);
                axios.defaults.headers.common.Authorization = `Bearer ${token}`;
            } catch (error) {
                console.error(error);
            }
        },
    },
    modules: {},
});
