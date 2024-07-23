<script setup lang="ts">
import { InferPageProps } from '@adonisjs/inertia/types'
import { Head } from '@inertiajs/vue3'

import type HomeController from '#controllers/home_controller'
import MainContainer from '~/components/main_container.vue'
import StreamList from '~/components/streams_list.vue'

defineProps<{
  streams: InferPageProps<HomeController, 'index'>['streams']
}>()
</script>

<template>
  <Head title="EMDPR" />

  <MainContainer>
    <StreamList :streams="streams" />
  </MainContainer>
</template>
