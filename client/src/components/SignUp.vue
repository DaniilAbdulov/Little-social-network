<template>
    <div class="signup-page">
        <div class="log-reg-form">
            <h1>Sign Up</h1>
            <form @submit.prevent="handleSubmit">
                <div class="log-reg-form__item">
                    <label for="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        v-model="user.username"
                        required
                    />
                </div>
                <div class="log-reg-form__item">
                    <label for="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        v-model="user.email"
                        required
                    />
                </div>
                <div class="log-reg-form__item">
                    <label for="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        v-model="user.password"
                        required
                    />
                </div>
                <div class="log-reg-form__item">
                    <label for="repeatpassword">Please, repeat password:</label>
                    <input
                        type="password"
                        id="repeatpassword"
                        v-model="user.repeatpassword"
                        required
                    />
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
        <div>{{ errorMessage }}</div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    props: {
        signUpVisible: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            user: {
                username: "",
                email: "",
                password: "",
                repeatpassword: "",
            },
        };
    },
    methods: {
        async handleSubmit() {
            try {
                await this.RegistrationUser(this.user);
                this.hideDialog();
                console.log(this.user);
            } catch (error) {
                // Обработка ошибки здесь
                console.error(error);
            }
        },
        hideDialog() {
            this.$emit("update:signUpVisible", false);
        },
        ...mapActions("lognsig", {
            RegistrationUser: "RegistrationUser",
        }),
    },
    computed: {
        errorMessage() {
            return this.$store.state.lognsig.regErrorMessage;
        },
    },
};
</script>

<style>
.log-reg-completed {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid black;
    padding: 15px;
    text-align: center;
}
</style>
