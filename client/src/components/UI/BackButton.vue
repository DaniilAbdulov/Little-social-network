<template>
    <div class="social-button">
        <button>
            <div class="social-button__logo">
                <img v-if="!isDarkTheme" src="@/assets/back.svg" />
                <img v-if="isDarkTheme" src="@/assets/back-white.png" />
            </div>
        </button>
        <slot></slot>
    </div>
</template>
<script>
import { mapState } from "vuex";
export default {
    name: "back-button",
    computed: {
        ...mapState("theme", {
            isDarkTheme: (state) => state.isDarkTheme,
        }),
    },
};
</script>

<style>
.social-button {
    display: flex;
    align-items: center;
    gap: 5px;
}
.social-button__logo {
    background: transparent;
    width: 20px;
}
.social-button__logo img {
    object-fit: cover;
    width: 100%;
}
</style>
