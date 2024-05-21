import React, {useState} from "react";
import {View, StyleSheet, Text, Pressable, Image} from "react-native";
import {useDispatch} from "react-redux";
import {addToCart} from "../redux/CartReducer";
import {useNavigation} from "@react-navigation/native";

export default function ProductItem({item}){

  const dispatch = useDispatch()
  const [addedToCart, setAddedToCart] = useState(false);
  const navigation = useNavigation()

  const addItemToCart = (item) => {
    setAddedToCart(true)
    dispatch(addToCart(item))
    setTimeout(() => {
      setAddedToCart(false)
    }, 60000)
  }

  return(
    <Pressable style={styles.productPressable}
      onPress={() => navigation.navigate("Info", {
       id: item.id,
       title: item.title,
       price: item?.price,
       carouselImages: item.images,
       color: item?.color,
       size: item?.size,
       oldPrice: item?.oldPrice,
       item: item,
       offer: item?.offer
      })}
    >
      <Image source={{uri: item?.images[0].path}}
        style={styles.productImage}
      />

      <Text numberOfLines={1} style={styles.productTitle}>{item?.title}</Text>

      <View style={styles.priceView}>
        <Text style={styles.price}>R$ {item?.price}</Text>
        <Text style={styles.rating}>Em estoque</Text>
      </View>

      <Pressable
        onPress={() => addItemToCart(item)}
        style={styles.pressableCart}
      >
        {addedToCart ? (
          <View>
            <Text>No carrinho</Text>
          </View>
        ) : (
          <Text>Carrinho +</Text>
        )}
      </Pressable>

    </Pressable>
  )
}

const styles = StyleSheet.create({
  productImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain'
  },
  productPressable: {
    marginHorizontal: 10,
    marginVertical: 25
  },
  productTitle: {
    width: 150,
    marginTop: 10
  },
  priceView: {
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  price: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  rating: {
    color: '#FFC72C',
    fontWeight: 'bold',
    marginLeft: 10
  },
  pressableCart: {
    backgroundColor: '#FFC72C',
    padding: 10,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    marginTop: 10
  }
})
