import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'tamagui'
import React from 'react'

const Bookmark = () => {
  return (
    <View className='flex justify-center items-center'>
      <Text>Bookmark</Text>
      <Button theme="blue">Hello world</Button>
    </View>
  )
}

export default Bookmark

const styles = StyleSheet.create({})