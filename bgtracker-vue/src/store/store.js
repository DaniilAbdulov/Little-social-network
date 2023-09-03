import { createStore } from "vuex";
import { LogSignModule } from "@/store/LogSignModule";
export default createStore({
    modules: {
        lognsig: LogSignModule,
    },
});
