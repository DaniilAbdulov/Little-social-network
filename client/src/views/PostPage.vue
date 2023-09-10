<template>
    <div>
        <div class="content" v-if="userIsAuthenticated"></div>
        <div v-if="!userIsAuthenticated || !adminIsAuthenticated">
            Please login to create posts.
        </div>
        <div v-else>
            <form @submit.prevent="sendNewPost">
                <input
                    type="text"
                    placeholder="title"
                    v-model="post.title"
                    required
                />
                <input
                    type="text"
                    placeholder="body"
                    v-model="post.body"
                    required
                />
                <button type="submit">create</button>
            </form>
        </div>
        <div>
            <div class="search">
                <input
                    type="text"
                    name="search"
                    placeholder="search"
                    v-model="searchQuery"
                />
            </div>
        </div>
        <posts-list :searchQuery="searchQuery"></posts-list>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import PostsList from "@/components/PostsList.vue";

export default {
    components: {
        PostsList,
    },
    data() {
        return {
            post: {
                title: "",
                body: "",
            },
            searchQuery: "",
        };
    },
    methods: {
        async sendNewPost() {
            try {
                await this.createPostInDB(this.post);
                this.post.title = "";
                this.post.body = "";
            } catch (error) {
                console.log(error);
            }
        },
        ...mapActions("posts", {
            createPostInDB: "createPostInDB",
        }),
    },
    computed: {
        ...mapGetters("lognsig", {
            adminIsAuthenticated: "adminIsAuthenticated",
            userIsAuthenticated: "userIsAuthenticated",
        }),
    },
};
</script>

<style></style>
