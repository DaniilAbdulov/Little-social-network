import axios from "axios";
export const LogSignModule = {
    state: () => ({
        user: {
            id: null,
            email: "",
            username: "",
            role: "",
        },
        errorMessage: "",
    }),
    //        username() {
    //     return this.$store.state.lognsig.user.username;
    // },для доступа в компонентах
    getters: {
        isAuthenticated(state) {
            return !!state.user.id;
        },
    },
    // ...mapGetters("lognsig", {
    //     isAuthenticated: "isAuthenticated",
    // }),для доступа в компонентах
    mutations: {
        CURRENT_USER_FETCHED(state, user) {
            state.user.id = user.id;
            state.user.email = user.email;
            state.user.username = user.username;
            state.user.role = user.role;
        },
        SET_ERROR_MESSAGE(state, message) {
            state.errorMessage = message;
        },
    },
    actions: {
        //        ...mapActions("lognsig", {
        //     logInUser*название функции*: "logInUser*название функции*",
        // }), для доступа в компонентах
        async initialLoad(context) {
            if (localStorage.bgtrackerjwt) {
                axios.defaults.headers.common.Authorization = `Bearer ${localStorage.bgtrackerjwt}`;
                try {
                    const res = await axios.get("/api/auth/currentUser");
                    context.commit("CURRENT_USER_FETCHED", res.data.user);
                } catch (error) {
                    console.error("Error fetching currentUser:", error);
                }
            }
        },
        async logInUser({ commit, dispatch }, { username, password }) {
            try {
                const response = await axios.post("/api/auth/login", {
                    username,
                    password,
                });
                const { user, token } = response.data;
                commit("CURRENT_USER_FETCHED", user);
                localStorage.setItem("bgtrackerjwt", token);
                axios.defaults.headers.common.Authorization = `Bearer ${token}`;
                this.getters.isAuthenticated;
                setTimeout(() => {
                    dispatch("logOutUser");
                }, 3600000);
            } catch (error) {
                commit("SET_ERROR_MESSAGE", error.response.data.message);
            }
        },

        logOutUser({ commit }) {
            commit("CURRENT_USER_FETCHED", {
                id: null,
                email: "",
                username: "",
            });
            localStorage.removeItem("bgtrackerjwt");
            axios.defaults.headers.common.Authorization = null;
        },
    },
    namespaced: true,
};
