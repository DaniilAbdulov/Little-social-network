<template>
    <div>
        <div class="posts">
            <div class="posts__container">
                <div
                    class="post"
                    v-for="post in sortedAndSearchedPosts"
                    :key="post.id"
                >
                    <div class="post__author">@{{ post.user.username }}</div>
                    <div class="post__title">{{ post.title }}</div>
                    <div class="post__body">{{ post.body }}</div>
                    <div class="post__time">{{ post.created_at }}</div>
                    <div class="post__like">
                        <button @click="toggleLike(post)">Like</button>
                        <p>{{ post.likes_count }}</p>
                    </div>
                    <div class="post__comments">
                        <button>
                            <router-link
                                :to="{
                                    path: `/post/${post.id}/comments`,
                                    query: {
                                        title: post.title,
                                        body: post.body,
                                    },
                                }"
                                >Comments</router-link
                            >
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
        selectedSort: {
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
    },
    computed: {
        ...mapState("posts", {
            posts: (state) => state.posts,
            postsCount: (state) => state.postsCount,
            postPage: (state) => state.postPage,
            errorMessage: (state) => state.errorMessage,
        }),
        sortedAndSearchedPosts() {
            return this.sortedPosts.filter(
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
        sortedPosts() {
            return [
                ...this.posts.sort((a, b) => {
                    if (
                        this.selectedSort === "title" ||
                        this.selectedSort === "body"
                    ) {
                        return a[this.selectedSort].localeCompare(
                            b[this.selectedSort]
                        );
                    } else if (this.selectedSort === "indexOfPopular") {
                        return b[this.selectedSort] - a[this.selectedSort];
                    } else if (this.selectedSort === "created_at") {
                        return b[this.selectedSort].localeCompare(
                            a[this.selectedSort]
                        );
                    }
                    return 0; // Если выбрана некорректная сортировка, вернуть 0 (без сортировки).
                }),
            ];
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
