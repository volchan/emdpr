#! /usr/bin/env bash

STREAM_IDS=(
  '2179711073'
  '2180393607'
  '2182258117|04:45:00'
  '2189218512|03:18:00'
  '2191657978'
  '2192465393'
  '2193494493'
  '2194149182'
  '2194976969'
  '2197523249'
  '2198422981'
  '2199302922'
  '2201090026'
  '2202072512'
  '2205383277'
  '2207125259|01:54:00'
  '2208151397'
)

for STRING in ${STREAM_IDS[@]}; do
  IFS='|' read -r ID TIME <<<"$STRING"

  OUTPUT="$(dirname "$0")/../database/seeders/data/$ID.json"
  if [ -f $OUTPUT ]; then
    echo "File $OUTPUT already exists. Skipping..."
    continue
  fi

  VIDEO_URL="https://www.twitch.tv/videos/$ID"
  if [ -z "$TIME" ]; then
    TITLE="Downloading chat of $VIDEO_URL"
    SUCCESS_MESSAGE="Successfully downloaded chat of $VIDEO_URL"
    CMD_ARGS="$VIDEO_URL --output $OUTPUT --message_types text_message --quiet"
  else
    TITLE="Downloading chat of $VIDEO_URL from $TIME"
    SUCCESS_MESSAGE="Successfully downloaded chat of $VIDEO_URL from $TIME"
    CMD_ARGS="$VIDEO_URL --output $OUTPUT --message_types text_message --quiet --start_time $TIME"
  fi

  gum spin --spinner dot --title "$TITLE" -- chat_downloader $CMD_ARGS

  echo $SUCCESS_MESSAGE
done

echo "All streams imported successfully!"
exit 0
