<template>
  <table class="table table-hover">
  <thead>
  <tr>
    <th scope="col">Марка</th>
    <th scope="col">Модель</th>
    <th scope="col">Цвет кузова</th>
    <th scope="col">Гос Номер РФ</th>
    <th scope="col">Автомобиль на парковке</th>

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

  </tr>

  </tbody>
  </table>
  <nav aria-label="Search results pages">
    <ul class="pagination" >
      <li class="page-item" @click="page-=1" :class="{disabled: page<=1}"><a class="page-link" href="#">Предыдущая</a></li>

      <li class="page-item" :class="{active: p===page}" v-for="p in numberOfPages"  @click="page=p"><a class="page-link" href="#" >{{p}}</a></li>

      <li class="page-item" @click="page+=1" :class="{disabled: page>=numberOfPages}"><a class="page-link" href="#">Следующая</a></li>
    </ul>
  </nav>
</template>

<script setup>
import {computed, onMounted, ref, watch} from "vue";
import axios from "axios";

const cars = ref([]);
const total = ref(null);

const page = ref(1);
const perPage = ref(4);

onMounted(async () => {
  await loadCars();
});

async function loadCars() {
  if(page.value<1 || page.value>numberOfPages.value){
    return;
  }

  await axios.get(`http://127.0.0.1:8000/api/cars/getAllIsParked?page=${page.value}`).then(res => {
    console.log(res);
    cars.value = res.data.data;
    total.value = res.data.total;
  })
}


const numberOfPages = computed(() => {
  if (!total.value) return 1;
  return Math.ceil(total?.value / perPage.value);
})

watch([page], loadCars);
</script>

<style scoped>

</style>