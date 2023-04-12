
import React, { useState, useEffect } from 'react';

import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useRoute } from '@react-navigation/native'
import api from '../../services/api'
import { Foodlist } from '../../components/foodlist';

export function Search() {
  const route = useRoute()
  const [receipes, setReceipes] = useState([])

  useEffect(() => {
    async function fetchReceipes() {
      const response = await api.get(`/foods?name_like=${route.params?.name}`)
      setReceipes(response.data)
    }
    fetchReceipes() 
  }, [route.params?.name])


  return (
    <View style={styles.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ marginTop: 14 }}
        data={receipes}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <Foodlist data={item} />}
        ListEmptyComponent={ () => <Text style={styles.text}>Não encontramos o que esta buscando...</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f9ff',
    paddingStart: 14,
    paddingEnd: 14,
    paddingTop: 14
  },
  text:{
    fontSize:16
  }
});
