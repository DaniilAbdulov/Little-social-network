<template>
    <div>
        <form @submit.prevent="sendNewPost" class="post-form">
            <input
                type="text"
                placeholder="title"
                v-model="post.title"
                required
                class="post-form__title"
            />
            <textarea
                type="text"
                placeholder="body"
                v-model="post.body"
                required
                class="post-form__body"
            />
            <button type="submit" class="post-form__create">create</button>
        </form>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
    props: {
        post: {
            type: Object,
            required: true,
        },
        postFormVisible: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        async sendNewPost() {
            try {
                await this.createPostInDB(this.post);
                this.post.title = "";
                this.post.body = "";
                this.$emit("update:postFormVisible", false);
            } catch (error) {
                console.log(error);
            }
        },
        ...mapActions("posts", {
            createPostInDB: "createPostInDB",
        }),
    },
};
</script>

<style lang="scss">
.post-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    &__title,
    &__body {
        padding: 10px;
        border: 1px solid black;
        border-radius: 10px;
    }
    &__body {
        min-height: 200px;
    }
    &__create {
        max-width: 100px;
        margin: 0 auto;
        border: 1px solid black;
        background: none;
        padding: 5px;
    }
}
</style>
