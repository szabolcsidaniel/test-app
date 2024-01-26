<template>
  <dialog class="modal" ref="dialog">
    <div class="modal-box">
      <div>
        <form-field label="Termék neve" v-model:value="item.name" v-model:error="errors.name"></form-field>
        <form-field label="kb. ár (HUF)" type="number" v-model:value="item.price" v-model:error="errors.price"></form-field>
        <form-field label="Leírás" type="textarea" v-model:value="item.description" v-model:error="errors.description"></form-field>
      </div>
      <div class="modal-action flex justify-between">
        <form method="dialog" >
          <button class="btn">Mégse</button>
        </form>
        <button @click="save" class="btn">Létrehozás</button>
      </div>


    </div>
  </dialog>
</template>
<script setup>
import FormField from "./FormField.vue";

const emit = defineEmits(['reload'])
import {computed, ref} from 'vue'

const item = ref({})
const errors = ref({})
const dialog = ref(null);

const hasError = computed(() => {
  return Object.values(errors.value).filter(x => !!x).length
})
const validate = () => {
  if (!item.value.name) {
    errors.value.name = 'Név megadása kötelező'
  }
  if (!item.value.price) {
    errors.value.price = 'Ár megadása kötelező'
  }
  if (!item.value.description) {
    errors.value.description = 'Leírás megadása kötelező'
  }
}


const save = async () => {
  validate();

  if (!hasError.value) {
    const resp = await fetch(`${import.meta.env.VITE_API_HOST}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item.value)
    })
        .then(resp => resp.json())


    if (resp.error) {
      for (let error of resp.message) {
        errors.value[error.field] = error.error;
      }
    }
    else {
      dialog.value.close();
      item.value = {};
      emit('reload')
    }

  }


}
</script>