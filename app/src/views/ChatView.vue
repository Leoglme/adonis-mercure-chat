<script setup lang="ts">
import Message from "@/components/Message.vue"
import axios from "axios"
import { ref } from "vue"

const messageInput = ref()
const messages = ref([] as string[])
const url = new URL("http://localhost:1405/.well-known/mercure")
url.searchParams.append("topic", "/chat")
/*https://lineone.piniastudio.com/apps-chat.html*/
const eventSource = new EventSource(url, { withCredentials: true })

eventSource.onmessage = (e) => messages.value.push(JSON.parse(e.data).message)

/* Fix firefox warning */
window.addEventListener("beforeunload", () => eventSource.close())

const handleSubmit = () => {
  axios.post("http://localhost:3333/chat/public", { message: messageInput.value.value })
  messageInput.value.value = ""
}

</script>

<template>
  <main>
    <div class="grow overflow-y-auto px-[calc(var(--margin-x)-.5rem)] py-5 transition-all duration-[.25s] scrollbar-sm">
      <Message v-for="(message, index) in messages" :key="`message${index}`" :message="message"/>

      <form @submit.prevent="handleSubmit">
        <input ref="messageInput" />
      </form>
    </div>

  </main>
</template>
