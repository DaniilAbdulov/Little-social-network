<template>
    <div class="signup-page">
        <div
            class="log-reg-form"
            :class="{ 'log-reg-form-active': isDarkTheme }"
        >
            <h1>Sign Up</h1>
            <form @submit.prevent="handleSubmit">
                <div v-for="(field, index) in fields" :key="index">
                    <div
                        class="log-reg-form__item"
                        :class="{
                            'log-reg-form__error': errors[field.name],
                            'log-reg-form-active__item': isDarkTheme,
                        }"
                    >
                        <label :for="field.name">{{ field.label }}</label>
                        <input
                            :type="field.type"
                            :id="field.name"
                            v-model="user[field.name]"
                            :placeholder="placeHolders[field.name]"
                            required
                        />
                    </div>
                </div>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
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
            placeHolders: {
                username: "gendalf",
                email: "gendalf@thelordofkings.com",
                password: "****",
                repeatpassword: "****",
            },
            errors: {
                username: false,
                email: false,
                password: false,
            },
            fields: [
                { name: "username", label: "Username", type: "text" },
                { name: "email", label: "Email", type: "email" },
                { name: "password", label: "Password", type: "password" },
                {
                    name: "repeatpassword",
                    label: "Please, repeat password",
                    type: "password",
                },
            ],
        };
    },
    methods: {
        async handleSubmit() {
            try {
                await this.RegistrationUser(this.user);
                this.resetErrors();
                if (!this.errorMessage) {
                    this.hideDialog();
                } else {
                    console.log(this.errorMessage);
                    this.errorHandler();
                }
            } catch (error) {
                // Обработка ошибки здесь
                console.error(error);
            }
        },
        errorHandler() {
            this.resetUser();
            if (this.errorMessage === "Username already exists") {
                this.errors.username = true;
                this.placeHolders.username = "Username already exists";
            } else if (this.errorMessage === "Email already exists") {
                this.errors.email = true;
                this.placeHolders.email = "Email already exists";
            } else if (
                this.errorMessage ===
                "Username already exists and Email already exists"
            ) {
                this.errors.username = true;
                this.errors.email = true;
                this.placeHolders.username = "Username already exists";
                this.placeHolders.email = "Email already exists";
            } else if (this.errorMessage === "Please check your password") {
                this.errors.password = true;
                this.placeHolders.repeatpassword = "Please check your password";
            }
        },
        hideDialog() {
            this.$emit("update:signUpVisible", false);
        },
        resetUser() {
            this.user.username = "";
            this.user.email = "";
            this.user.password = "";
            this.user.repeatpassword = "";
        },
        resetErrors() {
            this.errors.username = false;
            this.errors.email = false;
            this.errors.password = false;
        },
        ...mapActions("lognsig", {
            RegistrationUser: "RegistrationUser",
        }),
    },
    computed: {
        errorMessage() {
            return this.$store.state.lognsig.regErrorMessage;
        },
        ...mapState("theme", {
            isDarkTheme: (state) => state.isDarkTheme,
        }),
    },
};
</script>
<style lang="scss"></style>
