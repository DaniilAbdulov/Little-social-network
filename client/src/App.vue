<template>
    <div class="app" :class="{ 'app-dark': isDarkTheme }">
        <navigation-bar />
        <div class="container">
            <router-view></router-view>
        </div>
        <footer-bar />
    </div>
</template>

<script>
import FooterBar from "./components/FooterBar.vue";
import NavigationBar from "./components/NavigationBar.vue";
import { mapState } from "vuex";
export default {
    components: {
        NavigationBar,
        FooterBar,
    },
    computed: {
        ...mapState("theme", {
            isDarkTheme: (state) => state.isDarkTheme,
        }),
    },
    name: "App",
    created() {
        this.$store.dispatch("lognsig/initialLoad");
    },
};
</script>

<style>
.app-dark {
    background: rgb(11 11 11);
    color: white;
}
</style>
