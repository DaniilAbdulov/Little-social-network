import axios from "axios";

const initializeAxiosHeaders = (token) => {
    if (token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common.Authorization;
    }
};

export const LogSignModule = {
    state: () => ({
        user: { id: null, email: "", username: "", role: "" },
        errorMessage: "",
        regErrorMessage: "",
        regUser: { regUserName: "" },
    }),
    getters: {
        adminIsAuthenticated(state) {
            return !!state.user.id;
        },
        userIsAuthenticated(state) {
            return !!state.user.id;
        },
    },
    mutations: {
        setCurrentUser(state, user) {
            Object.assign(state.user, user);
        },
        setErrorMessage(state, message) {
            state.errorMessage = message;
        },
        setRegErrorMessage(state, regMessage) {
            state.regErrorMessage = regMessage;
        },
        setRegUser(state, newUser) {
            state.regUser.regUserName = newUser.username;
        },
    },
    actions: {
        async initialLoad({ commit }) {
            const token = localStorage.getItem("bgtrackerjwt");
            initializeAxiosHeaders(token);

            if (token) {
                try {
                    const res = await axios.get("/api/auth/currentUser");
                    commit("setCurrentUser", res.data.user);
                } catch (error) {
                    console.error("Error fetching currentUser:", error);
                }
            }
        },
        async logInUser({ commit }, { username, password }) {
            commit("setErrorMessage", "");

            try {
                const response = await axios.post("/api/auth/login", {
                    username,
                    password,
                });
                const { user, token } = response.data;

                commit("setCurrentUser", user);
                localStorage.setItem("bgtrackerjwt", token);
                initializeAxiosHeaders(token);
            } catch (error) {
                commit("setErrorMessage", error.response.data.message);
            }
        },
        async RegistrationUser(
            { commit },
            { username, password, email, repeatpassword }
        ) {
            commit("setRegErrorMessage", "");

            try {
                const response = await axios.post("/api/auth/register", {
                    username,
                    password,
                    email,
                    repeatpassword,
                });
                const { user: newUser, token } = response.data;

                localStorage.setItem("bgtrackerjwt", token);
                initializeAxiosHeaders(token);
                commit("setRegUser", newUser);
            } catch (error) {
                commit("setRegErrorMessage", error.response.data.message);
            }
        },
        logOutUser({ commit }) {
            commit("setCurrentUser", {
                id: null,
                email: "",
                username: "",
                role: "",
            });
            localStorage.removeItem("bgtrackerjwt");
            initializeAxiosHeaders(null);
        },
    },
    namespaced: true,
};
