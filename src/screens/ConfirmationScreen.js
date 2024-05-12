import React, {useContext, useState, useEffect} from "react";
import {View, StyleSheet, Text, SafeAreaView, ScrollView, Pressable, Alert} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import axios from "axios";
import {AuthContext} from "../contexts/Auth";
import {UserType} from "../contexts/UserContext";
import {Entypo, FontAwesome6, MaterialIcons} from '@expo/vector-icons';
import {useDispatch, useSelector} from "react-redux";
import {clearCart} from "../redux/CartReducer";

export default function ConfirmationScreen({ navigation }){

  const { server } = useContext(AuthContext)
  const { userId } = useContext(UserType)
  const dispatch = useDispatch()

  const steps = [
    { title: "Endereço", content: "Address Form" },
    { title: "Entrega", content: "Delivery Options" },
    { title: "Pagamento", content: "Payment Details" },
    { title: "Finalizar", content: "Order Summary" },
  ];

  const insets = useSafeAreaInsets()

  const [currentStep, setCurrentStep] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [option, setOption] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const cart = useSelector(state => state.cart.cart)
  const total = cart?.map(item => item.price * item.quantity)
    .reduce((current, prev) => current + prev, 0)

  useEffect(() => {
    fetchAddresses()
  }, [])

  const fetchAddresses = async () => {
    try{
      const response = await axios.get(`${server}/addresses/${userId}`)
      const { addresses } = response.data

      setAddresses(addresses)
    }catch(error){
      console.log("erro", error)
    }
  }

  const handleConfirm = async () => {
    try{
      const orderData = {
        userId: userId,
        cartItems: cart,
        totalPrice: total,
        shippingAddress: selectedAddress.id,
        paymentMethod: selectedOption
      }

      await axios.post(`${server}/orders`, orderData)
      navigation.navigate("Order")
      dispatch(clearCart())
    }catch (error) {
      if(error.response){
        Alert.alert("Erro", error.response.data.message)
      }
      else{
        Alert.alert("Erro", "Erro ao finalizar pedido")
      }
    }
  }

  return (
    <SafeAreaView
      style={{
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingRight: insets.right,
        paddingLeft: insets.left,
        flex: 1
      }}
    >
      <ScrollView>
        <View
          style={{
            flex: 1,
            paddingHorizontal: 20,
            paddingTop: 40
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 20,
              justifyContent: 'space-between'
            }}
          >
            {steps.map((step, index) => {
              return (
                <View
                  key={index}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                >
                  {
                    index > 0 && (
                      <View
                        style={[
                          {flex: 1, height: 2,backgroundColor: 'green'},
                          index <= currentStep && { backgroundColor: 'green' }
                        ]}
                      />
                    )
                  }
                  <View
                    style={[
                      {
                        width: 30, height: 30, borderRadius: 15, backgroundColor: '#ccc', justifyContent: 'center', alignItems: 'center'
                      },
                      index < currentStep && { backgroundColor: 'green' }
                    ]}
                  >
                    {index < currentStep ? (
                      <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>&#10003;</Text>
                    ) : (
                      <Text style={{fontSize: 16, fontWeight: 'bold', color: 'white'}}>{index+1}</Text>
                    )}
                  </View>
                  <Text style={{textAlign: 'center', marginTop: 8}}>{step.title}</Text>
                </View>
              )
            })}
          </View>
        </View>

        {currentStep === 0 && (
          <View
            style={{
              marginHorizontal: 20,
              marginBottom: 30
            }}
          >
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>Escolha o endereço de entrega</Text>

            <Pressable>
              {addresses?.map((item, index) => {
                return (
                  <Pressable
                    key={index}
                    style={{
                      borderWidth: 1,
                      borderColor: '#D0D0D0',
                      padding: 10,
                      gap: 5,
                      paddingBottom: 17,
                      marginVertical: 7,
                      flexDirection: 'row',
                      alignItems: 'center',
                      borderRadius: 6
                    }}
                  >
                    {selectedAddress && selectedAddress.id === item?.id ? (
                      <FontAwesome6 name="dot-circle" size={24} color="#008397" />
                    ) : (
                      <Entypo name="circle" size={24} color="gray" onPress={() => setSelectedAddress(item)} />
                    )}

                    <View
                      style={{
                        marginLeft: 6
                      }}
                    >
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 3
                        }}
                      >
                        <Text style={{fontSize: 15, fontWeight: 'bold'}}>{item?.name}</Text>
                        <Entypo name="location-pin" size={24} color={'red'} />
                      </View>

                      <Text style={{fontSize: 15, color: '#181818'}}>{item?.houseNumber} {item?.landmark}</Text>

                      <Text style={{fontSize: 15, color: '#181818'}}>{item?.street}</Text>

                      <Text style={{fontSize: 15, color: '#181818'}}>Brasil, Pederneiras</Text>

                      <Text style={{fontSize: 15, color: '#181818'}}>Celular {item?.mobileNumber}</Text>
                      <Text style={{fontSize: 15, color: '#181818'}}>CEP: {item?.cep}</Text>

                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 10,
                          marginTop: 7
                        }}
                      >
                        <Pressable
                          style={{
                            backgroundColor: '#F5F5F5',
                            paddingHorizontal: 10,
                            paddingVertical: 6,
                            borderRadius: 5,
                            borderWidth: 0.9,
                            borderColor: '#D0D0D0'
                          }}
                        >
                          <Text>Editar</Text>
                        </Pressable>

                        <Pressable
                          style={{
                            backgroundColor: '#F5F5F5',
                            paddingHorizontal: 10,
                            paddingVertical: 6,
                            borderRadius: 5,
                            borderWidth: 0.9,
                            borderColor: '#D0D0D0'
                          }}
                        >
                          <Text>Excluir</Text>
                        </Pressable>

                        <Pressable
                          style={{
                            backgroundColor: '#F5F5F5',
                            paddingHorizontal: 10,
                            paddingVertical: 6,
                            borderRadius: 5,
                            borderWidth: 0.9,
                            borderColor: '#D0D0D0'
                          }}
                        >
                          <Text>Definir padrão</Text>
                        </Pressable>
                      </View>

                      <View>
                        {selectedAddress && selectedAddress.id === item?.id && (
                          <Pressable
                            onPress={() => setCurrentStep(1)}
                            style={{
                              backgroundColor: '#008397',
                              padding: 10,
                              borderRadius: 20,
                              justifyContent: 'center',
                              alignItems: 'center',
                              marginTop: 10
                            }}
                          >
                            <Text style={{textAlign: 'center', color: 'white'}}>Enviar para esse endereço</Text>
                          </Pressable>
                        )}
                      </View>

                    </View>
                  </Pressable>
                )
              })}
            </Pressable>
          </View>
        )}

        {currentStep === 1 && (
          <View style={{marginHorizontal: 20}}>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Formas de entrega</Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: 'white',
                padding: 8,
                gap: 7,
                borderColor: '#D0D0D0',
                borderWidth: 1,
                marginTop: 10
              }}
            >
              {option ? (
                <FontAwesome6 name="dot-circle" size={24} color="#008397" />
              ) : (
                <Entypo name="circle" size={24} color="gray" onPress={() => setOption(!option)} />
              )}

              <Text style={{flex: 1}}>
                <Text style={{ color: "green", fontWeight: "500" }}>Entrega em até 3 dias úteis</Text>
                <Text> - Entrega grátis</Text>
              </Text>
            </View>

            <Pressable
              onPress={() => setCurrentStep(2)}
              style={{
                backgroundColor: '#FFC72C',
                padding: 10,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 15,
                opacity: option ? 1 : 0.5
              }}
              disabled={!option}
            >
              <Text>Continuar</Text>
            </Pressable>
          </View>
        )}

        {currentStep === 2 && (
          <View
            style={{
              marginHorizontal: 20
            }}
          >
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Escolha o método de pagamento</Text>

            <View
              style={{
                backgroundColor: 'white',
                padding: 8,
                borderColor: '#D0D0D0',
                borderWidth: 1,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 7,
                marginTop: 12
              }}
            >

              {selectedOption === "cash" ? (
                <FontAwesome6 name="dot-circle" size={24} color="#008397" />
              ) : (
                <Entypo name="circle" size={24} color="gray" onPress={() => setSelectedOption("cash")} />
              )}

              <Text>Pagar na entrega</Text>
            </View>

            <View
              style={{
                backgroundColor: 'white',
                padding: 8,
                borderColor: '#D0D0D0',
                borderWidth: 1,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 7,
                marginTop: 12
              }}
            >

              {selectedOption === "card" ? (
                <FontAwesome6 name="dot-circle" size={24} color="#008397" />
              ) : (
                <Entypo name="circle" size={24} color="gray"
                  onPress={() => {
                    setSelectedOption("card")
                  }}
                />
              )}

              <Text>Cartão de crédito</Text>
            </View>

            <Pressable
              onPress={() => setCurrentStep(3)}
              style={{
                backgroundColor: '#FFC72C',
                padding: 10,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 15,
                opacity: selectedOption === "" ? 0.5 : 1
              }}
              disabled={selectedOption === ""}
            >
              <Text>Continuar</Text>
            </Pressable>
          </View>
        )}

        {currentStep === 3 && selectedOption === "cash" && (
          <View
            style={{
              marginHorizontal: 20
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>Finalizar pedido</Text>

            <View
              style={{
                backgroundColor: 'white',
                padding: 8,
                borderColor: '#D0D0D0',
                borderWidth: 1,
                marginTop: 10
              }}
            >
              <Text>Enviando para {selectedAddress?.name}</Text>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 8
                }}
              >
                <Text style={{fontSize: 16, fontWeight: '500', color: 'gray'}}>Itens</Text>

                <Text style={{color: 'gray', fontSize: 16}}>R$ {total}</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 8
                }}
              >
                <Text style={{fontSize: 16, fontWeight: '500', color: 'gray'}}>Entrega</Text>

                <Text style={{color: 'gray', fontSize: 16}}>R$ 0</Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginTop: 8
                }}
              >
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Total</Text>

                <Text style={{fontSize: 17, fontWeight: 'bold'}}>R$ {total}</Text>
              </View>
            </View>

            <View
              style={{
                backgroundColor: 'white',
                padding: 8,
                borderColor: '#D0D0D0',
                borderWidth: 1,
                marginTop: 10
              }}
            >
              <Text style={{fontSize: 16, color: 'gray'}}>Pagamento</Text>

              <Text style={{fontSize: 16, fontWeight: "600", marginTop: 7}}>Pagamento na entrega</Text>
            </View>

            <Pressable
              onPress={handleConfirm}
              style={{
                backgroundColor: '#FFC72C',
                padding: 10,
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 20
              }}
            >
              <Text>Confirmar pedido</Text>
            </Pressable>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

})
