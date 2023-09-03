<template>
    <div>
        <div v-if="loading">Loading....</div>
        <div class="content" v-if="!loading && isAuthenticated">
            <h1>Hello</h1>
            <h2>It's my auth page</h2>
            <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Perspiciatis id at laboriosam, ipsa voluptatum in commodi eum
                reiciendis hic rerum beatae vel nemo, quos quis! Possimus
                provident vitae natus ipsum.
            </p>
        </div>
        <div v-if="!loading && !isAuthenticated">
            Please login to view the content.
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
    data() {
        return {
            loading: true,
            error: false,
        };
    },
    computed: {
        ...mapGetters(["isAuthenticated"]),
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
