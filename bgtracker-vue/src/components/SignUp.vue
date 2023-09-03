<template>
    <div class="signup-page">
        <div class="log-reg-form" v-if="!signUp">
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
        <div class="log-reg-completed" v-if="signUp">
            <h2>Congratulations</h2>
            <p>You have completed the registration procedure</p>
            <p>
                Let's go to the
                <router-link to="/login">LogIn</router-link> page
            </p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: {
                username: "",
                email: "",
                password: "",
            },
            signUp: false,
        };
    },
    methods: {
        async handleSubmit() {
            this.signUp = true;
            // Call API or store action to sign up the user
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
