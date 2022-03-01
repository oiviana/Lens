import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container:{
        padding:10
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
    }   
});
export{styles}