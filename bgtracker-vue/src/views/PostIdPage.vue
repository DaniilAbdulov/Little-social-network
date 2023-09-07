<template>
    <div class="post-id-page">
        <div>
            <div>{{ postId }}</div>
            <div class="post__title">{{ postTitle }}</div>
            <div class="post__body">{{ postBody }}</div>
        </div>
        <div>
            <form @submit.prevent="createComment">
                <input
                    type="text"
                    v-model="comment.body"
                    placeholder="comment"
                />
                <button type="submit">create</button>
            </form>
        </div>
        <div>
            <div class="comments" v-for="com in comments" :key="com.id">
                {{ com }}
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
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
            getAllcomments: "getAllcomments",
        }),
    },
    computed: {
        ...mapState("comments", {
            comments: (state) => state.comments,
        }),
    },
    mounted() {
        this.getAllcomments();
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
</style>
