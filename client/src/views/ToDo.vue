<template>
    <div class="content">
        <div class="form__container">
            <form @submit.prevent="createToDo">
                <input
                    type="text"
                    placeholder="todo"
                    v-model="todo.body"
                    class="input__task"
                    required
                />
                <button type="submit" class="form-btn">create</button>
            </form>
        </div>
        <TransitionGroup name="list" tag="ul" v-if="todos.length">
            <li class="todo" v-for="todo in todos" :key="todo.id">
                <input
                    type="checkbox"
                    v-model="todo.completed"
                    @change="changeComplete(todo)"
                    class="todo__checkbox"
                />
                <div
                    class="todo__content"
                    :class="{ 'todo__content-completed': todo.completed }"
                >
                    {{ todo.body }}
                </div>
                <button @click="deleteTodo(todo)" class="form-btn">
                    delete
                </button>
            </li>
        </TransitionGroup>
        <div v-else class="todo__empty">
            List is empty. Please LogIn to create todos
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

<style lang="scss" scoped>
.content {
    background: rgb(46, 45, 45);
}
.form__container {
    padding: 0px 10px;
    margin-bottom: 20px;
}
form {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
}
.input__task {
    border-radius: 20px;
    background-color: #8181816b;
    padding: 10px;
    font-size: 22px;
    line-height: 22px;
    color: white;
}
.form-btn {
    font-size: 24px;
    font-weight: 700;
    letter-spacing: 1px;
    background-color: rgb(236, 72, 153);
    background-image: linear-gradient(
        90deg,
        rgba(236, 72, 153, 1) 0%,
        rgba(145, 91, 241, 1) 35%,
        rgba(145, 91, 241, 1) 100%
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
.todo {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.todo__checkbox {
    width: 30px;
    height: 30px;
}
.todo__content {
    border-radius: 10px;
    background-color: #8181816b;
    padding: 10px;
    font-size: 20px;
    line-height: 20px;
    color: white;
    flex: 1 1 auto;
}
.todo__content-completed {
    text-decoration: line-through;
}
.todo__empty {
    font-size: 20px;
    line-height: 20px;
    color: white;
    text-align: center;
}
ul {
    padding: 0px 10px;
    width: 100%;
}
li {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    margin-bottom: 10px;
}
li:nth-last-child {
    margin-bottom: 0px;
}
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>
