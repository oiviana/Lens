import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#5155b4'
    
    },
    containerLogo:{
        backgroundColor:'#5155b4',
        flex:1,
        width:'100%',
        alignItems:'center',
        justifyContent:'center'
    },
    logo:{
        width:120,
        height:120,
        borderRadius:10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

    },
    titleLogo:{
        fontSize:25,
        color:'white',
        fontWeight:'500',
        padding:20
    },
    containerForm:{
        backgroundColor:'#f3f3fc',
        flex:1.35,
        width:'100%',
        alignItems:'center',
        paddingTop:50,
        borderTopLeftRadius:60,
        borderTopRightRadius:60
    },
    containerFormModal:{
        width:'100%',
        alignItems:'center',
        justifyContent:'space-between',
        paddingTop:60
      
    },
    input:{
        borderBottomWidth:1.5,
        borderBottomColor:'#7a81de',
        width:325,
        padding:5,
        marginBottom:52
    },
    loginButton:{
        backgroundColor:'#5155b4',
        padding:18,
        borderRadius:6,
        width:325,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:20,
        shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 6,
},
shadowOpacity: 0.37,
shadowRadius: 7.49,

elevation: 12,
    },
    loginButtonCompany:{
        backgroundColor:'#5155b4',
        marginTop:40,
        padding:18,
        borderRadius:6,
        width:325,
        alignItems:'center',
        justifyContent:'center',
        shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 6,
},
shadowOpacity: 0.37,
shadowRadius: 7.49,

elevation: 12,
    },
    textButton:{
        color:'white',
        fontSize:18  
    },
    helloText:{
        fontSize:18,
        marginBottom:30
    },
    helloTextModal:{
        marginTop:0,
        fontSize:18,
        marginBottom:30
    },
    signUpButton:{
        marginBottom:65 
    },
    companyButton:{
        alignSelf:'flex-end',
        padding:10,
        flexDirection:'row'
    },
    companyLink:{
        fontSize:14,
        marginLeft:5,
        marginRight:20,
        fontWeight:'700'
    }
});
export{styles}