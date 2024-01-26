<template>
  <div class="card bg-base-100 shadow-md">
    <div class="card-body">
      <div class="flex justify-between mb-3">
        <div class="text-">{{ count }} termék</div>
        <div class="btn btn-sm" @click="showCreateItemDialog()">ÚJ TERMÉK</div>
      </div>
      <table class="table">
        <thead>
        <tr>
          <td>Termék neve</td>
          <td>Leírás</td>
          <td>kb. ár (HUF)</td>
          <td>Műveletek</td>
        </tr>
        </thead>
        <tbody>
          <data-row v-for="item in items" :model-value="item" @doDelete="confirmDelete"></data-row>
        </tbody>
      </table>
      <div class="flex justify-center">
        <paginator v-model:page="page" :count="count" :items-per-page="itemsPerPage"></paginator>
      </div>
    </div>

  </div>

  <create-item-dialog ref="createDialog" @reload="loadList"></create-item-dialog>
  <delete-item-dialog ref="deleteDialog" @reload="loadList" v-model="deleteId"></delete-item-dialog>
</template>
<script setup >
import DataRow from "./DataTable/DataRow.vue";
import {onMounted, ref, watch} from 'vue'
import CreateItemDialog from "./DataTable/CreateItemDialog.vue";
import Paginator from "./DataTable/Paginator.vue";
import DeleteItemDialog from "./DataTable/DeleteItemDialog.vue";


const createDialog = ref(null)
const deleteDialog = ref(null)
const items = ref([])
const page = ref(0);
const deleteId = ref(null);
let count = 0;
let itemsPerPage = 0;

const showCreateItemDialog = () => {
  createDialog.value.$el.showModal()
}
const confirmDelete = (id) => {
  deleteId.value = id;
}





const loadList = async () => {
  const list = await fetch(`${import.meta.env.VITE_API_HOST}?page=${page.value}`)
      .then(resp => resp.json());
  items.value = list.items;
  count = list.count;
  itemsPerPage = list.itemPerPage;
}

onMounted(() => {
  loadList()
})

watch(page, loadList)
</script>