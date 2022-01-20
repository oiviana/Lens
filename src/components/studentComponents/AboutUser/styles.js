import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection: 'row',
        width:'100%',
        backgroundColor: 'transparent',
        padding:12
    },
    profileImage:{
        width:110,
        height:110,
        borderRadius:60,
        borderWidth:1,
        borderColor:'#c5c5c7'    
    },
    userContent:{
        display:'flex',
        flex:1,
        marginLeft: 15
    },
    userName:{
        fontSize:22,
        fontWeight:'500',
        paddingBottom:6
    },
    userCourse:{
        fontSize:14,
        fontWeight:'700',
        paddingBottom:3
    },
    userUniversity:{
        fontSize:16,
        paddingBottom:3
    },
    userLocationGrid:{
        display:'flex',
        flexDirection: 'row',
    },
    userLocationText:{
        color:'#7a7979',
        fontSize:14,
        paddingTop:3,
        paddingLeft:16
    }    
});
export{styles}