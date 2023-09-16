<template>
    <select :value="modelValue" @change="changeOptions" class="select">
        <option disabled value="">Сортировать</option>
        <option
            v-for="option in options"
            :key="option.value"
            :value="option.value"
        >
            {{ option.name }}
        </option>
    </select>
</template>

<script>
export default {
    name: "my-select",
    props: {
        modelValue: {
            type: [String, Number],
        },
        options: {
            type: Array,
            default: () => [],
        },
    },
    methods: {
        changeOptions(event) {
            this.$emit("update:modelValue", event.target.value);
        },
    },
};
</script>
<style lang="scss">
.select {
    border: 1px solid black;
    border-radius: 5px;
}
.select option {
}
</style>
