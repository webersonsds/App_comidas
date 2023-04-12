

import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getFavorites(key){
const favorites = await AsyncStorage.getItem(key)
return JSON.parse(favorites) || []
}

export async function saveFavorite(key, newItem){
    let myFovorites = await getFavorites(key)

    let hasItem = myFovorites.some(item =>  item.id === newItem.id)

    if(hasItem){
        console.log('ESSE ITEM JÁ ESTA SOLVO NA LISTA')
        return
    }
    myFovorites.push(newItem)

    await AsyncStorage.setItem(key, JSON.stringify(myFovorites))
    console.log("SALVO COM SUCESSO")
}

export async function removeItem(id){
    let receipes = await getFavorites("@appreceitas")

    let myFovorites= receipes.filter(item => {
        return (item.id !== id)
    })
    await AsyncStorage.setItem("@appreceitas",JSON.stringify(myFovorites) )
    console.log("ITEM DELETADO COM SUCESSO")
    return myFovorites
}

export async function isFavorite(receipe){
    let myReceipes = await getFavorites("@appreceitas")

    const favorite = myReceipes.find(item => item.id === receipe.id)
    if(favorite){
        return true
    }
    return false
}
