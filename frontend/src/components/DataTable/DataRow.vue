<template>
  <tr :class="{'bg-gray-300' :isAcquired}">
    <td>
      {{ item.name }}
    </td>
    <td>
      {{ item.description }}
    </td>
    <td>
      {{  item.price }}
    </td>
    <td>
      <div @click="toggleStatus" class="btn btn-ghost btn-xs">
        <span v-if="isAcquired">Mégse</span>
        <span v-else>Beszerezve</span>
      </div>
      <div @click="doDelete" class="btn btn-ghost btn-xs">Törlés</div>
    </td>
  </tr>

</template>
<script setup>
import {computed} from "vue";

const item = defineModel();
const emits = defineEmits(['toggleStatus', 'doDelete'])

const isAcquired = computed(() => {
  return item.value.status === 'acquired';
})

const toggleStatus = async () => {
  item.value = await fetch(`${import.meta.env.VITE_API_HOST}/${item.value._id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(resp => resp.json())
}

const doDelete = () => {
  emits('doDelete', item.value._id)
}
</script>