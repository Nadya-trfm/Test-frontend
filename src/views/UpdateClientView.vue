<template>

  <div class="container-sm mt-5">
    <p>Update Client</p>
    <UpdateClient/>
  </div>
  <div class="container-sm mt-1">
    <GetCarsByOwner/>
  </div>
</template>

<script setup>
import UpdateClient from "../components/UpdateClient.vue";
import GetCarsByOwner from "../components/GetCarsByOwner.vue";

</script>

<style scoped>

</style>