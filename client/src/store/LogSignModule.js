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
        regErrorMessage: "",
        regUser: {
            regUserName: "",
        },
    }),
    //        username() {
    //     return this.$store.state.lognsig.user.username;
    // },для доступа в компонентах
    getters: {
        adminIsAuthenticated(state) {
            return !!state.user.id;
        },
        userIsAuthenticated(state) {
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
        SET_REGERROR_MESSAGE(state, regmessage) {
            state.regErrorMessage = regmessage;
        },
        SET_REG_USER(state, newUser) {
            state.regUser.regUserName = newUser.username;
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
            commit("SET_ERROR_MESSAGE", "");
            try {
                const response = await axios.post("/api/auth/login", {
                    username,
                    password,
                });
                const { user, token } = response.data;
                commit("CURRENT_USER_FETCHED", user);
                localStorage.setItem("bgtrackerjwt", token);
                axios.defaults.headers.common.Authorization = `Bearer ${token}`;
                if (response.data.user.role != "admin") {
                    this.getters.userIsAuthenticated;
                } else {
                    this.getters.adminIsAuthenticated;
                }
            } catch (error) {
                commit("SET_ERROR_MESSAGE", error.response.data.message);
            }
        },
        async RegistrationUser(
            { commit, state },
            { username, password, email, repeatpassword }
        ) {
            try {
                const response = await axios.post("/api/auth/register", {
                    username,
                    password,
                    email,
                    repeatpassword,
                });
                const { token } = response.data;
                const newUser = response.data.user;
                localStorage.setItem("bgtrackerjwt", token); // сохраняем токен нового пользователя в локальном хранилище
                axios.defaults.headers.common.Authorization = `Bearer ${token}`; // задаем заголовок Authorization для всех последующих запросов
                commit("SET_REG_USER", newUser); // обновляем информацию о новом пользователе в состоянии Vuex
            } catch (error) {
                commit("SET_REGERROR_MESSAGE", error.response.data.message);
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
