export const LightDarkThemeModule = {
    state: () => ({
        isDarkTheme: JSON.parse(localStorage.getItem("isDarkTheme")) || false,
    }),
    getters: {},
    mutations: {
        change_theme(state) {
            state.isDarkTheme = !state.isDarkTheme;
            localStorage.setItem(
                "isDarkTheme",
                JSON.stringify(state.isDarkTheme)
            );
        },
    },
    actions: {
        changeThemeOfPage({ commit }) {
            commit("change_theme");
        },
    },
    namespaced: true,
};
