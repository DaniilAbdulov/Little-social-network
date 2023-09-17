import { createStore } from "vuex";
import { LogSignModule } from "@/store/LogSignModule";
import { PostsModule } from "@/store/PostsModule";
import { CommentsModule } from "@/store/CommentsModule";
import { TodosModule } from "@/store/TodosModule";
import { LikesModule } from "@/store/LikesModule";
import { UserModule } from "@/store/UserModule";
import { LightDarkThemeModule } from "@/store/LightDarkThemeModule";
export default createStore({
    modules: {
        lognsig: LogSignModule,
        posts: PostsModule,
        comments: CommentsModule,
        todos: TodosModule,
        likes: LikesModule,
        user: UserModule,
        theme: LightDarkThemeModule,
    },
});
