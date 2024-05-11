import React, {useContext, useState, useEffect} from "react";
import {View, StyleSheet, Text, SafeAreaView, ScrollView, Pressable} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import axios from "axios";
import {AuthContext} from "../contexts/Auth";
import {UserType} from "../contexts/UserContext";
import { Entypo, FontAwesome6 } from '@expo/vector-icons';

export default function ConfirmationScreen(){

  const { server } = useContext(AuthContext)
  const { userId } = useContext(UserType)

  const steps = [
    { title: "Endereço", content: "Address Form" },
    { title: "Entrega", content: "Delivery Options" },
    { title: "Pagamento", content: "Payment Details" },
    { title: "Place Order", content: "Order Summary" },
  ];

  const insets = useSafeAreaInsets()

  const [currentStep, setCurrentStep] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");

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
      <ScrollView
        style={{
          marginTop: 55
        }}
      >
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
              marginHorizontal: 20
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
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

})
