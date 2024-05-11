import React from "react";
import {View, StyleSheet, Text, SafeAreaView} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";

export default function ConfirmationScreen(){

  const insets = useSafeAreaInsets()

  return (
    <SafeAreaView
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingRight: insets.right,
        paddingLeft: insets.left
      }}
    >
      <Text>ConfirmationScreen</Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

})
