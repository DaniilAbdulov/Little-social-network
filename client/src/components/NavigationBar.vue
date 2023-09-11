<template>
    <nav class="navbar">
        <div class="navbar__content">
            <router-link class="navbar__link" to="/">Home</router-link>
            <router-link class="navbar__link" to="/posts">Posts</router-link>
            <router-link class="navbar__link" to="/todo">ToDo</router-link>
        </div>
        <div class="navbar__auth">
            <router-link
                class="navbar__link"
                to="/login"
                v-if="!adminIsAuthenticated && !userIsAuthenticated"
                >Login</router-link
            >
            <router-link class="navbar__link" to="/signup">SignUp</router-link>
            <button
                class="navbar__link"
                @click="logOutUser"
                v-if="adminIsAuthenticated || userIsAuthenticated"
            >
                LogOut
            </button>
        </div>
    </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
    name: "NavigationBar",
    computed: {
        ...mapGetters("lognsig", {
            adminIsAuthenticated: "adminIsAuthenticated",
            userIsAuthenticated: "userIsAuthenticated",
        }),
    },
    methods: {
        ...mapActions("lognsig", {
            logOutUser: "logOutUser",
        }),
    },
};
</script>

<style>
.navbar {
    display: flex;
    gap: 20px;
    background: gold;
    height: 30px;
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
}
</style>
