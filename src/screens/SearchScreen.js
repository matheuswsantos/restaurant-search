import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SearchBar from '../components/SearchBar';
import yelp from '../api/yelp';

const SearchScreen = () => {
    const [term, setTerm] = useState('');
    const [results, setResults] = useState([]);
    const [errorMessage , setErrorMessage] = useState('');

    const searchFromApi = async () => {
        try {
            const { data } = await yelp.get('/asdsearch', {
                params: {
                    limit: 50,
                    term,
                    location: 'NYC',
                },
            });

            setResults(data.businesses)
        } catch (error) {
            setErrorMessage('Something went wrong');
        }
    };

    return (
        <View>
            <SearchBar
                term={term}
                onChangeTerm={setTerm}
                onSubmit={searchFromApi}
            />

            { errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null }
        </View>
    );
};

const styles = StyleSheet.create({
    errorMessage: {
        fontSize: 18,
        color: 'red',
    },
});

export default SearchScreen;
