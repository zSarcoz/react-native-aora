import { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import {

  FlatList,
  Image,
  RefreshControl,
  Text,
  View
} from "react-native"
import { images } from "../../constants"
import SearchInput from "../../components/SearchInput"
import Trending from "../../components/Trending"
import EmptyState from "../../components/EmptyState"
import { useGlobalContext } from "../../context/GlobalProvider"
import { getAllPosts, getLatestPosts } from "../../lib/appwrite"
import useAppwrite from "../../lib/useAppwrite"
import VideoCard from "../../components/VideoCard"

const Home = () => {
  const {
    data: posts,
    refetch,
    isLoading,
    setIsLoading
  } = useAppwrite(getAllPosts)


  const { data: latestPosts } = useAppwrite(getLatestPosts)
  const { user } = useGlobalContext()
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }

  // one flatlist
  // with list header
  // and horizontal flatlist

  //  we cannot do that with just scrollview as there's both horizontal and vertical scroll (two flat lists, within trending)

  return (
    <SafeAreaView className="bg-black-200 h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => (
          <>
            {!isLoading ? (
              <VideoCard
                title={item.title}
                thumbnail={item.thumbnail}
                video={item.video}
                creator={item.creator.username}
                avatar={item.creator.avatar}
              />
            ) : (
              <View className="w-full flex px-4 mb-10 gap-5">
                <View
                  className="w-full
                 h-[60px] flex flex-row items-center justify-between"
                >
                  <View
                    className="w-[50px]
                 h-[50px] bg-gray-700 rounded-full"
                  ></View>
                  <View
                    className="w-3/4
                 h-[50px] bg-gray-700 px-10 rounded-lg"
                  ></View>
                </View>
                <View
                  className="w-full
                 h-[220px] bg-gray-700 px-10 rounded-lg"
                ></View>
              </View>
            )}
          </>
        )}
        ListHeaderComponent={() => (
          <View className="flex my-6 space-y-6">
            <View className="flex justify-between items-start flex-row mb-6 px-5">
              <View>
                <Text className="font-pmedium text-sm text-gray-100">
                  Welcome Back
                </Text>
                <Text className="text-2xl font-psemibold text-white">
                  {user?.username}
                </Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-10 h-10"
                  resizeMode="contain"
                />
              </View>
            </View>
            <View className="w-full px-3">
              <SearchInput />
            </View>

            <View className="w-full flex justify-center">
              <Text className="text-lg font-pregular text-gray-100 mb-3 ml-5">
                Latest Videos
              </Text>



              {!isLoading ? (
                <Trending posts={latestPosts ?? []} />
              ) : (
                <View className='w-full flex justify-center items-center my-4'>
                  <View className="w-52 h-72 bg-gray-700 rounded-xl"></View>
                </View>
              )}
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="Be the first one to upload a video"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        loa
      />
    </SafeAreaView>
  )
}

export default Home
