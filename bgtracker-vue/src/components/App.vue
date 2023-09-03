<template>
    <div>
        <navigation-bar />
        <div v-if="loading">Loading....</div>
        <div v-if="!loading && !error">Welcome</div>
        <div v-if="!loading && error">Something wrong</div>
    </div>
</template>

<script>
import NavigationBar from "./layout/NavigationBar";
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

<style></style>
