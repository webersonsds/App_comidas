
import { useLayoutEffect, useState } from 'react'
import { StyleSheet, Text, View, Pressable, ScrollView, Image, Modal, Share } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Entypo, AntDesign, Feather } from '@expo/vector-icons'

import { VidioView } from '../../components/video'
import { Ingredientes } from '../../components/ingredientes'
import { Instructions } from '../../components/instructions'
import { isFavorite, saveFavorite, removeItem } from '../../utils/storage'


export function Detaill() {
  const route = useRoute()
  const navigation = useNavigation()

  const [showVideo, setShowVideo] = useState(false)
  const [favorite, setFavorite] = useState(false)


  useLayoutEffect(() => {
    async function getStatusFavorites() {
      const receipeFavorite = await isFavorite(route.params?.data)
      setFavorite(receipeFavorite)
    }
    getStatusFavorites()

    navigation.setOptions({
      title: route.params?.data ? route.params?.data.name : 'detalhes da receita',
      headerRight: () => (
        <Pressable onPress={() => handleFavoriteReceipe(route.params?.data)}>
        
          { favorite ? (
            <Entypo 
            name="heart" 
            size={28} 
            color="#ff4141" 
            />
          ):(
            <Entypo
             name="heart-outlined"
              size={28} 
              color="#ff4141"
               />
          )

          }
        </Pressable>
      )
    })
  }, [navigation, route.params?.data, favorite])

 async function handleFavoriteReceipe(receipe){
  if(favorite){
    await removeItem(receipe.id)
    setFavorite(false)
  }else{
    await saveFavorite("@appreceitas",receipe)
    setFavorite(true)
  }
}

  function handleOpenVidio() {
    setShowVideo(true)
  }

  async function sharereceipe() {
    try {
      await Share.share({
        url: "https://sujeitoprgramador.com",
        message: `${route.params?.data.name}`
      })
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 14 }} style={styles.container} showsVerticalScrollIndicator={false}>
      <Pressable onPress={handleOpenVidio}>
        <View style={styles.playicon}>
          <AntDesign name="playcircleo" size={48} color="#fafafa" />
        </View>
        <Image
          source={{ uri: route.params?.data.cover }}
          style={styles.cover}
        />
      </Pressable>

      <View style={styles.headerDeatails}>
        <View>
          <Text style={styles.title}>{route.params?.data.name}</Text>
          <Text style={styles.ingredientesText}> ingredientes ({route.params?.data.total_ingredients})</Text>
        </View>
        <Pressable onPress={sharereceipe}>
          <Feather name="share-2" size={24} color="#121212" />
        </Pressable>
      </View>


      {route.params?.data.ingredients.map((item) => (
        <Ingredientes key={item.id} data={item} />
      ))}

      <View style={styles.intructonsArea}>
        <Text style={styles.intructionsText}>Modo de preparo</Text>
        <Feather
          name='arrow-down'
          size={24}
          color="#fff"
        />
      </View>

      {route.params?.data.instructions.map((item, index) => (
        <Instructions key={item.id} data={item} index={index} />
      ))}

      <Modal visible={showVideo} animationType='slide'>
        <VidioView
          handleClose={() => setShowVideo(false)}
          videoUrl={route.params?.data.video}
        />
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f9ff',
    paddingTop: 14,
    paddingEnd: 14,
    paddingStart: 14
  },
  cover: {
    height: 200,
    borderRadius: 14,
    width: '100%'
  },
  playicon: {
    position: 'absolute',
    zIndex: 9,
    top: 0, left: 0, right: 0, bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'

  },
  title: {
    fontSize: 18,
    marginTop: 14,
    fontWeight: 'bold',
    color: "#000",
    marginTop: 4
  },
  ingredientesText: {
    marginBottom: 4,
    fontSize: 16,
  },
  headerDeatails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  intructonsArea: {
    backgroundColor: '#4cbe6c',
    flexDirection: 'row',
    padding: 8,
    borderRadius: 4,
    marginBottom: 14,
  },
  intructionsText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
    marginRight: 8,
  }



});
