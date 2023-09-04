<template>
    <nav class="navbar">
        <router-link class="navbar__link" to="/"> Home </router-link>
        <router-link class="navbar__link" to="/login">Login</router-link>
        <router-link class="navbar__link" to="/signup">SignUp</router-link>
        <button
            class="navbar__link"
            @click="logOutUser"
            v-if="adminIsAuthenticated || userIsAuthenticated"
        >
            LogOut
        </button>
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
}
.navbar__link {
    color: black;
    text-decoration: none;
}
</style>
