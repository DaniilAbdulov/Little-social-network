<template>
    <div>
        <navigation-bar />
        <router-view></router-view>
    </div>
</template>

<script>
import NavigationBar from "./components/UI/NavigationBar.vue";
import { mapActions } from "vuex";
export default {
    components: {
        NavigationBar,
    },
    name: "App",
    data() {
        return {
            loading: true,
            error: false,
        };
    },
    methods: {
        ...mapActions(["initialLoad"]),
    },
    async mounted() {
        try {
            await this.initialLoad();
            this.loading = false;
        } catch (error) {
            this.loading = false;
            this.error = true;
        }
    },
};
</script>

<style>
* {
    margin: 0;
    padding: 0;
}
</style>
