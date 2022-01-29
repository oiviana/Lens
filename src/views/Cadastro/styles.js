import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container:{
        width:'100%',
        alignItems:'center',
        marginTop:30

    },
    input:{
        borderBottomWidth:1.5,
        borderBottomColor:'#7a81de',
        width:325,
        padding:5,
        marginBottom:40
    },
    buttonContainer:{

    }, 
    sigInButton:{
        backgroundColor:'#5155b4',
        padding:18,
        borderRadius:6,
        width:325,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:20,
        shadowColor: "#000",
    },
    textButton:{
        color:'white',
        fontSize:18  
    }
});
export{styles}