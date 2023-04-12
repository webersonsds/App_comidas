
import { LinearGradient } from 'expo-linear-gradient'
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

import { useNavigation } from '@react-navigation/native';

export function Foodlist({ data }) {

    const navigation = useNavigation()

    function handleNavigate() {
        navigation.navigate("Detaill", {data: data} )
    }

    return (
        <TouchableOpacity activeOpacity={0.8} style={styles.container} onPress={handleNavigate}>
            <Image
                style={styles.cover}
                source={{ uri: data.cover }}
            />


            <View style={styles.info}>

                <Text style={styles.name}>{data.name}</Text>
                <Text style={styles.description}> {data.total_ingredients} ingredientes | {data.time} min</Text>
            </View>

            <LinearGradient
                style={styles.gradiente}
                colors={['transparent', 'rgba(0,0,0, 0.70)', 'rgba(0,0,0, 0.95)']}
            />


        </TouchableOpacity>


    )
}



const styles = StyleSheet.create({
    container: {
        marginBottom: 14,
    },
    cover: {
        width: '100%',
        height: 200,
        borderRadius: 14,
    },
    info: {
        position: 'absolute',
        bottom: 14,
        left: 14,
        zIndex: 99,
    },
    name: {
        fontSize: 18,
        color: "#fff",
        fontWeight: 'bold'
    },
    description: {
        color: '#fff'
    },
    gradiente: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: '55%',
        borderRadius: 14,
        zIndex: 1,
        backgroundColor: 'transparent',

    }

})