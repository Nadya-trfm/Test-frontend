<template>
  <table class="table table-hover">
    <thead>
    <tr>
      <th scope="col">ФИО</th>
      <th scope="col">Авто</th>
      <th scope="col">Номер</th>
      <th scope="col">
        <button type="button" class="btn btn-warning" disabled>✎</button>
      </th>
      <th scope="col">
        <button type="button" class="btn btn-danger" disabled>X</button>
      </th>
    </tr>
    </thead>



    <tbody>
    <tr v-for="client in clients"
        :key="client.id">
      <td>{{ client.full_name }}</td>

      <td>{{ client.brand + ' ' + client.model + ' color:' + client.body_color }}</td>
      <td>{{ client.plate_number }}</td>

      <th scope="col">
        <button type="button" class="btn btn-warning">✎</button>
      </th>
      <th scope="col">
        <button type="button" class="btn btn-danger" @click="deleteClient(client.id)">X</button>
      </th>
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
  <p class="fs-5">Всего {{ total }} записей</p>
  <button type="button" class="btn btn-success" @click="$router.push('/create')">+</button>
</template>

<script setup>
import {computed, onMounted, ref, watch} from "vue";
import axios from "axios";

const page = ref(1);
const perPage = ref(4);

const clients = ref([]);
const total = ref(null);
onMounted(async () => {
  await loadData();
});

async function loadData() {
  if(page.value<1 || page.value>numberOfPages.value){
    return;
  }
  const res = await axios.get(`http://127.0.0.1:8000/api/clients/getAllWithCars?page=${page.value}`);
  clients.value = res.data?.data;
  total.value = res.data?.total;
}

async function deleteClient(id) {
 await axios.delete(`http://127.0.0.1:8000/api/clients/delete/${id}`).then(()=>{
   loadData();
 });
}


const numberOfPages = computed(() => {
  if (!total.value) return 1;
  return Math.ceil(total?.value / perPage.value);
})

watch([page], loadData);
</script>

<style scoped>

</style>