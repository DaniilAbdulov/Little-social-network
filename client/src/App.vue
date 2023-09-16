<template>
    <div class="app">
        <navigation-bar />
        <div class="container">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import NavigationBar from "./components/NavigationBar.vue";
export default {
    components: {
        NavigationBar,
    },
    name: "App",
    created() {
        this.$store.dispatch("lognsig/initialLoad");
    },
};
</script>

<style>
* {
    padding: 0;
    margin: 0;
    border: 0;
}
*,
*:before,
*:after {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
:focus,
:active {
    outline: none;
}
a:focus,
a:active {
    outline: none;
}
nav,
footer,
header,
aside {
    display: block;
}
html,
body {
    height: 100%;
    width: 100%;
    font-size: 100%;
    line-height: 1;
    font-size: 14px;
    -ms-text-size-adjust: 100%;
    -moz-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    /* background-color: rgb(46, 45, 45);
    color: white; */
    background-color: rgb(255, 255, 255);
    color: rgb(0, 0, 0);
    font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
}
input,
button,
textarea {
    font-family: inherit;
}
input::-ms-clear {
    display: none;
}
button {
    cursor: pointer;
    background: transparent;
}
button::-moz-focus-inner {
    padding: 0;
    border: 0;
}
a,
a:visited {
    text-decoration: none;
}
a:hover {
    text-decoration: none;
}
ul li {
    list-style: none;
}
img {
    vertical-align: top;
}
h1,
h2,
h3,
h4,
h5,
h6 {
    font-size: inherit;
    font-weight: inherit;
}
.container {
    max-width: 90%;
    margin: 0 auto;
}
.list-enter-active,
.list-leave-active {
    transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>
