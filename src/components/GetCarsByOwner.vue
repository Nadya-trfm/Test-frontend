<template>
  <table class="table table-hover">
    <thead>
    <tr>
      <th scope="col">Марка</th>
      <th scope="col">Модель</th>
      <th scope="col">Цвет кузова</th>
      <th scope="col">Гос Номер РФ</th>
      <th scope="col">Автомобиль на парковке</th>
      <th scope="col">
        <button type="button" class="btn btn-warning" disabled>✎</button>
      </th>
      <th scope="col">
        <button type="button" class="btn btn-danger" disabled>X</button>
      </th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="car in cars"
        :key="car.id">
      <td>{{ car.brand}}</td>

      <td>{{ car.model }}</td>
      <td>{{car.body_color}}</td>
      <td>{{car.plate_number}}</td>
      <td>{{car.is_parked ? 'да':'нет'}}</td>
      <th scope="col">
        <button type="button" class="btn btn-warning">✎</button>
      </th>
      <th scope="col">
        <button type="button" class="btn btn-danger">X</button>
      </th>
    </tr>

    </tbody>
  </table>
  <button type="button" class="btn btn-success m-1" >+</button>
</template>

<script setup>
import {onMounted, ref} from "vue";
import axios from "axios";
import router from "../router";

const cars = ref([]);
const total = ref(null);
const ownerId =ref(router.currentRoute.value.params.id);

onMounted(async () => {
  await loadCarsByOwner();
});

async function loadCarsByOwner() {
  await axios.get(`http://127.0.0.1:8000/api/cars/getAllByOwner/${ownerId.value}`).then(res => {
    cars.value = res.data;
    total.value = res.data.length;
  }).catch(function (e) {
    if (e.response) {
      alert(e.response.data.message);
    }
  })
}
</script>

<style scoped>

</style>