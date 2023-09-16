<template>
    <div>
        <div class="user-page" v-if="user.username">
            <div class="user-page__content">
                <div class="user-page__information uinfo">
                    <div class="uinfo__item">Name: {{ user.username }}</div>
                    <div class="uinfo__item">Email: {{ user.email }}</div>
                    <div class="uinfo__item">
                        Registred: {{ user.registration }}
                    </div>
                </div>
                <div class="user-page__avatar"></div>
                <div class="user-page__statistics ustat">
                    <div class="ustat__item">
                        Count of posts: {{ user.postsCount }}
                    </div>
                    <div class="ustat__item">
                        Count of comments: {{ user.commentsCount }}
                    </div>
                    <div class="ustat__item">
                        Count of likes: {{ user.likesCount }}
                    </div>
                    <div class="ustat__item">
                        Count of todos: {{ user.todosCount }}
                    </div>
                </div>
            </div>
        </div>
        <div v-else>Please LogIn</div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
    methods: {
        ...mapActions("user", {
            getInfoAboutUser: "getInfoAboutUser",
        }),
    },
    computed: {
        ...mapState("user", {
            user: (state) => state.user,
        }),
    },
    mounted() {
        this.getInfoAboutUser();
    },
};
</script>

<style lang="scss">
.user-page {
    display: flex;
    justify-content: center;
    text-align: center;
    &__content {
        font-size: 20px;
    }
    &__avatar {
        width: 300px;
        height: 300px;
        border-radius: 50%;
        border: 1px solid black;
        margin: 0 auto;
    }
    &__information,
    &__statistics {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
    &__information {
        margin-top: 20px;
        margin-bottom: 15px;
    }
    &__statistics {
        margin-top: 20px;
    }
}
.uinfo {
    &__item {
    }
}
.ustat {
    &__item {
    }
}
</style>
