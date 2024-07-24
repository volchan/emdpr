<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import { styled } from '@vvibe/vue-styled-components';

import Message from '#models/message';

defineProps<{
  message: Message,
  stream_id: string
}>()

const Container = styled.li`
  display: flex;
  flex-direction: column;
  padding: 1rem;

  &:hover {
    background-color: #ffffff29;
  }
`

const Header = styled.div`
  display: flex;
  align-items: center;
`

const Time = styled.div`
  margin-right: .5rem;
`

const Badges = styled.span`
  display: inline-block;
  img {
    vertical-align: middle;
    margin: 0 .3rem .2rem 0;
    &:last-child {
      margin-right: 0.5rem;
    }
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

const Text = styled.div``

const convertTimeStringToUrl = (timeString: string) => {
  let hours, minutes, seconds;
  const parts = timeString.split(':');

  if (parts.length === 2) {
    hours = '00';
    minutes = parts[0].padStart(2, '0');
    seconds = parts[1].padStart(2, '0');
  } else if (parts.length === 3) {
    hours = parts[0].padStart(2, '0');
    minutes = parts[1].padStart(2, '0');
    seconds = parts[2].padStart(2, '0');
  }

  return `${hours}h${minutes}m${seconds}s`;
}
</script>

<template>
  <Container>
    <Header>
      <Time><a target="_blank" :href="`https://twitch.tv/videos/${stream_id}?t=${convertTimeStringToUrl(message.data.time_text)}`">{{ message.data.time_text }}</a></Time>
      <Badges>
        <img v-for="badge in message.data.author.badges" :src="badge.icons[0].url" :alt="badge.name" />
      </Badges>
      <Author :color="message.data.author.colour">
        <Link :href="`https://twitch.tv/${message.data.author.display_name}`">{{ message.data.author.display_name }}</Link>
      </Author>
    </Header>
    <Text>
      {{ message.data.message }}
    </Text>
  </Container>
</template>
