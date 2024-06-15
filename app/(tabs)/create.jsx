import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert
} from "react-native"
import React, { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { CustomButton, FormField } from "../../components"
import { ResizeMode, Video } from "expo-av"
import { icons } from "../../constants"
import * as DocumentPicker from "expo-document-picker"
import { router } from "expo-router"
import { createVideoPost } from "../../lib/appwrite"
import { useGlobalContext } from "../../context/GlobalProvider"

const Create = () => {
  const { user } = useGlobalContext()
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: ""
  })

  const submit = async () => {
    if (
      (form.prompt === "") |
      (form.title === "") |
      !form.thumbnail |
      !form.video
    ) {
      return Alert.alert("Please provide all fields")
    }

    setUploading(true)
    try {
      await createVideoPost({
        ...form,
        userId: user.$id
      })

      Alert.alert("Success", "Post uploaded successfully")
      router.push("/home")
    } catch (error) {
      Alert.alert("Error", error.message)
    } finally {
      setForm({
        title: "",
        video: null,
        thumbnail: null,
        prompt: ""
      })

      setUploading(false)
    }
  }

  const openPicker = async (selectedType) => {
    const res = await DocumentPicker.getDocumentAsync({
      type:
        selectedType === "image"
          ? ["image/png", "image/jpeg", "image/jpg"]
          : ["video/mp4", "video/gif"]
    })

    if (!res.canceled) {
      if (selectedType === "image") {
        setForm({ ...form, thumbnail: res.assets[0] })
      }
      if (selectedType === "video") {
        setForm({ ...form, video: res.assets[0] })
      }
    } else {
      setTimeout(() => {
        Alert.alert("Document Picked").JSON.stringify(res, null, 2)
      }, 100)
    }
  }

  return (
    <SafeAreaView className="bg-black-200 h-full">
      <ScrollView className="px-4 my-6">
        <Text className="text-white text-2xl font-psemibold">Upload Video</Text>
        <Text className="text-gray-100 text-sm font-pmedium">
          Share your favorite videos with the world
        </Text>

        <FormField
          title="Video Title"
          otherStyles="mt-6"
          value={form.title}
          placeholder="Give your video a catch title..."
          handleChangeText={(e) => setForm({ ...form, title: e })}
        />
        <View className="mt-7 space-y-2">
          <Text className="text-gray-100 text-base font-pmedium">
            Upload Video
          </Text>

          <TouchableOpacity onPress={() => openPicker("video")}>
            {form.video ? (
              <Video
                source={{ uri: form.video.uri }}
                className="w-full h-64 rounded-2xl"
                resizeMode={ResizeMode.CONTAIN}
              />
            ) : (
              <View className="w-full h-40 px-4 bg-black-100 rounded-2xl justify-center items-center">
                <View className="w-16 h-16 p-2 border border-dashed border-secondary-100 justify-center items-center">
                  <Image
                    source={icons.upload}
                    resizeMode="contain"
                    className="w-full h-full"
                  />
                </View>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View className="mt-7 space-y-2">
          <Text className="text-gray-100 text-base font-pmedium">
            Thumbnail
          </Text>

          <TouchableOpacity onPress={() => openPicker("image")}>
            {form.thumbnail ? (
              <Image
                source={{ uri: form.thumbnail.uri }}
                resizeMode="cover"
                className="w-full h-64 rounded-2xl"
              />
            ) : (
              <View className="w-full h-20 px-4 bg-black-100 rounded-2xl justify-center items-center border-2 border-black-200 flex-row space-x-2">
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  className="w-8 h-8"
                />
                <Text className="text-sm text-gray-100 font-pmedium">
                  Choose a File
                </Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <FormField
          title="Prompt"
          otherStyles="mt-6"
          value={form.prompt}
          placeholder="Describe your video "
          handleChangeText={(e) => setForm({ ...form, prompt: e })}
        />

        <CustomButton
          title="Submit & Publish"
          handlePress={submit}
          containerStyles="mt-6"
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default Create
