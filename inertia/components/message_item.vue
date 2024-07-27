<script setup lang="ts">
import { Link } from '@inertiajs/vue3'
import { styled } from '@vvibe/vue-styled-components';

import Message, { MessageData } from '#models/message';

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

const Text = styled.p`
  margin-top: 0;
  white-space: -moz-pre-wrap !important;
  white-space: -webkit-pre-wrap;
  white-space: -pre-wrap;
  white-space: -o-pre-wrap;
  white-space: pre-wrap;
  word-wrap: break-word;
  white-space: normal;

  max-width: 970px;

  @media (max-width: 500px) {
    max-width: 300px;
  }

  img {
    vertical-align: middle;
  }
`

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

const fixEmoteName = (emoteName: string, message: string) => {
  console.log(emoteName, message);

  if (emoteName == '') {
    const specialEmotes = [':D', ':p', 'LUL']
    return specialEmotes.find(emote => message.includes(emote))!;
  }
  const words = message.split(' ');
  return words.find(word => word.includes(emoteName))!;
}

const replaceEmoteTextWithImage = (emotes: MessageData['emotes'], message: string) => {
  if (!emotes) return message;
  let formattedMessage = message;
  emotes.forEach(emoteData => {
    const emote = emoteData.images.find(image => image.id.includes('dark'))!;
    const fixedEmoteName = fixEmoteName(emoteData.name, message);

    console.log(fixedEmoteName, emoteData);

    formattedMessage = message.replaceAll(fixedEmoteName, `<img src="${emote.url}" height="${emote.height}" width="${emote.width}" alt="${emoteData.name}" />`)
  });

  return formattedMessage;
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
    <Text v-html="replaceEmoteTextWithImage(message.data.emotes, message.data.message)" />
  </Container>
</template>
