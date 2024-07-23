<script setup lang="ts">
import StreamsController from '#controllers/streams_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { Head } from '@inertiajs/vue3'

import MainContainer from '~/components/main_container.vue'
import MessagesList from '~/components/messages_list.vue'

defineProps<{
  stream: InferPageProps<StreamsController, 'show'>['stream']
  messages: InferPageProps<StreamsController, 'show'>['messages']
}>()
</script>

<template>
  <Head :title="`EMDRP - Stream du ${stream.date}`" />

  <MainContainer>
    <MessagesList :messages="messages" :stream="stream" />
  </MainContainer>
</template>
