<template>
    <div>
        <div class="posts">
            <div class="posts__container">
                <div class="post" v-for="post in searchPosts" :key="post.id">
                    <div class="post__author">@{{ post.user.username }}</div>
                    <div class="post__title">{{ post.title }}</div>
                    <div class="post__body">{{ post.body }}</div>
                    <div class="post__time">{{ post.created_at }}</div>
                    <div class="post__like">
                        <button @click="toggleLike(post)">Like</button>
                        <p>{{ post.likes_count }}</p>
                    </div>
                    <div class="post__comments">
                        <button @click="showPostComments(post)">
                            Comments
                        </button>
                        <p>{{ post.comment_count }}</p>
                    </div>
                    <div class="post__delete">
                        <button @click="deletePost(post)">Delete</button>
                    </div>
                </div>
            </div>
        </div>
        <div
            v-intersection="getMorePosts"
            class="observer"
            v-if="postsCount >= postPage"
        ></div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
    props: {
        searchQuery: {
            type: String,
            required: true,
        },
    },
    methods: {
        async toggleLike(post) {
            await this.toggleLikeOnPost(post);
        },
        ...mapActions("posts", ["getPosts", "deletePost", "getMorePosts"]),
        ...mapActions("likes", ["toggleLikeOnPost"]),
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
            postsCount: (state) => state.postsCount,
            postPage: (state) => state.postPage,
            errorMessage: (state) => state.errorMessage,
        }),
        searchPosts() {
            return this.posts.filter(
                (post) =>
                    post.title
                        .toLowerCase()
                        .includes(this.searchQuery.toLowerCase()) ||
                    post.body
                        .toLowerCase()
                        .includes(this.searchQuery.toLowerCase()) ||
                    post.user.username
                        .toLowerCase()
                        .includes(this.searchQuery.toLowerCase())
            );
        },
    },
    mounted() {
        this.getPosts();
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
    &__comments,
    &__like {
        display: flex;
        gap: 5px;
    }
}
.observer {
    height: 30px;
    border: 1px solid black;
}
</style>
