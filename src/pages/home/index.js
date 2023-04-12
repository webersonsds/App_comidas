
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Logo } from '../../components/Logo';
import { Foodlist } from '../../components/foodlist';

import { Ionicons } from '@expo/vector-icons'
import api from '../../services/api'
import {useNavigation} from '@react-navigation/native'

import { Text as motiText } from 'moti';

export function Home() {
  const [inputValue, setInputValue] = useState("")
  const [foods, setFoods] = useState([])

  const navigation = useNavigation()

  useEffect(() => {
    async function fetchApi() {
      const response = await api.get("/foods")
      setFoods(response.data)
    }
    fetchApi()
  }, [])

  function handleSeacrch() {
   if(!inputValue) return
   let input = inputValue;
   setInputValue("")
   navigation.navigate("Search", {name:input})
  }

  return (
    <SafeAreaView style={styles.container}>
      <Logo />
      <Text style={styles.title}> Encontre a receita</Text>
      <Text style={styles.title}> que combine com você</Text>

      <View style={styles.form}>
        <TextInput
          placeholder='Digite o nome da comida...'
          style={styles.input}
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
        />
        <TouchableOpacity onPress={handleSeacrch}>
          <Ionicons name="search" color="#4cbe6c" size={28} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={foods }
        keyExtractor={(item)=>  String(item.id) }
        renderItem={({item})=> <Foodlist data={item}/> }
       showsVerticalScrollIndicator={false}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f9ff',
    paddingTop: 36,
    paddingStart: 14,
    paddingEnd: 14,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0e0e0e'
  },
  form: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ececec',
    paddingLeft: 8,
    paddingRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'

  },
  input: {
    width: '90%',
    maxWidth: '90%',
    height: 54,
  }
});
