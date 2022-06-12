import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container:{
        display:'flex',
        width:'100%',
        backgroundColor: 'transparent',
        padding:12
    },

    content:{
    display:'flex',
    flexDirection:'row',
    marginBottom:25,
    marginTop:20,
    
    },

    vacancyContent:{
        display:'flex',
        flexDirection:'column',
     
        width:'100%'
    },
    vacancyTitle:{
        fontSize:17,
        fontWeight:'700',
        padding:2
    },
    vacancyCompany:{
        fontSize:16,
        padding:2,
        width:'90%'
    },
    vacancyDate:{
        padding:2
    }
});
export{styles}