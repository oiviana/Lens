import { React } from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import Vacancies from '../../components/vacanciesComponents/Vacancies';

export default function Vagas() {
    return(
        <ScrollView>
            <Vacancies/>
        </ScrollView>

    );
}