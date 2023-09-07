<template>
    <div class="post-id-page">
        <div>
            <div>{{ postId }}</div>
            <div class="post__title">{{ postTitle }}</div>
            <div class="post__body">{{ postBody }}</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            postId: this.$route.params.id,
            postTitle: this.$route.query.title,
            postBody: this.$route.query.body,
        };
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
