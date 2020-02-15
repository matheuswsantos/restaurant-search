import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const SearchBar = ({ term, onChangeTerm, onSubmit }) => {
    return (
        <View style={styles.content}>
            <Feather
                name="search"
                style={styles.icon}
            />

            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                style={styles.input}
                placeholder="Search"
                value={term}
                onChangeText={onChangeTerm}
                onEndEditing={onSubmit}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    content: {
        marginTop: 10,
        backgroundColor: '#F0EEEE',
        height: 50,
        borderRadius: 5,
        marginHorizontal: 15,
        flexDirection: 'row',
    },

    input: {
        flex: 1,
    },

    icon: {
        fontSize: 40,
        alignSelf: 'center',
        marginHorizontal: 10,
    },
});

export default SearchBar;

