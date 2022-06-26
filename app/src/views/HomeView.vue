<script setup lang="ts">
import TheWelcome from "@/components/TheWelcome.vue";

const url = new URL("http://localhost:1405/.well-known/mercure");
url.searchParams.append('topic', '/alert')

const eventSource = new EventSource(url);

eventSource.onmessage = (e) => console.log(e)

/* Fix firefox warning */
window.addEventListener('beforeunload', () => eventSource.close())
</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
