<template>
  <label class="form-control w-full mb-4">
    <div class="label">
      <span class="label-text">{{ props.label }}</span>
    </div>
    <textarea v-if="props.type === 'textarea'" v-model="value" @keyup="clearError" class="textarea textarea-bordered h-24"></textarea>
    <input v-else v-model="value" :type="props.type" @keyup="clearError" class="input input-bordered w-full" />
    <div v-if="error" class="mt-2 text-sm text-red-600 dark:text-red-500">
      {{ error }}
    </div>
  </label>
</template>
<script setup>

const props = defineProps({
  label: { type: String, required: true },
  type: { type: String, default: 'text' },
})
const error = defineModel('error')
const value = defineModel('value')

const clearError = () => {
  error.value = null
}

</script>