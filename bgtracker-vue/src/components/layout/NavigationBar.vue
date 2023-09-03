<template>
    <nav class="navbar navbar-expand-md bg-body-tertiary">
        <div class="container-md">
            <a class="navbar-brand" href="#">Navbar</a>
            <div v-if="isAuthenticated">
                <a class="navbar-brand" href="#">Home</a>
            </div>
        </div>
    </nav>
</template>

<script>
import { mapGetters } from "vuex";
export default {
    name: "NavigationBar",
    computed: {
        ...mapGetters(["isAuthenticated"]),
    },
};
</script>

<style></style>
