<template>
  <div class="join">
    <button @click="prev" class="join-item btn btn-xs">«</button>
    <button class="join-item btn btn-xs">{{ page + 1 }}</button>
    <button @click="next" class="join-item btn btn-xs">»</button>
  </div>
</template>
<script setup>

const props = defineProps(['count', 'itemsPerPage'])
const page = defineModel('page')



const prev = () => {
  if (page.value > 0) {
    page.value--;
  }
}
const next = () => {
  const maxPageNumber = Math.ceil((props.count / props.itemsPerPage)) - 1
  if (page.value < maxPageNumber) {
    page.value++;
  }
}
</script>