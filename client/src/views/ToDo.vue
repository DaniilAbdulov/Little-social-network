<template>
    <div>
        Todos
        <div>
            <form @submit.prevent="createToDo">
                <input type="text" placeholder="todo" v-model="todo.body" />
                <button type="submit">create</button>
            </form>
        </div>
        <div>
            <div class="todos" v-for="todo in todos" :key="todo.id">
                {{ todo }}
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
    data() {
        return {
            todo: {
                body: "",
                completed: false,
            },
        };
    },
    methods: {
        createToDo() {
            this.createTodoInDB(this.todo);
            this.body = "";
        },
        ...mapActions("todos", {
            createTodoInDB: "createTodoInDB",
            getTodosOfUser: "getTodosOfUser",
        }),
    },
    computed: {
        ...mapState("todos", {
            todos: (state) => state.todos,
            isLoading: (state) => state.isLoading,
        }),
    },
    mounted() {
        this.getTodosOfUser();
    },
};
</script>

<style></style>
