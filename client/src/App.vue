<template>
    <div class="app">
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

export default {
    components: {
        NavigationBar,
        FooterBar,
    },
    name: "App",
    created() {
        this.$store.dispatch("lognsig/initialLoad");
    },
};
</script>

<style></style>
