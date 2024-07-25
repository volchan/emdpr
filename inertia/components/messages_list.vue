<script setup lang="ts">
import { defineProps, ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'

import Stream from '#models/stream'
import Message from '#models/message'
import { PaginationMeta } from '#controllers/messages_controller'

import ContentContainer from '~/components/content_container.vue'
import MessageItem from '~/components/message_item.vue'
import { styled } from '@vvibe/vue-styled-components'

const last = ref(null)
const loading = ref(false)

useIntersectionObserver(last, ([entry]) => {
  if (entry.isIntersecting) {
    if (props.paginate.nextPageUrl) {
      loading.value = true
      fetch(props.paginate.nextPageUrl, {
        headers: {
          'Accept': 'application/json',
        }
      }).then(response => response.json()).then(data => {
        props.messages.push(...data.messages)
        props.paginate.nextPageUrl = data.paginate.nextPageUrl
        loading.value = false
      })
    }
  }
})

const props = defineProps<{
  stream: Stream
  messages: Message[]
  paginate: PaginationMeta
}>()

const NoMessages = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  color: white;
  font-size: 1.5rem;
  img {
    margin-bottom: 1rem;
  }
`

const LoadingMessages = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  font-size: 1.5rem;
  img {
    margin-right: 0.5rem;
  }
`

const NoMoreMessages = styled.li`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  img {
    margin-right: 0.5rem;
    &:last-child {
      margin-left: 0.5rem;
      margin-right: 0;
    }
  }
`
</script>

<template>
  <ContentContainer :title="`Stream du ${new Date(stream.date).toLocaleDateString()}`" with-return-link>
    <ul>
      <MessageItem v-for="message in messages" :key="message.id" :message="message" :stream_id="stream.twitchId" />
      <NoMessages v-if="messages.length === 0">
        <img src="https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_e961b5c193134f2b91297b2fae317f9b/default/dark/2.0" width="56" height="56" alt="no_msgs">
        Aucun message pour le moment
      </NoMessages>
      <LoadingMessages v-if="loading">
        <img src="https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_b2c926e6e927431faf5c23b79312640a/default/dark/1.0" width="28" height="28" alt="loading">
        Chargement...
      </LoadingMessages>
      <NoMoreMessages v-if="!paginate.nextPageUrl && messages.length > 0">
        <img src="https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_a4f8dd12caaf42d68c56e2f0a0cc9a79/default/dark/1.0" width="28" height="28" alt="no_msgs">
        C'est la fin du stream, c'était bien sympa !
        <img src="https://static-cdn.jtvnw.net/emoticons/v2/emotesv2_a4f8dd12caaf42d68c56e2f0a0cc9a79/default/dark/1.0" width="28" height="28" alt="no_msgs">
      </NoMoreMessages>
      <li v-if="paginate.nextPageUrl" ref="last"></li>
    </ul>
  </ContentContainer>
</template>
