<template>
    <div class="app">
        <navigation-bar />
        <div class="container">
            <router-view></router-view>
        </div>
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

<style>
* {
    margin: 0;
    padding: 0;
}
.container {
    max-width: 90%;
    margin: 0 auto;
}
</style>
