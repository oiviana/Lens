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
        borderRadius: 60,
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
        fontSize: 14,
        fontWeight: '700',
        paddingBottom: 3
    },
    userUniversity: {
        fontSize: 16,
        paddingBottom: 3
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
        padding: 12,
        minHeight:180
    },
    title: {
        fontSize: 23,
        fontWeight: '600',
        padding: 5
    },
    descriptionContent: {
        textAlign: 'justify',
        padding: 5,
        marginBottom: 10
    },

    containerFormations: {
        display: 'flex',
        width: '100%',
        backgroundColor: 'transparent',
        padding: 12,
        minHeight:230
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
    contentAtividades:{
        width:'87%'
    },
    atividadetitle: {
        fontSize: 18,
        fontWeight: '700',
        padding: 2,
        paddingBottom:8
    },
    atividadeContent: {
        fontSize: 16,
        padding: 2,
        paddingBottom:12
    },
});
export { styles }