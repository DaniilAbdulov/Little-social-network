<template>
    <div>
        <navigation-bar />
        <router-view></router-view>
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
</style>
