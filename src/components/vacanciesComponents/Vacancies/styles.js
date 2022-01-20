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
    companyImage:{
        width:80,
        height:80,
        borderRadius:8,
        borderWidth:1,
        borderColor:'#c5c5c7', 
        marginLeft:5,
        marginRight: 20  
    },
    vacancyContent:{
        display:'flex',
        flexDirection:'column'
    },
    vacancyTitle:{
        fontSize:17,
        fontWeight:'700',
        padding:2
    },
    vacancyCompany:{
        fontSize:16,
        padding:2
    },
    vacancyDate:{
        padding:2
    }
});
export{styles}