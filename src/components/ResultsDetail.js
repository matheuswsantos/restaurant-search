import React, { Component } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        marginLeft: 15,
    },

    image: {
        width: 250,
        height: 125,
        borderRadius: 4,
        marginBottom: 5,
    },

    name: {
        fontWeight: 'bold',
    },
});

export default ({ result }) => {
    return (
        <View style={styles.container}>
            <Image
                style={styles.image}
                source={{
                    uri: result.image_url,
                }}
            />

            <Text style={styles.name}>
                {result.name}
            </Text>

            <Text>
                {result.rating} Stars, {result.review_count}
            </Text>
        </View>
    );
};
