<script setup lang="ts">
import { Head } from '@inertiajs/vue3'

import Message from '#models/message'
import Stream from '#models/stream'
import { PaginationMeta } from '#controllers/messages_controller'

import MessagesList from '~/components/messages_list.vue'
import MainContainer from '~/components/main_container.vue'

defineProps<{
  stream: Stream
  messages: Message[]
  paginate: PaginationMeta
}>()
</script>

<template>
  <Head :title="`EMDRP - Stream du ${stream.date}`" />

  <MainContainer>
    <MessagesList :messages="messages" :stream="stream" :paginate="paginate" />
  </MainContainer>
</template>
