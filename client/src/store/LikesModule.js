import axios from "axios";
export const LikesModule = {
    state: () => ({}),
    getters: {},
    mutations: {},
    actions: {
        async toggleLikeOnPost({ dispatch }, post) {
            try {
                const response = await axios.post("/api/likes/toggle", {
                    post_id: post.id,
                });

                if (response.data.message === "Like added") {
                    post.likes_count++;
                    post.user_liked = true;
                } else if (response.data.message === "Like removed") {
                    post.likes_count--;
                    post.user_liked = false;
                }

                // await dispatch("posts/getPosts", null, { root: true });
            } catch (error) {
                console.log(error);
            }
        },
    },
    namespaced: true,
};
