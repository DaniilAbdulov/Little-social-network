<template>
    <div>
        <navigation-bar />
        <router-view></router-view>
    </div>
</template>

<script>
import NavigationBar from "./components/UI/NavigationBar.vue";
export default {
    components: {
        NavigationBar,
    },
    name: "App",
};
</script>

<style>
* {
    margin: 0;
    padding: 0;
}
</style>
