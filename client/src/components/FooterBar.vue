<template>
    <footer class="footer">
        <div class="footer__content">
            <button @click="changeThemeOfPage">Theme</button>
            <div>{{ isDarkTheme }}</div>
        </div>
    </footer>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
    computed: {
        ...mapState("theme", {
            isDarkTheme: (state) => state.isDarkTheme,
        }),
    },
    methods: {
        ...mapActions("theme", {
            changeThemeOfPage: "changeThemeOfPage",
        }),
    },
};
</script>

<style>
.footer {
    width: 100%;
    display: flex;
    gap: 20px;
    background: #acabaa;
    height: 40px;
    align-items: center;
    padding: 10px;
    justify-content: space-between;
}
.footer__content {
}
.footer__link {
}
</style>
