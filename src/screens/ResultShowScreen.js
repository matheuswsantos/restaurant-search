import React, { useState, useEffect } from 'react';
import { ScrollView, Text, StyleSheet, FlatList, Image } from 'react-native';
import yelp from '../api/yelp'

import {
    map as _map,
    join as _join
 } from 'lodash';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        marginLeft: 15,
    },

    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    images: {
        height: 125,
        marginBottom: 10,
    },

    image: {
        width: 250,
        height: 125,
        marginRight: 5,
    },
});

export default ({ navigation }) => {
    const [result, setResult] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const id = navigation.getParam('id');

    const getResult = async id => {
        try {
            const { data } = await yelp.get(`/${id}`);

            setResult(data);

        } catch (error) {
            setErrorMessage('Something went wrong')
        }
    };

    const getCategories = () => {
        return _join(_map(result.categories, 'title'), ', ');
    };

    useEffect(() => {
        getResult(id);
    }, []);

    if (errorMessage) {
        return <Text>{errorMessage}</Text>;
    }

    return (
        <ScrollView style={styles.container}>
            <FlatList
                style={styles.images}
                horizontal
                showsHorizontalScrollIndicator={false}
                data={result.photos}
                keyExtractor={photo => photo}
                renderItem={({ item }) => {
                    return (
                        <Image
                            style={styles.image}
                            source={{
                                uri: item,
                            }}
                        />
                    )
                }}
            />

            <Text style={styles.title}>
                {result.name}
            </Text>

            <Text>
                {result.rating} Stars, {result.review_count} Reviews
            </Text>

            <Text>
                {result.price} . {getCategories()}
            </Text>
        </ScrollView>
    );
};
