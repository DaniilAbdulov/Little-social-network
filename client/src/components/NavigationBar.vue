<template>
    <nav class="navbar">
        <div class="navbar__content">
            <router-link class="navbar__link" to="/">Home</router-link>
            <router-link class="navbar__link" to="/posts">Posts</router-link>
            <router-link class="navbar__link" to="/todo">ToDo</router-link>
        </div>
        <div class="navbar__auth">
            <button
                class="navbar__link"
                v-if="!adminIsAuthenticated && !userIsAuthenticated"
                @click="showLogIn"
            >
                Login
            </button>
            <my-dialog v-model:show="logInVisible">
                <log-in
                    :logInVisible="logInVisible"
                    @update:logInVisible="updateLogInVisible"
                ></log-in>
            </my-dialog>
            <button
                class="navbar__link"
                v-if="!adminIsAuthenticated && !userIsAuthenticated"
                @click="showSignUp"
            >
                SignUp
            </button>
            <my-dialog v-model:show="signUpVisible">
                <sign-up
                    :signUpVisible="signUpVisible"
                    @update:signUpVisible="updatesignUpVisible"
                ></sign-up>
            </my-dialog>
            <log-out
                class="navbar__link"
                @click="logOutHandler"
                v-if="adminIsAuthenticated || userIsAuthenticated"
            >
            </log-out>
            <div
                class="navbar__avatar avatar"
                v-if="adminIsAuthenticated || userIsAuthenticated"
            >
                <div class="avatar__username">
                    <router-link to="/user">@{{ user_name }}</router-link>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
import SignUp from "./SignUp.vue";
import LogIn from "./LogIn.vue";
import LogOut from "./UI/LogOut.vue";
export default {
    data() {
        return {
            logInVisible: false,
            signUpVisible: false,
        };
    },
    components: {
        LogIn,
        SignUp,
        LogOut,
    },
    computed: {
        ...mapGetters("lognsig", {
            adminIsAuthenticated: "adminIsAuthenticated",
            userIsAuthenticated: "userIsAuthenticated",
        }),
        ...mapState("lognsig", {
            user_name: (state) => state.user.username,
        }),
    },
    methods: {
        logOutHandler() {
            this.logOutUser();
            location.reload();
        },
        ...mapActions("lognsig", {
            logOutUser: "logOutUser",
        }),
        showLogIn() {
            this.logInVisible = true;
        },
        updateLogInVisible(newLogInVisible) {
            this.logInVisible = newLogInVisible;
        },
        showSignUp() {
            this.signUpVisible = true;
        },
        updatesignUpVisible(newsignUpVisible) {
            this.signUpVisible = newsignUpVisible;
        },
    },
};
</script>

<style>
.navbar {
    width: 100%;
    display: flex;
    gap: 20px;
    background: #acabaa;
    height: 40px;
    align-items: center;
    padding: 10px;
    margin-bottom: 30px;
    justify-content: space-between;
}
.navbar__link {
    color: black;
    text-decoration: none;
}
.navbar__content,
.navbar__auth {
    display: flex;
    gap: 10px;
    align-items: center;
}
.navbar__avatar {
}
.avatar {
}
.avatar__username {
}
</style>
