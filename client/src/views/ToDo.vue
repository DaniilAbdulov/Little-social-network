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
                <button @click="changeComplete(todo)" class="todo__completed">
                    {{ todo.completed }}
                </button>
                <div class="todo__content">{{ todo.body }}</div>
                <button @click="deleteTodo(todo)">delte todo</button>
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
            this.todo.body = "";
        },
        ...mapActions("todos", {
            createTodoInDB: "createTodoInDB",
            deleteTodo: "deleteTodo",
            getTodosOfUser: "getTodosOfUser",
            changeComplete: "changeComplete",
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
