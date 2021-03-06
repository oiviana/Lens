import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container:{
        padding:10,
        paddingBottom:10
              
    },
    headerVaga:{
        flexDirection:'row'
    },
    companyImage:{
        width:100,
        height:100,
        borderRadius:8,
        borderWidth:1,
        borderColor:'#c5c5c7', 
        marginLeft:5,
        marginRight: 20  
    },
    vacancyTitle:{
        fontSize:20,
        fontWeight:'bold',
        marginTop: 30       
    },
    dadosVaga:{
        padding:8
    },
    dadoVaga:{
        fontSize:15,
        paddingBottom:3,
        paddingTop:3
    },
    title:{
        fontSize:23,
        fontWeight:'600',
        padding:5,
        marginTop:4
    },
    descriptionContent:{
        textAlign:'justify',
        padding:5,
        marginBottom:10
    }   ,
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