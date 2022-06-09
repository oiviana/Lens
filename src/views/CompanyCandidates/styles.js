import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container:{
        display:'flex',
        width:'100%',
        backgroundColor: 'transparent',
        padding:12
    },
    inputSearch:{
        backgroundColor:'white',
        width:340,
        padding:12,
        alignSelf:'center',
        borderRadius:4,
        marginTop:15,
        color:'#000',
        marginBottom:14
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
        padding:2,
        paddingBottom:12,
        paddingTop:8,
    },

    vacancyDate:{
        padding:2
    }
});
export{styles}