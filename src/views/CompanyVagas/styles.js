import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container:{
        display:'flex',
        width:'100%',
        backgroundColor: 'transparent',
        padding:12
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
        
    }
    
});
export{styles}