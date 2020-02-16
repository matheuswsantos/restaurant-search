import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, FlatList, Image, View } from 'react-native';
import yelp from '../api/yelp'

import {
    map as _map,
    join as _join,
    isEmpty as _isEmpty,
    truncate as _truncate
 } from 'lodash';
import moment from 'moment';

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

    openingTimeWrap: {
        marginTop: 20,
    },

    openingTimeContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    openingTimeDayOfWeek: {
        width: 80,
        fontWeight: 'bold',
    },

    openingTimeHours: {
        alignSelf: 'flex-start',
        flexGrow: 1,
    },

    openingTimeIsOpen: {
        fontWeight: 'bold',
        marginRight: 20,
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

    const getDayOfWeek = (item) => {
        return moment().isoWeekday(item.day).format('dddd');
    };

    const getOpenTime = (item) => {
        const start = moment(item.start, 'HHmm').format('HH:mm a');
        const end = moment(item.end, 'HHmm').format('HH:mm a');

        return `${start} - ${end}`;
    };

    const isOpenNow = (item) => {
        const isToday = moment().weekday() === item.day;

        if (! isToday) {
            return null;
        }

        return result.hours[0].is_open_now
            ? 'Open'
            : 'Closed';
    };

    useEffect(() => {
        getResult(id);
    }, []);

    if (errorMessage) {
        return <Text>{errorMessage}</Text>;
    }

    if (_isEmpty(result)) {
        return null;
    }

    return (
        <View style={styles.container}>
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

            <FlatList
                style={styles.openingTimeWrap}
                data={result.hours[0].open}
                keyExtractor={(item, index) => index}
                renderItem={({ item }) => {
                    return (
                        <View style={styles.openingTimeContent}>
                            <Text style={styles.openingTimeDayOfWeek}>
                                {getDayOfWeek(item)}
                            </Text>

                            <Text style={styles.openingTimeHours}>
                                {getOpenTime(item)}
                            </Text>

                            <Text style={styles.openingTimeIsOpen}>
                                {isOpenNow(item)}
                            </Text>
                        </View>
                    );
                }}
            />
        </View>
    );
};
