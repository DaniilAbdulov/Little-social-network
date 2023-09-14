<template>
    <div class="login-page">
        <div
            class="log-reg-form"
            v-if="!adminIsAuthenticated || !userIsAuthenticated"
        >
            <h1>Log In</h1>
            <form @submit="handleSubmit">
                <div class="log-reg-form__item">
                    <label for="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        v-model="user.username"
                        autocomplete="username"
                        placeholder="gendalf"
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
                        placeholder="****"
                    />
                </div>
                <button type="submit">Log In</button>
            </form>
        </div>
        <div style="color: red">{{ errorMessage }}</div>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    props: {
        logInVisibile: {
            type: Boolean,
            default: false,
        },
    },
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
                await this.logInUser(this.user);
                if (!this.errorMessage) {
                    this.hideDialog();
                }
            } catch (error) {
                console.error(error);
            }
        },
        hideDialog() {
            this.$emit("update:logInVisible", false);
        },
        ...mapActions("lognsig", {
            logInUser: "logInUser",
        }),
    },
    computed: {
        ...mapGetters("lognsig", {
            adminIsAuthenticated: "adminIsAuthenticated",
            userIsAuthenticated: "userIsAuthenticated",
        }),
        username() {
            return this.$store.state.lognsig.user.username;
        },
        userrole() {
            return this.$store.state.lognsig.user.role;
        },
        errorMessage() {
            return this.$store.state.lognsig.errorMessage;
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
    border-radius: 10px;
    /* padding: 10px; */
}
.log-reg-form__item {
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-bottom: 10px;
}
</style>
