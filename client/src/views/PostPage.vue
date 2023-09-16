<template>
    <div>
        <div class="content" v-if="userIsAuthenticated"></div>
        <div class="create-search-sort">
            <div class="create-search-sort__create">
                <create-button @click="showDialog">Create post</create-button>
            </div>
            <my-dialog v-model:show="postFormVisible">
                <post-form
                    :post="post"
                    @update:postFormVisible="postFormVisible = $event"
                ></post-form>
            </my-dialog>
            <div class="create-search-sort__search">
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
            </div>
            <div class="create-search-sort__sort">
                <my-select v-model="selectedSort" :options="sortOptions" />
            </div>
        </div>
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
import CreateButton from "../components/UI/CreateButton.vue";

export default {
    components: {
        PostsList,
        PostForm,
    },
    data() {
        CreateButton;
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

<style lang="scss">
.create-search-sort {
    display: flex;
    gap: 10px;
    align-items: center;
    &__create {
    }
    &__search {
        flex: 1 1 auto;
        border: 1px solid;
        padding: 0px 5px;
        border-radius: 5px;
    }
    &__sort {
    }
}
</style>
