import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container:{
        display:'flex',
        width:'100%',
        backgroundColor: 'transparent',
        padding:12
    },
    vacancyModal:{
        justifyContent:'center',
        alignItems:'center'
    },

    vacancyButton:{
        flexDirection:'row',
        paddingBottom:10,
        paddingTop:15,
        paddingLeft:10
    },
    title:{
        fontSize:22,
        fontWeight:'600',
        padding:5,
        marginBottom:12
    },
    content:{
    display:'flex',
    flexDirection:'row',  
    padding:20,
    },
    vacancyContent:{
     width:'100%',
       
    },
    vacancyCompany:{
    fontSize:18
    },
    vacancyTitle:{
        fontSize:20,
        fontWeight:'700',
        padding:3,
        paddingBottom:8
    },

    vacancyDate:{
        padding:5,
        fontSize:16
    },
    vacancyStatus:{
        backgroundColor:'#198c38',
        padding:8,
        borderRadius:4,
        marginLeft:5,
        width:'25%'      
    },
    statustext:{
        fontSize:18,
        fontWeight:'bold',
        color:'#fff',
        alignSelf:'center'

    },

    vacancyStatusI:{
        backgroundColor:'#c21313',
        padding:8,
        borderRadius:4,
        marginLeft:5,
        width:'25%'   
        
    },
    modalTitle:{
        fontSize:22,
        fontWeight:'bold',
        padding:15

    },
    nameLabel:{
        alignSelf:'flex-start',
        paddingLeft:40,
        fontSize:19,
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
    },
    inputdescription:{
        borderWidth:1.3,
        borderColor: '#b3b5b5',
        width:310,
        padding:5,
        marginBottom:40,
        fontSize:18,
        alignSelf:'center',
        borderRadius:3
    },
    pickerContainer:{
        width:320,
        marginBottom:40,
    },
    addresButton:{
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
    },
    
});
export{styles}