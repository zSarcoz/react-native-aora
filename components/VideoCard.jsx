import { View, Text, Image, TouchableOpacity } from "react-native"
import React, { useState } from "react"
import { icons } from "../constants"
import { ResizeMode, Video } from "expo-av"


const VideoCard = ({ title, thumbnail, video, creator, avatar }) => {
  const [play, setPlay] = useState(false)
  const [like, setLike] = useState(false)
  return (
    <View className="w-full flex-col items-center px-4 mb-10">
      <View className="flex flex-row gap-3 items-start">
        <View className="flex flex-row items-center justify-center flex-1">
          <View className="w-[46px] h-[46px] rounded-full border border-gray-500 flex justify-center items-center p-0.5">
            <Image
              source={{ uri: avatar }}
              className="w-full h-full rounded-full"
              resizeMode="contain"
            />
          </View>

          <View className="flex justify-center flex-1 ml-3 gap-y-1">
            <Text
              className="font-psemibold text-base text-white"
              numberOfLines={1}
            >
              {title}
            </Text>
            <Text
              className="text-xs text-gray-100 font-pregular"
              numberOfLines={1}
            >
              {creator}
            </Text>
          </View>
        </View>

        <View className="pt-2">
          <Image source={icons.menu} className="w-5 h-5" resizeMode="contain" />
        </View>
      </View>
      {play ? (
        <Video
          source={{ uri: video }}
          className="w-full h-64 rounded-3xl mt-3 bg-white/10"
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false)
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          className="w-full h-72 flex relative items-center justify-center mt-3"
          onPress={() => setPlay(!play)}
        >
          <Image
            source={{ uri: thumbnail }}
            className="w-full h-full rounded-xl mt-3"
            resizeMode="cover"
          />
          <Image
            source={icons.play}
            resizeMode="contain"
            className="w-14 absolute"
          />
        </TouchableOpacity>
      )}

      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => setLike(!like)}
        className="w-full h-8 flex items-start justify-center mt-3"
      >
        <Image source={icons.heart} resizeMode="contain" className={!like ? "w-10" : "w-10 bg-slate-300/20"}/>
      </TouchableOpacity>

    </View>
  )
}

export default VideoCard
