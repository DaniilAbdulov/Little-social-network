<template>
    <div>
        <div class="content" v-if="userIsAuthenticated"></div>
        <div
            class="create-search-sort"
            :class="{ 'create-search-sort-active': isDarkTheme }"
        >
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
                    <div
                        class="search"
                        :class="{ 'search-active': isDarkTheme }"
                    >
                        <input
                            class="search__input"
                            type="text"
                            name="search"
                            placeholder="search"
                            v-model="searchQuery"
                            :style="{ color: isDarkTheme ? 'white' : 'black' }"
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
import { mapGetters, mapActions, mapState } from "vuex";
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
        ...mapState("theme", {
            isDarkTheme: (state) => state.isDarkTheme,
        }),
    },
    mounted() {
        this.getPosts();
    },
};
</script>

<style lang="scss">
.create-search-sort {
    min-width: 100%;
    position: sticky;
    padding: 15px 0px;
    top: 0px;
    background: white;
    display: flex;
    gap: 10px;
    align-items: center;
    &-active {
        background: black;
    }
    &__create {
    }
    &__search {
        flex: 1 1 auto;
        border: 1px solid;
        padding: 0px 5px;
        border-radius: 5px;
        & input {
            background: transparent;
        }
    }

    &__sort {
    }
}
</style>
