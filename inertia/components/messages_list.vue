<script setup lang="ts">
import { defineProps, ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

import Stream from '#models/stream'
import Message from '#models/message'
import { PaginationMeta } from '#controllers/messages_controller'

import ContentContainer from '~/components/content_container.vue'
import MessageItem from '~/components/message_item.vue'

const last = ref(null)

useIntersectionObserver(last, ([entry]) => {
  if (entry.isIntersecting) {
    if (props.paginate.nextPageUrl) {
      fetch(props.paginate.nextPageUrl, {
        headers: {
          'Accept': 'application/json',
        }
      }).then(response => response.json()).then(data => {
        props.messages.push(...data.messages)
        props.paginate.nextPageUrl = data.paginate.nextPageUrl
      })
    }
  }
})

const props = defineProps<{
  stream: Stream
  messages: Message[]
  paginate: PaginationMeta
}>()
</script>

<template>
  <ContentContainer :title="`Stream du ${new Date(stream.date).toLocaleDateString()}`" with-return-link>
    <ul>
      <MessageItem v-for="message in messages" :key="message.id" :message="message" :stream_id="stream.twitchId" />
      <li v-if="!messages">Aucun messages</li>
      <div ref="last"></div>
    </ul>
  </ContentContainer>
</template>
