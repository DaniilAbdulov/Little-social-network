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
        CLEAR_TODO_BODY(state) {
            state.todo.body = "";
        },
    },
    actions: {
        async createTodoInDB({ commit, dispatch }, todo) {
            try {
                await axios.post("/api/todos/newtodo", {
                    body: todo.body,
                    completed: todo.completed,
                    user_id: todo.user_id,
                });
                commit("CLEAR_TODO_BODY");
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
        async deleteTodo({ dispatch }, todo) {
            try {
                await axios.delete("/api/todos/deletetodo", {
                    data: { todo_id: todo.id },
                });

                dispatch("getTodosOfUser");
            } catch (error) {
                console.log(error);
            }
        },
        async changeComplete({ dispatch }, todo) {
            try {
                await axios.patch("/api/todos/changecomplete", {
                    data: { todo_id: todo.id },
                });

                dispatch("getTodosOfUser");
            } catch (error) {
                console.log(error);
            }
        },
    },
    namespaced: true,
};
