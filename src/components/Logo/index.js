
import { View,Text,StyleSheet } from "react-native";


export function Logo(){
    return(
        <View style={styles.logoArea}>
            <Text style={styles.logo}>Receita fácil</Text>
        </View>
    )
}

const styles = StyleSheet.create({
logoArea:{
    backgroundColor:'#4cbe6c',
     alignSelf: "flex-start",
     padding:8,
     paddingLeft:16,
     paddingRight:20,
     borderTopRightRadius:8,
     borderBottomLeftRadius:8,
     borderTopRightRadius:8,
     borderBottomRightRadius:32,
     marginTop:10,
},
logo:{
    fontSize:18,
    fontWeight:"bold",
    color:'#fff'
}
})