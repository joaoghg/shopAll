import React, { useLayoutEffect, useEffect, useContext } from "react";
import {View, StyleSheet, Text, Pressable} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import { Ionicons, AntDesign } from "@expo/vector-icons"
import axios from "axios";
import { AuthContext } from "../contexts/Auth";
import {UserType} from "../contexts/UserContext";

export default function ProfileScreen({ navigation }){

  const insets = useSafeAreaInsets()
  const { server } = useContext(AuthContext)
  const { userId } = useContext(UserType)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerStyle: {
        backgroundColor: '#00CED1'
      },
      headerLeft: () => (
        <Image
          style={{ width: 140, height: 120, resizeMode: "contain" }}
          source={{
            uri: "https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c518.png",
          }}
        />
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 6,
            marginRight: 12,
          }}
        >
          <Ionicons name="notifications-outline" size={24} color="black" />

          <AntDesign name="search1" size={24} color="black" />
        </View>
      )
    })
  }, [])

  useEffect(() => {
    const fetchUserProfile = async () => {
      try{
        const response = await axios.get(`${server}/profile/${userId}`)

        
      }catch (error){
        console.log(error)
      }
    }

  }, [])

  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingRight: insets.right,
        paddingLeft: insets.left
      }}
    >
      <Text>ProfileScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({

})
