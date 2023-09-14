<template>
    <div>
        <form @submit.prevent="sendNewPost">
            <input
                type="text"
                placeholder="title"
                v-model="post.title"
                required
            />
            <input
                type="text"
                placeholder="body"
                v-model="post.body"
                required
            />
            <button type="submit">create</button>
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

<style></style>
