import React from "react";
import {View, StyleSheet, Text, ScrollView, Pressable, Image, SafeAreaView} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import MainHeader from "../components/MainHeader";
import {useDispatch, useSelector} from "react-redux";
import {AntDesign, Feather} from '@expo/vector-icons';
import {decrementQuantity, incrementQuantity, removeFromCart} from "../redux/CartReducer";

export default function CartScreen({ navigation }){

  const insets = useSafeAreaInsets()
  const cart = useSelector(state => state.cart.cart)
  const total = cart?.map(item => (item.offerPrice ? item.offerPrice : item.price) * item.quantity)
    .reduce((current, prev) => current + prev, 0)

  const dispatch = useDispatch()

  const increaseQuantity = (item) => {
    dispatch(incrementQuantity(item))
  }

  const decreaseQuantity = (item) => {
    dispatch(decrementQuantity(item))
  }

  const deleteItem = (item) => {
    dispatch(removeFromCart(item))
  }

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
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: 'white'
        }}
      >

        <MainHeader />

        <View
          style={{
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center'
          }}
        >
          <Text style={{fontWeight: "400", fontSize: 18}}>Subtotal:</Text>
          <Text style={{fontSize: 20, fontWeight: 'bold', marginLeft: 5}}>R$ {total}</Text>
        </View>

        <Pressable
          onPress={() => navigation.navigate("Confirm")}
          style={{
            backgroundColor: '#FFC72C',
            padding: 10,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 10,
            marginTop: 10,
            opacity: cart.length > 0 ? 1 : 0.5
          }}
          disabled={cart.length <= 0}
        >
          <Text>Comprar {cart.length} itens</Text>
        </Pressable>

        <Text
          style={{
            height: 1,
            borderColor: '#D0D0D0',
            borderWidth: 1,
            marginTop: 16
          }}
        />

        <View
          style={{
            marginHorizontal: 10,
            marginBottom: 20
          }}
        >
          {cart?.map((item, index) => {
            return (
              <View
                key={index}
                style={{
                  backgroundColor: 'white',
                  marginVertical: 10,
                  borderBottomColor: '#F0F0F0',
                  borderWidth: 2,
                  borderLeftWidth: 0,
                  borderTopWidth: 0,
                  borderRightWidth: 0
                }}
              >
                <Pressable
                  style={{
                    marginVertical: 10,
                    flexDirection: 'row',
                    justifyContent: 'space-around'
                  }}
                >
                  <View>
                    <Image
                      source={{uri: item?.images.find(item => item.default == 1).path}}
                      style={{
                        width: 140,
                        height: 140,
                        resizeMode: 'contain'
                      }}
                    />
                  </View>

                  <View>
                    <Text numberOfLines={3} style={{width: 150, marginTop: 10}}>{item?.name}</Text>
                    <Text style={{fontSize: 18,fontWeight: 'bold', marginTop: 6}}>R$ {item.offerPrice ? item.offerPrice : item.price}</Text>
                    <Text style={{color: 'green', marginTop: 6}}>Em estoque</Text>
                  </View>
                </Pressable>

                <Pressable
                  style={{
                    marginTop: 15,
                    marginBottom: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10
                  }}
                >
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      borderRadius: 7
                    }}
                  >

                    {item?.quantity > 1 ? (
                      <Pressable
                        onPress={() => decreaseQuantity(item)}
                        style={{
                          backgroundColor: '#D8D8D8',
                          padding: 7,
                          borderTopLeftRadius: 6,
                          borderBottomLeftRadius: 6
                        }}
                      >
                        <AntDesign name="minus" size={24} color="black" />
                      </Pressable>
                    ) : (
                      <Pressable
                        onPress={() => deleteItem(item)}
                        style={{
                          backgroundColor: '#D8D8D8',
                          padding: 7,
                          borderTopLeftRadius: 6,
                          borderBottomLeftRadius: 6
                        }}
                      >
                        <AntDesign name="delete" size={24} color="black" />
                      </Pressable>
                    )}

                    <Pressable
                      style={{
                        backgroundColor: 'white',
                        paddingHorizontal: 18,
                        paddingVertical: 6
                      }}
                    >
                      <Text>{item?.quantity}</Text>
                    </Pressable>

                    <Pressable
                      onPress={() => increaseQuantity(item)}
                      style={{
                        backgroundColor: '#D8D8D8',
                        padding: 7,
                        borderTopLeftRadius: 6,
                        borderBottomLeftRadius: 6
                      }}
                    >
                      <Feather name="plus" size={24} color="black" />
                    </Pressable>
                  </View>

                  <Pressable
                    onPress={() => deleteItem(item)}
                    style={{
                      backgroundColor: 'white',
                      paddingHorizontal: 8,
                      paddingVertical: 10,
                      borderRadius: 5,
                      borderColor: '#C0C0C0',
                      borderWidth: 0.6
                    }}
                  >
                    <Text>Excluir</Text>
                  </Pressable>
                </Pressable>

              </View>
            )
          })}
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

})
