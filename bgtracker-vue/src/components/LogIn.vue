<template>
    <div class="login-page">
        <div class="log-reg-form" v-if="!isAuthenticated">
            <h1>Log In</h1>
            <form @submit.prevent="handleSubmit">
                <div class="log-reg-form__item">
                    <label for="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        v-model="user.username"
                        autocomplete="username"
                        required
                    />
                </div>
                <div class="log-reg-form__item">
                    <label for="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        v-model="user.password"
                        autocomplete="current-password"
                        required
                        placeholder="password"
                    />
                </div>
                <button type="submit">Log In</button>
            </form>
        </div>
        <div class="log-reg-completed" v-if="isAuthenticated">
            <h2>Congratulations, {{ username }}</h2>
            <p>You are logged in</p>
            <p>
                Let's see what is going on here
                <router-link to="/">Home</router-link>
            </p>
        </div>
        <div v-else-if="errorMessage">{{ errorMessage }}</div>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
    data() {
        return {
            user: {
                username: "",
                password: "",
            },
        };
    },
    methods: {
        async handleSubmit() {
            try {
                await this.$store.dispatch("logInUser", this.user);
            } catch (error) {
                // Обработка ошибки здесь
                console.error(error);
            }
        },
        ...mapMutations(["logInUser"]),
    },
    computed: {
        ...mapGetters(["isAuthenticated"]),
        username() {
            return this.$store.state.user.username;
        },
        errorMessage() {
            return this.$store.state.errorMessage;
        },
    },
};
</script>

<style>
.log-reg-form {
    display: flex;
    flex-direction: column;
    text-align: center;
    max-width: 300px;
    margin: 0 auto;
    border: 1px solid black;
    border-radius: 10px;
    padding: 10px;
}
.log-reg-form__item {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-bottom: 10px;
}
</style>
