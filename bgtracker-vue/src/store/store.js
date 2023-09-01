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
    getters: {},
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
    },
    modules: {},
});
