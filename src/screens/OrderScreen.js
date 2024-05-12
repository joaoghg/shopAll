import React from "react";
import { View, StyleSheet, Text } from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";

export default function OrderScreen(){

  const insets = useSafeAreaInsets()

  return (
    <View
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingRight: insets.right,
        paddingLeft: insets.left
      }}
    >
      <Text>OrderScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({

})