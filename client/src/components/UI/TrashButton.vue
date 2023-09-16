<template>
    <div class="social-button">
        <button>
            <div class="social-button__logo">
                <img src="@/assets/trash.svg" />
            </div>
        </button>
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: "trash-button",
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
