import { createStore } from "vuex";
import { LogSignModule } from "@/store/LogSignModule";
import { PostsModule } from "@/store/PostsModule";
export default createStore({
    modules: {
        lognsig: LogSignModule,
        posts: PostsModule,
    },
});
