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
                <button type="submit">Sign Up</button>
            </form>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
    data() {
        return {
            user: {
                username: "",
                email: "",
                password: "",
            },
        };
    },
    methods: {
        async handleSubmit() {
            try {
                await this.RegistrationUser(this.user);
            } catch (error) {
                // Обработка ошибки здесь
                console.error(error);
            }
        },
        ...mapActions("lognsig", {
            RegistrationUser: "RegistrationUser",
        }),
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
