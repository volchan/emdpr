<script setup lang="ts">
import { defineProps } from 'vue'
import { styled } from '@vvibe/vue-styled-components'
import { InferPageProps } from '@adonisjs/inertia/types'

import StreamsController from '#controllers/streams_controller'
import ContentContainer from '~/components/content_container.vue'
import Message from '~/components/message.vue'

const Messages = styled.ul`
  padding: 2rem;

  li {
    line-height: 1.5rem;
  }
`

defineProps<{
  stream: InferPageProps<StreamsController, 'show'>['stream']
  messages: InferPageProps<StreamsController, 'show'>['messages']
}>()
</script>

<template>
  <ContentContainer :title="`Stream du ${new Date(stream.date).toLocaleDateString()}`" with-return-link>
    <Messages>
      <Message v-for="message in messages" :key="message.id" :message="message" />
    </Messages>
  </ContentContainer>
</template>
