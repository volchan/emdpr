<script setup lang="ts">
import HomeController from '#controllers/home_controller'
import { InferPageProps } from '@adonisjs/inertia/types'
import { styled } from '@vvibe/vue-styled-components'
import { Link } from '@inertiajs/vue3'

import ContentContainer from '~/components/content_container.vue'

const Streams = styled.ul`
  padding: 2rem;

  li {
    line-height: 1.5rem;
  }
`

defineProps<{
  streams: InferPageProps<HomeController, 'index'>['streams']
}>()
</script>

<template>
  <ContentContainer title="Liste des streams Elden Ring">
    <Streams>
      <li v-for="stream in streams" :key="stream.id" class="stream">
        <Link :href="`/streams/${stream.id}`"
          >Stream du {{ new Date(stream.date).toLocaleDateString() }}</Link
        >
      </li>
    </Streams>
  </ContentContainer>
</template>
