<template>
    <div>
        <div class="posts">
            <div class="posts__container">
                <div class="post" v-for="post in posts" :key="post.id">
                    <div class="post__author">@{{ post.user.username }}</div>
                    <div class="post__title">{{ post.title }}</div>
                    <div class="post__body">{{ post.body }}</div>
                    <div class="post__time">{{ post.created_at }}</div>
                    <div class="post__comments">
                        <button @click="showPostComments(post)">
                            Comments
                        </button>
                    </div>
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
        showPostComments(post) {
            this.$router.push({
                path: `/post/${post.id}/comments`,
                query: { title: post.title, body: post.body },
            });
        },
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

<style lang="scss">
.posts {
}
.posts__container {
}
.post {
    border: 1px solid black;
    padding: 15px;
    margin-bottom: 10px;
    margin-top: 10px;
    &__author {
    }
    &__title {
        font-size: 32px;
        font-weight: bold;
    }
    &__body {
        font-size: 24px;
    }
    &__time {
        font-style: italic;
    }
}
</style>
