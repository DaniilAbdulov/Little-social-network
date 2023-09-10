import { createStore } from "vuex";
import { LogSignModule } from "@/store/LogSignModule";
import { PostsModule } from "@/store/PostsModule";
import { CommentsModule } from "@/store/CommentsModule";
import { TodosModule } from "@/store/TodosModule";
import { LikesModule } from "@/store/LikesModule";
export default createStore({
    modules: {
        lognsig: LogSignModule,
        posts: PostsModule,
        comments: CommentsModule,
        todos: TodosModule,
        likes: LikesModule,
    },
});
