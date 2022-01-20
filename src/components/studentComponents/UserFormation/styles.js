import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container:{
        display:'flex',
        width:'100%',
        backgroundColor: 'transparent',
        padding:12
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
    marginBottom:10,
    marginTop:10
    },
    institutionImage:{
        width:80,
        height:80,
        borderRadius:8,
        borderWidth:1,
        borderColor:'#c5c5c7', 
        marginLeft:5,
        marginRight: 20  
    },
    formationContent:{
        display:'flex',
        flexDirection:'column'
    },
    formationInstitution:{
        fontSize:17,
        fontWeight:'700',
        padding:2
    },
    formationStatus:{
        fontSize:16,
        padding:2
    },
    formationYear:{
        padding:2
    }
});
export{styles}