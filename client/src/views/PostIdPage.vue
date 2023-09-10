<template>
    <div class="post-id-page">
        <router-link to="/posts">Back</router-link>
        <div>
            <div class="post__title">{{ postTitle }}</div>
            <div class="post__body">{{ postBody }}</div>
        </div>
        <div>
            <form @submit.prevent="createComment">
                <input
                    type="text"
                    v-model="comment.body"
                    placeholder="comment"
                    required
                />
                <button type="submit">create</button>
            </form>
        </div>
        <comments-list :post-id="postId"></comments-list>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import CommentsList from "../components/CommentsList.vue";
export default {
    components: { CommentsList },
    data() {
        return {
            comment: {
                body: "",
                post_id: this.$route.params.id,
            },
            postId: this.$route.params.id,
            postTitle: this.$route.query.title,
            postBody: this.$route.query.body,
        };
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
};
</script>
<style scoped>
.post-id-page {
}
@media (max-width: 500px) {
    .post-id-page {
        margin-top: 80px;
    }
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
