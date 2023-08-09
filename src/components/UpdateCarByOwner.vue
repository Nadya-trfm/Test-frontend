<template>
  <form @submit.prevent="updateCar">
    <div v-if="errors.length!==0">

      {{ errors }}

    </div>
    <div class="mb-3 col-sm-7">
      <label for="brand" class="form-label">Введите марку машины</label>
      <input type="text" class="form-control"
             :class="{'is-valid':isBrandEntered, 'is-invalid': isBrandEntered===false}"
             id="brand" v-model.trim="car.brand">
      <div v-if="isBrandEntered===false" class="invalid-feedback" id="validationBrand">
        Бренд не введен
      </div>
    </div>

    <div class="mb-3 col-sm-7">
      <label for="model" class="form-label">Введите модель машины</label>
      <input type="text" class="form-control"
             :class="{'is-valid':isModelEntered, 'is-invalid': isModelEntered===false}"
             id="model" v-model.trim="car.model">
      <div v-if="isModelEntered===false" class="invalid-feedback" id="validationModel">
        Модель автомобиля не введено
      </div>
    </div>

    <div class="mb-3 col-sm-7">
      <label for="body_color" class="form-label">Введите цвет корпуса</label>
      <input type="text" class="form-control"
             :class="{'is-valid':isColorEntered, 'is-invalid': isColorEntered===false}"
             id="body_color" v-model.trim="car.body_color">
      <div v-if="isColorEntered===false" class="invalid-feedback" id="validationColor">
        Модель кузова не введена
      </div>
    </div>

    <div class="mb-3 col-sm-3">
      <label for="plate_number" class="form-label">Введите гос номер РФ</label>
      <input type="text" class="form-control" id="plate_number" v-model="car.plate_number"
             :class="{'is-valid':isPlateNumberEntered, 'is-invalid': isPlateNumberEntered===false}">
      <div v-if="isPlateNumberEntered===false" class="invalid-feedback" id="validationNumber">
        гос номер не введен
      </div>

    </div>

    <div class="form-check form-switch">
      <input class="form-check-input" type="checkbox" id="is_parked" v-model="car.is_parked"
             true-value="1" false-value="0">
      <label class="form-check-label" for="is_parked">Автомобиль на парковке</label>
    </div>

    <button type="submit" class="btn btn-primary mt-1">Отправить</button>
  </form>

</template>

<script setup>
import {computed, onMounted, ref, watch} from "vue";
import axios from "axios";
import router from "../router";

const car = ref({
  brand: null,
  model: null,
  body_color: null,
  plate_number: null,
  is_parked: null,
  owner_id: null
});
const startValidation = ref(false);
const errors = ref([]);
const ownerId = ref(router.currentRoute.value.params.id);
const props= defineProps({
  'carId':{
    type: Number,
    default: null
  }
});


watch(() => props.carId,async () => {
  console.log('watch');
 await loadCar();
},{immediate:true});

async function loadCar() {
  console.log('loadcar');
  await axios.get(`http://127.0.0.1:8000/api/cars/update/${props.carId}`)
      .then(res => {
        car.value = res.data[0];
      })
      .catch(function (e) {
        if (e.response) {
          alert(e.response.data.message);
        }
      })
}

async function updateCar() {
  startValidation.value = true;
  errors.value.length = 0;

  if (isBrandEntered.value === true && isModelEntered.value === true
      && isColorEntered.value === true && isPlateNumberEntered.value === true) {
    try {
      await axios.put(`http://127.0.0.1:8000/api/cars/update/${props.carId}`, {
        brand: car.value.brand,
        model: car.value.model,
        body_color: car.value.body_color,
        plate_number: car.value.plate_number,
        is_parked: car.value.is_parked,
        owner_id: ownerId.value
      });
    } catch (e) {
      let error = e?.response.data;
      errors.value.push(error);
    }
  }
}

const isBrandEntered = computed(() => {
  return startValidation.value ? car.value.brand !== null : null;
});

const isModelEntered = computed(() => {
  return startValidation.value ? car.value.model !== null : null;
});

const isColorEntered = computed(() => {
  return startValidation.value ? car.value.body_color !== null : null;
});

const isPlateNumberEntered = computed(() => {
  return startValidation.value ? car.value.plate_number !== null : null;
});

</script>

<style scoped>

</style>