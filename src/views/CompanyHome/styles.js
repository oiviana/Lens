import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:85,
        flex:1,
        backgroundColor: '#E6E7FF',
        alignItems:'center',
        padding:70
       
    },
    welcomeRow:{
        flexDirection:'row',
        marginTop:170,
    
        alignSelf:'center'
    },
    logo:{
        width:100,
        height:100,
        borderRadius:8
    },
    welcomeTxt:{
        fontSize:32,
        fontWeight:'bold',
        color:'#6b46bd',
        marginLeft:8
    }, 
    txt:{
        fontSize:12,
        fontWeight:'bold',
        

    }, 
});
export{styles}