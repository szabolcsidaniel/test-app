<template>
  <dialog  class="modal" ref="dialog">
    <div class="modal-box">
      <div class="text-xl text-center mb-4">Biztosan törlöd?</div>
      <div class="modal-action flex justify-between">
        <form method="dialog" >
          <button class="btn">Mégse</button>
        </form>
        <button @click="doDelete" class="btn">Biztos</button>
      </div>
    </div>
  </dialog>
</template>
<script setup>

import {ref, watch} from "vue";

const dialog = ref(null);
const emit = defineEmits(['reload'])
const id = defineModel()

const doDelete = async  () => {
  await fetch(`${import.meta.env.VITE_API_HOST}/${id.value}`, {
    method: 'DELETE',
  })
  id.value = null;
  dialog.value.close()
  emit('reload')
}

watch(id, () => {
  if (id.value){
    dialog.value.showModal()
  }
})

</script>