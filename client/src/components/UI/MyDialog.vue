<template>
    <div class="dialog" v-if="show" @click.stop="hideDialog">
        <div
            @click.stop
            class="dialog__content"
            :class="{ 'dialog__content-active': isDarkTheme }"
        >
            <slot></slot>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
export default {
    name: "my-dialog",
    props: {
        show: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        hideDialog() {
            this.$emit("update:show", false);
        },
    },
    computed: {
        ...mapState("theme", {
            isDarkTheme: (state) => state.isDarkTheme,
        }),
    },
};
</script>

<style>
.dialog {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    position: fixed;
    display: flex;
    background: rgba(0, 0, 0, 0.5);
}
.dialog__content {
    margin: auto;
    background: white;
    border-radius: 12px;
    min-height: 50px;
    min-width: 380px;
    padding: 20px;
}
.dialog__content-active {
    background: rgb(51, 50, 50);
}
</style>
