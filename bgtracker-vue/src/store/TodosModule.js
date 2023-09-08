import axios from "axios";
export const TodosModule = {
    state: () => ({
        todo: {
            body: "",
            completed: false,
        },
        todos: [],
        isLoading: false,
    }),
    getters: {},
    mutations: {
        SET_TODOS(state, todos) {
            state.todos = todos;
        },
        SET_LOADING(state, loading) {
            state.isLoading = loading;
        },
    },
    actions: {
        async createTodoInDB({ dispatch }, todo) {
            try {
                await axios.post("/api/todos/newtodo", {
                    body: todo.body,
                    completed: todo.completed,
                    user_id: todo.user_id,
                });
                dispatch("getTodosOfUser");
            } catch (error) {
                console.log(error);
            }
        },
        async getTodosOfUser({ commit }) {
            try {
                commit("SET_LOADING", true);
                const response = await axios.get(`/api/todos/todosofuser/`);
                commit("SET_TODOS", response.data.todos);
                commit("SET_LOADING", false);
            } catch (error) {
                console.log(error);
                commit("SET_LOADING", false);
            }
        },
    },
    namespaced: true,
};
