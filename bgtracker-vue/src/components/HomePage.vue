<template>
    <div>
        <div class="content" v-if="userIsAuthenticated">
            <h1>Hello</h1>
            <h2>It's my auth page</h2>
            <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Perspiciatis id at laboriosam, ipsa voluptatum in commodi eum
                reiciendis hic rerum beatae vel nemo, quos quis! Possimus
                provident vitae natus ipsum.
            </p>
        </div>
        <div v-if="!userIsAuthenticated">Please login to view the content.</div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    computed: {
        ...mapGetters("lognsig", {
            adminIsAuthenticated: "adminIsAuthenticated",
            userIsAuthenticated: "userIsAuthenticated",
        }),
    },
};
</script>

<style></style>
