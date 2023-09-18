<template>
    <div>
        <div class="posts" :class="{ posts__hidden: showErrorOrNot }">
            <TransitionGroup
                name="list"
                tag="ul"
                v-if="sortedAndSearchedPosts.length"
            >
                <li
                    class="post"
                    v-for="post in sortedAndSearchedPosts"
                    :key="post.id"
                >
                    <div class="post__author">@{{ post.user.username }}</div>
                    <div class="post__title">{{ post.title }}</div>
                    <div class="post__body">
                        {{ post.body }}
                    </div>
                    <div v-if="post.body_length > lengthOfVisibleChars">
                        <div class="post__continue">
                            <router-link
                                :to="{
                                    path: `/post/${post.id}/comments`,
                                    query: {
                                        title: post.title,
                                        body: post.body,
                                    },
                                }"
                                >...see more</router-link
                            >
                        </div>
                    </div>
                    <div class="post__time">{{ post.time }}</div>
                    <div class="post__buttons">
                        <div class="post__like">
                            <like-button
                                @click="toggleLike(post)"
                            ></like-button>
                            <p>{{ post.likes_count }}</p>
                        </div>
                        <div class="post__comments">
                            <router-link
                                :to="{
                                    path: `/post/${post.id}/comments`,
                                    query: {
                                        title: post.title,
                                        body: post.body,
                                    },
                                }"
                                ><comment-button></comment-button
                            ></router-link>

                            <p>{{ post.comment_count }}</p>
                        </div>
                        <div class="post__delete">
                            <trash-button @click="deletePostHandler(post)">
                            </trash-button>
                        </div>
                    </div>
                </li>
            </TransitionGroup>
            <div v-else>No results</div>
        </div>
        <div v-if="showErrorOrNot" class="error-message">
            {{ this.postErrorMessage }}
        </div>
        <div
            v-intersection="getMorePosts"
            v-if="posts.length !== 0"
            class="observer"
        ></div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import CommentButton from "./UI/CommentButton.vue";
import LikeButton from "./UI/LikeButton.vue";

export default {
    components: { LikeButton, CommentButton },
    data() {
        return {
            lengthOfVisibleChars: 0,
            showErrorOrNot: false,
        };
    },
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
        deletePostHandler(post) {
            if (!this.postErrorMessage) {
                this.deletePost(post);
            } else {
                this.showError();
            }
        },
        showError() {
            this.showErrorOrNot = true;
            setTimeout(() => {
                this.showErrorOrNot = false;
                this.$store.commit("posts/SET_ERROR_MESSAGE", "");
            }, 2000);
        },
        async toggleLike(post) {
            await this.toggleLikeOnPost(post);
        },
        ...mapActions("posts", ["getPosts", "deletePost", "getMorePosts"]),
        ...mapActions("likes", ["toggleLikeOnPost"]),
        updateLengthOfVisibleChars() {
            const windowWidth = window.innerWidth;
            this.lengthOfVisibleChars = 0.9 * windowWidth;
        },
    },
    computed: {
        ...mapState("posts", {
            posts: (state) => state.posts,
            postsCount: (state) => state.postsCount,
            postPage: (state) => state.postPage,
            postErrorMessage: (state) => state.postErrorMessage,
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
                    if (this.selectedSort === "title") {
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
        this.updateLengthOfVisibleChars();
        window.addEventListener("resize", this.updateLengthOfVisibleChars);
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.updateLengthOfVisibleChars);
    },
};
</script>

<style lang="scss">
.posts__hidden {
    opacity: 0.1;
    transition: all 0.5s ease-out;
}
.error-message {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    padding: 10px;
    border: 1px solid black;
    background: #ab4141;
    border-radius: 10px;
    color: white;
    box-shadow: 0px 0px 2px 0px white;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    transition: all 0.5s ease-in;
    font-size: 18px;
}
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
.posts__container {
}
.post {
    border: 1px solid rgb(139, 139, 139);
    border-radius: 10px;
    padding: 15px;
    margin-bottom: 10px;
    margin-top: 10px;
    &__author {
        margin-bottom: 10px;
    }
    &__title {
        font-size: 32px;
        font-weight: bold;
        margin-bottom: 15px;
        text-decoration: underline;
    }
    &__body {
        font-size: 24px;
        line-height: 24px;
        letter-spacing: 1px;
        max-height: 242px;
        overflow: hidden;
        margin-bottom: 10px;
    }
    &__continue {
        font-size: 22px;
        margin-bottom: 10px;
    }
    &__time {
        font-style: italic;
        letter-spacing: 1px;
        margin-bottom: 10px;
    }
    &__buttons {
        display: flex;
        align-items: center;
    }
    &__comments,
    &__like {
        display: flex;
        gap: 5px;
        align-items: center;
    }
    &__like {
        margin-right: 5px;
    }
    &__comments {
        flex: 1 1 auto;
    }
}
.observer {
    height: 30px;
}
</style>
