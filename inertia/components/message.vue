<script setup lang="ts">
import { InferPageProps } from '@adonisjs/inertia/types'
import { Link } from '@inertiajs/vue3'

import StreamsController from '#controllers/streams_controller'
import { styled } from '@vvibe/vue-styled-components';

defineProps<{
  message: InferPageProps<StreamsController, 'show'>['messages'][0]
}>()

const Container = styled.div`
  display: list-item;

  li {
    display: flex;
    margin: 1rem 0;

    vertical-align: baseline;
  }
`

const Date = styled.div`
  margin-right: .5rem !important;
`

const Badges = styled.span`
  display: inline-block;
  img {
    vertical-align: middle;
    margin: 0 .3rem .2rem 0;
  }
`

const AuthorProps = { color: String }
const Author = styled('div', AuthorProps)`
  a {
    color: ${props => props.color};

    &:hover {
      text-decoration: underline;
    }
  }
`

const Message = styled.div``
</script>

<template>
  <Container>
    <li>
      <Date>{{ message.data.time_text }}</Date>
      <Badges>
        <img v-for="badge in message.data.author.badges" :src="badge.icons[0].url" :alt="badge.name" />
      </Badges>
      <Author :color="message.data.author.colour">
        <Link :href="`https://twitch.tv/${message.data.author.display_name}`">{{ message.data.author.display_name }}</Link>
      </Author>
      <span>: </span>
      <Message>
        {{ message.data.message }}
      </Message>
    </li>
  </Container>
</template>
