<template>
    <div class="dialog" v-if="show" @click.stop="hideDialog">
        <!--если show true, то диалоговое окно будет видно
        для того что бы скрыть модальное окно вешаем слушатель click, который вызывает hideDialog-->
        <div @click.stop class="dialog__content">
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: "my-dialog",
    props: {
        show: {
            type: Boolean,
            default: false,
        },
    },
    //передаем в Props объект show, который явлется логическим значением. По-умолчанию false
    methods: {
        hideDialog() {
            this.$emit("update:show", false);
        },
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
</style>
