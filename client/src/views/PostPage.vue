<template>
    <div>
        <div class="content" v-if="userIsAuthenticated"></div>
        <div v-if="!userIsAuthenticated || !adminIsAuthenticated">
            Please login to create posts.
        </div>
        <button @click="showDialog" v-else>Create post</button>
        <my-dialog v-model:show="postFormVisible">
            <post-form
                :post="post"
                @update:postFormVisible="postFormVisible = $event"
            ></post-form>
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
import PostForm from "@/components/PostForm.vue";

export default {
    components: {
        PostsList,
        PostForm,
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
                { value: "indexOfPopular", name: "По популярности" },
                { value: "created_at", name: "По дате" },
            ],
            postFormVisible: false,
        };
    },
    methods: {
        ...mapActions("posts", {
            getPosts: "getPosts",
        }),
        showDialog() {
            this.postFormVisible = true;
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
