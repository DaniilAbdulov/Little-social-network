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
        <div class="posts">
            <div class="posts__container">
                <div class="post" v-for="post in posts" :key="post.id">
                    <div class="post__title">{{ post.title }}</div>
                    <div class="post__body">{{ post.body }}</div>
                </div>
            </div>
        </div>
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
import { mapGetters, mapActions, mapState } from "vuex";
export default {
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
            getAllPosts: "getAllPosts",
        }),
    },
    computed: {
        ...mapState("posts", {
            posts: (state) => state.posts,
        }),
        ...mapGetters("lognsig", {
            adminIsAuthenticated: "adminIsAuthenticated",
            userIsAuthenticated: "userIsAuthenticated",
        }),
    },
    mounted() {
        this.getAllPosts();
    },
};
</script>

<style></style>
