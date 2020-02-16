import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import ResultsDetail from '../components/ResultsDetail';

const styles = StyleSheet.create({
    container: {
        marginBottom: 10,
    },

    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 15,
        marginBottom: 10,
    },
});

export default withNavigation(({ title, results, navigation }) => {
    if (! results.length) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{title} ({results.length})</Text>

            <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={results}
                keyExtractor={result => result.id}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity
                            onPress={
                                () => navigation.navigate('ResultShow', {
                                    id: item.id
                                })
                            }
                        >
                            <ResultsDetail result={item} />
                        </TouchableOpacity>
                    )
                }}
            />
        </View>
    )
});
