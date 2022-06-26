<template>
  <div class="flex items-start justify-end space-x-2.5 sm:space-x-5">
    <div class="flex flex-col items-end space-y-3.5">
      <div class="ml-4 max-w-lg md:ml-10">
        <div class="rounded-2xl rounded-tr-none bg-info/10 p-3 text-slate-700 shadow-sm dark:bg-accent dark:text-white">
          {{ message }}
        </div>
        <p class="mt-1 ml-auto text-left text-xs text-slate-400 dark:text-navy-300">
          08:16
        </p>
      </div>
    </div>
    <div class="avatar">
      <img class="rounded-full" src="https://lineone.piniastudio.com/images/avatar/avatar-12.jpg" alt="avatar">
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "Message",
  props: {
    message: {type: String, default: null}
  }
}
</script>

<style scoped>

</style>
