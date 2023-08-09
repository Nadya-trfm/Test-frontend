<template>
  <div class="container-sm mt-5">
    <GetCarsByOwner/>
    <RouterLink :to="{path:'/'}"  type="button" class="btn  btn-info" >Перейти на главную</RouterLink>
  </div>

</template>

<script setup>

import GetCarsByOwner from "../components/GetCarsByOwner.vue";
</script>

<style scoped>

</style>