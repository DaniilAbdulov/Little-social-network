<template>
    <div>
        <div class="content" v-if="userIsAuthenticated"></div>
        <div v-if="!userIsAuthenticated || !adminIsAuthenticated">
            Please login to create posts.
        </div>
        <button @click="showDialog">Create post</button>
        <my-dialog v-model:show="dialogVisible">
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
        </my-dialog>
        <div>
            <div class="search">
                <input
                    type="text"
                    name="search"
                    placeholder="search"
                    v-model="searchQuery"
                />
            </div>
        </div>
        <my-select v-model="selectedSort" :options="sortOptions" />
        <posts-list
            :selectedSort="selectedSort"
            :searchQuery="searchQuery"
        ></posts-list>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import PostsList from "@/components/PostsList.vue";

export default {
    components: {
        PostsList,
    },
    data() {
        return {
            post: {
                title: "",
                body: "",
            },
            searchQuery: "",
            selectedSort: "",
            sortOptions: [
                { value: "title", name: "По названию" },
                { value: "body", name: "По содержимому" },
                { value: "indexOfPopular", name: "По популярности" },
                { value: "created_at", name: "По дате" },
            ],
            dialogVisible: false,
        };
    },
    methods: {
        async sendNewPost() {
            try {
                await this.createPostInDB(this.post);
                this.post.title = "";
                this.post.body = "";
                this.dialogVisible = false;
            } catch (error) {
                console.log(error);
            }
        },
        ...mapActions("posts", {
            createPostInDB: "createPostInDB",
            getPosts: "getPosts",
        }),
        showDialog() {
            this.dialogVisible = true;
        },
    },
    computed: {
        ...mapGetters("lognsig", {
            adminIsAuthenticated: "adminIsAuthenticated",
            userIsAuthenticated: "userIsAuthenticated",
        }),
    },
    mounted() {
        this.getPosts();
    },
};
</script>

<style></style>
