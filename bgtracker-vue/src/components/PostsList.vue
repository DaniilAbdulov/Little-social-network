<template>
    <div>
        <div class="posts">
            <div class="posts__container">
                <div class="post" v-for="post in posts" :key="post.id">
                    <div class="post__title">{{ post.title }}</div>
                    <div class="post__body">{{ post.body }}</div>
                    <div class="post__time">{{ post.created_at }}</div>
                    <div class="post__author">{{ post.user.username }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
    methods: {
        ...mapActions("posts", {
            getAllPosts: "getAllPosts",
        }),
    },
    computed: {
        ...mapState("posts", {
            posts: (state) => state.posts,
        }),
    },
    mounted() {
        this.getAllPosts();
    },
};
</script>

<style></style>
