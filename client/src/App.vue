<template>
    <div class="app">
        <navigation-bar />
        <div class="container">
            <router-view></router-view>
        </div>
        <div class="footer">footer</div>
    </div>
</template>

<script>
import NavigationBar from "./components/NavigationBar.vue";
export default {
    components: {
        NavigationBar,
    },
    name: "App",
    created() {
        this.$store.dispatch("lognsig/initialLoad");
    },
};
</script>

<style></style>
