<template>
    <div>
        <div class="content" v-if="userIsAuthenticated">
            <h1>Hello</h1>
        </div>
        <div v-if="!userIsAuthenticated">Please login to view the content.</div>
        <posts-list></posts-list>
        <div>
            <form @submit.prevent="sendNewPost">
                <input type="text" placeholder="title" v-model="post.title" />
                <input type="text" placeholder="body" v-model="post.body" />
                <button type="submit">create</button>
            </form>
        </div>
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
