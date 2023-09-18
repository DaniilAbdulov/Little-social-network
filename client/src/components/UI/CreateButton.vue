<template>
    <div class="create-button" :class="{ 'create-button-active': isDarkTheme }">
        <button></button>
        <slot></slot>
    </div>
</template>
<script>
import { mapState } from "vuex";
export default {
    name: "create-button",
    computed: {
        ...mapState("theme", {
            isDarkTheme: (state) => state.isDarkTheme,
        }),
    },
};
</script>

<style lang="scss">
.create-button {
    border: 2px solid black;
    display: inline-block;
    padding: 1px 5px;
    background: none;
    transition: all 0.3s ease-out;
    &-active {
        border: 2px solid white;
    }
    cursor: pointer;
    &:hover {
        box-shadow: 0px 0px 1px 0px black;
    }
    &:active {
        border: 2px solid black;
    }
}
</style>
