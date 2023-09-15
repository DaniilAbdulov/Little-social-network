<template>
    <div>
        <div v-if="isLoading">Loading comments...</div>
        <div v-else>
            <TransitionGroup name="list" tag="ul" v-if="comments.length > 0">
                <li class="comments" v-for="com in comments" :key="com.id">
                    <div class="comment">
                        <div class="comment__container">
                            <div class="comment__data">
                                <div class="comment__author">
                                    @{{ com.username }}
                                </div>
                                <div class="comment__time">
                                    {{ com.created_at }}
                                </div>
                            </div>
                            <div class="comment__body">
                                {{ com.body }}
                            </div>
                            <div
                                v-if="
                                    adminIsAuthenticated || userIsAuthenticated
                                "
                                class="comment__delete"
                            >
                                <button @click="deleteComment({ com, postId })">
                                    delete
                                </button>
                            </div>
                        </div>
                    </div>
                </li>
            </TransitionGroup>
            <div v-else>No comments</div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
    props: {
        postId: {
            type: String,
            required: true,
        },
    },
    computed: {
        ...mapState("comments", {
            comments: (state) => state.comments,
            isLoading: (state) => state.isLoading,
            errorMessage: (state) => state.errorMessage,
        }),
        ...mapGetters("lognsig", {
            adminIsAuthenticated: "adminIsAuthenticated",
            userIsAuthenticated: "userIsAuthenticated",
        }),
    },
    methods: {
        ...mapActions("comments", {
            getCommentsOfPost: "getCommentsOfPost",
            deleteComment: "deleteComment",
        }),
    },
    mounted() {
        this.getCommentsOfPost(this.postId);
    },
};
</script>
<style>
.comments {
    color: white;
}
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
