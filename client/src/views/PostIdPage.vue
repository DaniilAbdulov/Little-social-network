<template>
    <div class="post-id-page">
        <router-link to="/posts"><back-button></back-button></router-link>
        <div class="post">
            <div class="post__title">{{ postTitle }}</div>
            <div class="post__body">{{ postBody }}</div>
        </div>
        <div
            class="comment-form"
            :class="{ 'comment-form-active': isDarkTheme }"
        >
            <form @submit.prevent="createComment">
                <input
                    type="text"
                    v-model="comment.body"
                    placeholder="Введите комментарий..."
                    required
                />
                <button type="submit">create comment</button>
            </form>
        </div>
        <comments-list :post-id="postId"></comments-list>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import CommentsList from "../components/CommentsList.vue";
export default {
    components: { CommentsList },
    data() {
        return {
            comment: {
                body: "",
                post_id: "",
            },
            postId: this.$route.params.id,
            postTitle: this.$route.query.title,
            postBody: this.$route.query.body,
        };
    },
    computed: {
        ...mapState("theme", {
            isDarkTheme: (state) => state.isDarkTheme,
        }),
    },
    methods: {
        async createComment() {
            try {
                await this.createCommentInDB(this.comment);
                this.comment.body = "";
            } catch (error) {
                console.log(error);
            }
        },
        ...mapActions("comments", {
            createCommentInDB: "createCommentInDB",
        }),
    },
    mounted() {
        this.comment.post_id = this.postId;
    },
};
</script>
<style scoped>
.post-id-page {
    max-width: none;
    width: 100%;
}

.comment-form {
    margin-bottom: 20px;
}
.comment-form button {
    border: 1px solid black;
    padding: 1px 3px;
}
.comment-form-active button {
    border: 1px solid white;
    color: white;
}
.comment-form input {
    border: 1px solid black;
    margin-right: 10px;
    padding: 1px 5px;
}
.empty-list {
    margin-top: 20px;
    position: relative;
    top: 0;
    left: 0;
    transform: translate(-0%, -0%);
}
.comment__data {
    display: flex;
    gap: 10px;
}
</style>
