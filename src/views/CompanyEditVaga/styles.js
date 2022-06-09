import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container:{
        
              
    },
    containerScroll:{
        padding:10,
        paddingBottom:10,
        
    },

    nameLabel:{
        alignSelf:'flex-start',
        paddingLeft:30,
        fontSize:20,
        fontWeight:'700',
        paddingBottom:5

    },
    inputname:{
        borderBottomWidth:1.5,
        borderBottomColor: '#5f5f63',
        width:310,
        padding:5,
        marginBottom:40,
        fontSize:18,
        alignSelf:'center',
    },
    inputdescription:{
        borderWidth:1.3,
        borderColor: '#b3b5b5',
        width:325,
        padding:5,
        marginBottom:40,
        fontSize:18,
        alignSelf:'center',
        borderRadius:3
    },
    pickerContainer:{
        width:320,
        alignSelf:'center',
        marginBottom:20,
    },
    buttonCands:{
        flexDirection:'row',
        paddingTop:30,
        paddingBottom:30
    },


    candidaturaButton:{
        alignSelf:'center',
        backgroundColor:'#79ed98',
        marginTop:40,
        padding:15,
        borderRadius:3,
        width:300,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:40
    },
    textButton:{
        color:'white',
        fontSize:18  
    },
    candidatoButton:{
        alignSelf:'center',
        backgroundColor:'#c2b4fa',
        marginTop:40,
        padding:15,
        borderRadius:3,
        width:300,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:40

    },
});
export{styles}