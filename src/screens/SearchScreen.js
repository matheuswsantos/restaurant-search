import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import SearchBar from '../components/SearchBar';
import useResults from '../hooks/useResults';
import ResultsList from '../components/ResultsList';

const SearchScreen = () => {
    const [term, setTerm] = useState('');
    const [
        searchFromApi,
        results,
        errorMessage,
    ] = useResults(term);

    const resultsByPrice = (price) => {
        return results.filter(result => result.price === price);
    };

    return (
        <View>
            <SearchBar
                term={term}
                onChangeTerm={setTerm}
                onSubmit={searchFromApi}
            />

            { errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null }

            <ScrollView>
                <ResultsList
                    title="Cost Effective"
                    results={resultsByPrice('$')}
                />

                <ResultsList
                    title="Bit Pricier"
                    results={resultsByPrice('$$')}
                />

                <ResultsList
                    title="Big Spender"
                    results={resultsByPrice('$$$')}
                />
            </ScrollView>
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
