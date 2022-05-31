import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        
    },
    editImgContainer:{
        alignItems:'center',
        padding:10
    },
    imgEdit:{
        width: 120,
        height: 120,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#c5c5c7'
    },
    updateImgText:{
        fontWeight:'bold',
        color:'#1f163b'
    },
    nameContainer:{
        alignItems:'center',
        marginTop:30
    },
    nameLabel:{
        alignSelf:'flex-start',
        paddingLeft:40,
        fontSize:20,
        fontWeight:'700',
        paddingBottom:5

    },
    inputname:{
        borderBottomWidth:1.5,
        borderBottomColor: '#5f5f63',
        width:310,
        padding:5,
        marginBottom:40,
        fontSize:18
    },
    inputdescription:{
        borderWidth:1.3,
        borderColor: '#b3b5b5',
        width:335,
        padding:5,
        marginBottom:50,
        marginTop:20,
        fontSize:18,
        alignSelf:'center',
        borderRadius:3
    },
    pickerContainer:{
        width:320,
        marginBottom:30,
    },
    buttonAdress:{
        flexDirection:'row',
        paddingTop:30,
        paddingBottom:30
    },
    addresModal:{
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        paddingTop:25
    },
    addresModalLabel:{
        alignSelf:'flex-start',
        fontSize:18,
        fontWeight:'700',
        paddingBottom:5

    },
    addresRow:{
        flexDirection:'row',
        width:'80%',
        justifyContent:'space-between',
 
    },
    inputrow:{
        borderBottomWidth:1.5,
        borderBottomColor: '#5f5f63',
        padding:5,
        marginBottom:40,
        fontSize:18
    },
    fieldSet:{
        width:'30%'
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
    formationContainers:{
        paddingTop:25,

    },
    formationButton:{
        paddingTop:20,
        paddingLeft:30
    },

    content: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 10,
        marginTop: 10
    },
    institutionImage: {
        width: 80,
        height: 80,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#c5c5c7',
        marginLeft: 5,
        marginRight: 20
    },
    
    formationContent: {
        display: 'flex',
        flexDirection: 'column'
    },
    formationInstitution: {
        fontSize: 17,
        fontWeight: '700',
        padding: 2
    },
    formationStatus: {
        fontSize: 16,
        padding: 2
    },
    formationYear: {
        padding: 2
    },
    addformationButton:{
        flexDirection:'row',
        paddingTop:10
    },
    dateRow:{
        flexDirection:'row'
    }
});
export { styles }