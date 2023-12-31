<template>
    <div class="login-page">
        <div
            class="log-reg-form"
            :class="{ 'log-reg-form-active': isDarkTheme }"
            v-if="!adminIsAuthenticated || !userIsAuthenticated"
        >
            <h1>Log In</h1>
            <form @submit.prevent="handleSubmit">
                <div
                    class="log-reg-form__item"
                    :class="{
                        'log-reg-form__error': passwordError,
                        'log-reg-form-active__item': isDarkTheme,
                    }"
                >
                    <label for="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        v-model="user.username"
                        autocomplete="username"
                        :placeholder="usernamePlaceholder"
                        required
                        class="log-reg-form__input"
                    />
                </div>
                <div
                    class="log-reg-form__item"
                    :class="{
                        'log-reg-form__error': passwordError,
                        'log-reg-form-active__item': isDarkTheme,
                    }"
                >
                    <label for="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        v-model="user.password"
                        autocomplete="current-password"
                        required
                        :placeholder="passwordPlaceholder"
                        class="log-reg-form__input"
                    />
                </div>
                <button type="submit">Log In</button>
            </form>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";

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
            usernamePlaceholder: "gendalf",
            passwordPlaceholder: "****",
            userError: false,
            passwordError: false,
        };
    },
    methods: {
        async handleSubmit() {
            try {
                await this.logInUser(this.user);
                this.userError = false;
                this.passwordError = false;
                if (!this.errorMessage) {
                    this.hideDialog();
                } else {
                    this.errorHandler();
                }
            } catch (error) {
                console.error(error);
            }
        },
        hideDialog() {
            this.$emit("update:logInVisible", false);
        },
        errorHandler() {
            this.user.username = "";
            this.user.password = "";
            if (this.errorMessage === "User not found") {
                this.userError = true;
                this.usernamePlaceholder = "User not found";
                this.passwordPlaceholder = "****";
            } else {
                this.passwordError = true;
                this.usernamePlaceholder = "gendalf";
                this.passwordPlaceholder = "Invalid password";
            }
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
        ...mapState("theme", {
            isDarkTheme: (state) => state.isDarkTheme,
        }),
        errorMessage() {
            return this.$store.state.lognsig.errorMessage;
        },
    },
};
</script>

<style lang="scss">
.log-reg-form {
    display: flex;
    flex-direction: column;
    text-align: center;
    max-width: 300px;
    margin: 0 auto;
    border-radius: 10px;
    color: black;
    & h1 {
        margin-bottom: 10px;
        font-weight: bold;
    }
    & button {
        border: 2px solid black;
        padding: 1px 3px;
    }
    &__item {
        display: flex;
        flex-direction: column;
        gap: 5px;
        margin-bottom: 10px;
    }
    &__error input {
        border: 2px solid red;
        box-shadow: inset 0px 0px 5px 0px red;
    }
    &__item input {
        border: 1px solid black;
        border-radius: 5px;
        padding: 10px;
        font-size: 14px;
        line-height: 14px;
        &::placeholder {
            color: pink;
        }
    }
    &-active {
        & h1 {
            color: white;
        }
        & button {
            border: 2px solid rgb(255, 255, 255);
            color: white;
        }
        &__item input {
            border: 1px solid rgb(255, 255, 255);
            color: red;
        }
        &__item label {
            color: white;
        }
    }
}
</style>
