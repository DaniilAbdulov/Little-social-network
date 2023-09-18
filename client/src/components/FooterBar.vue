<template>
    <footer class="footer">
        <div class="footer__content">
            <div class="footer__item">Light Theme</div>
            <div class="footer__item">
                <button
                    @click="changeThemeOfPage"
                    class="toggle-btn"
                    :class="{ 'toggle-btn-active': isDarkTheme }"
                >
                    <div
                        class="toggle-btn__circle"
                        :class="{ 'toggle-btn__circle-active': isDarkTheme }"
                    ></div>
                </button>
            </div>
            <div class="footer__item">Dark Theme</div>
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

<style lang="scss">
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
    display: flex;
    align-items: center;
    gap: 5px;
}
.footer__link {
}
.toggle-btn {
    width: 50px;
    height: 25px;
    border-radius: 50px;
    border: 1px solid black;
    position: relative;
    background: rgb(218, 218, 218);
    transition: all 0.3s ease-in;
    &-active {
        background: green;
    }
    &__circle {
        position: absolute;
        left: 0%;
        top: 0;
        width: 50%;
        height: 100%;
        border: 1px solid black;
        border-radius: 50%;
        background: white;
        transition: all 0.3s ease-in;
        &-active {
            left: 50%;
        }
    }
}
</style>
