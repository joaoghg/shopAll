import React, {useState} from "react";
import {View, StyleSheet, Text, Pressable, Image} from "react-native";
import {useDispatch} from "react-redux";
import {addToCart} from "../redux/CartReducer";

export default function ProductItem({item}){

  const dispatch = useDispatch()
  const [addedToCart, setAddedToCart] = useState(false);

  const addItemToCart = (item) => {
    setAddedToCart(true)
    dispatch(addToCart(item))
    setTimeout(() => {
      setAddedToCart(false)
    }, 60000)
  }

  return(
    <Pressable style={styles.productPressable}>
      <Image source={{uri: item?.image}}
        style={styles.productImage}
      />

      <Text numberOfLines={1} style={styles.productTitle}>{item?.title}</Text>

      <View style={styles.priceView}>
        <Text style={styles.price}>R$ {item?.price}</Text>
        <Text style={styles.rating}>{item?.rating?.rate} Avaliação</Text>
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