import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#E6E7FF',
    },
    containerAboutUser: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        backgroundColor: 'transparent',
        padding: 12
    },
    profileImage: {
        width: 110,
        height: 110,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#c5c5c7'
    },
    userContent: {
        display: 'flex',
        flex: 1,
        marginLeft: 15
    },
    userName: {
        fontSize: 22,
        fontWeight: '500',
        paddingBottom: 6
    },
    userCourse: {
        fontSize: 16,
        fontWeight: '700',
        paddingBottom: 3
    },
    companyActing: {
        fontSize: 16,
        paddingBottom: 8,
        marginTop:5
    },
    userLocationGrid: {
        display: 'flex',
        flexDirection: 'row',
    },
    userLocationText: {
        color: '#7a7979',
        fontSize: 14,
        paddingTop: 3,
        paddingLeft: 16
    },

    containerDescription: {
        display: 'flex',
        width: '100%',
        backgroundColor: 'transparent',
        padding: 12
    },
    title: {
        fontSize: 23,
        fontWeight: '600',
        padding: 5
    },
    descriptionContent: {
        textAlign: 'justify',
        padding: 5,
        marginBottom: 10,
        fontSize: 16,
        color: '#000',
        lineHeight:25
    },

    containerFormations: {
        display: 'flex',
        width: '100%',
        backgroundColor: 'transparent',
        padding: 12
    },
    title: {
        fontSize: 22,
        fontWeight: '600',
        padding: 5,
        marginBottom: 12
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
    websiteContainer:{
        padding:12,
        paddingBottom:25
    },
    websiteText:{
        fontSize: 17,
        color:'#432d80',
        paddingLeft:8,
        paddingTop:3,
        fontWeight:'bold'
    },
    atuacaoText:{
        color:'#000',
        fontSize: 17,
        paddingLeft:8,
        paddingTop:3,
    
    }
});
export { styles }