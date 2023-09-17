export const LightDarkThemeModule = {
    state: () => ({
        isDarkTheme: false,
    }),
    getters: {},
    mutations: {
        change_theme(state) {
            state.isDarkTheme = !state.isDarkTheme;
        },
    },
    actions: {
        changeThemeOfPage({ commit }) {
            commit("change_theme");
        },
    },
    namespaced: true,
};
