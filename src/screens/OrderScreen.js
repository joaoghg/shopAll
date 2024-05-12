import React, {useEffect} from "react";
import {View, StyleSheet, Text, SafeAreaView} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import LottieView from "lottie-react-native";

export default function OrderScreen({ navigation }){

  const insets = useSafeAreaInsets()

  useEffect(() => {
    setTimeout(() => {
      navigation.replace("Main")
    }, 2500)
  }, [])

  return (
    <SafeAreaView
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingRight: insets.right,
        paddingLeft: insets.left,
        flex: 1,
        backgroundColor: 'white'
      }}
    >
      <LottieView
        source={require("../../assets/thumbs.json")}
        // ref={animation}
        style={{
          height: 260,
          width: 300,
          alignSelf: "center",
          marginTop: 40,
          justifyContent: "center",
        }}
        autoPlay
        loop={false}
        speed={0.7}
      />
      <Text
        style={{
          marginTop: 20,
          fontSize: 19,
          fontWeight: "600",
          textAlign: "center",
        }}
      >
        Seu pedido foi concluído
      </Text>
      <LottieView
        source={require("../../assets/sparkle.json")}
        style={{
          height: 300,
          position: "absolute",
          top: 100,
          width: 300,
          alignSelf: "center",
        }}
        autoPlay
        loop={false}
        speed={0.7}
      />
    </SafeAreaView>
  )
}
