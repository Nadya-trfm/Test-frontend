<template>
  <form @submit.prevent="createClient" method="post">
    <div class="mb-3 col-sm-7">
      <label for="full_name" class="form-label">Введите ваше ФИО</label>
      <input type="text" class="form-control"
             :class="{'is-valid':isLongFullName, 'is-invalid': isLongFullName===false}"
             id="full_name" v-model.trim="client.full_name">
      <div v-if="isLongFullName===false" class="invalid-feedback" id="validationServerUsernameFeedback">
        ФИО короче 3 символов
      </div>
    </div>

    <div class="mb-3">
      <label class="form-check-label">
        Выберите пол

      </label>
      <div class="form-check">
        <input class="form-check-input" type="radio" id="man" value="0" v-model="client.is_female"
               :class="{'is-valid':isGenderSelected, 'is-invalid': isGenderSelected===false}">
        <label class="form-check-label" for="man">
          Мужской
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" id="woman" value="1" v-model="client.is_female"
               :class="{'is-valid':isGenderSelected, 'is-invalid': isGenderSelected===false}">
        <label class="form-check-label" for="woman">
          Женский
        </label>
        <div v-if="isGenderSelected===false" class="invalid-feedback" id="validationServerGenderFeedback">
          Пол не выбран
        </div>
      </div>

    </div>

    <div class="mb-3 col-sm-3">
      <label for="tel" class="form-label">Введите ваш номер</label>
      <input type="number" class="form-control" id="tel" v-model="client.tel"
             :class="{'is-valid':isNumberEntered, 'is-invalid': isNumberEntered===false||errors.length!==0}">
      <div v-if="isNumberEntered===false" class="invalid-feedback" id="validationServerNumberFeedback">
        Телефон не введен
      </div>
      <div v-if="errors.length!==0" class="invalid-feedback" id="validationServerNumberFeedback">
        Клиент с таким номером уже существует
      </div>
    </div>

    <div class="mb-3 col-sm-5">
      <label for="address" class="form-label">Введите адрес (опционально)</label>
      <textarea class="form-control" id="address" rows="3" v-model.trim="client.address"></textarea>
    </div>

    <button type="submit" class="btn btn-primary">Отправить</button>
  </form>
</template>

<script setup>
import {ref, computed} from "vue";
import axios from "axios";
import router from "../router";

const client = ref({
  full_name: null,
  is_female: null,
  tel: null,
  address: null
});
const startValidation = ref(false);
const errors =ref([]);

async function createClient() {
  startValidation.value = true;
  errors.value.length=0;

  if (isLongFullName.value === true && isGenderSelected.value === true && isNumberEntered.value === true) {
    try {
      await axios.post(`http://127.0.0.1:8000/api/clients/create`, {
        full_name: client.value.full_name,
        is_female: client.value.is_female,
        tel: client.value.tel,
        address: client.value.address,
      }).then(router.push('/'));
    }catch (e){
      let error =e?.response.data;
      errors.value.push(error);
    }
  }
}

const isLongFullName = computed(() => {
  const validName = client.value.full_name === null || client.value.full_name.length >= 3;
  return startValidation.value ? validName : null;
});

const isGenderSelected = computed(() => {
  return startValidation.value ? client.value.is_female !== null : null;
});

const isNumberEntered = computed(() => {
  return startValidation.value ? client.value.tel !== null : null;
});
</script>

<style scoped>

</style>