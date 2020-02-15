import { useState, useEffect } from 'react';
import yelp from '../api/yelp';

export default (term) => {
    const [results, setResults] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    const searchFromApi = async () => {
        try {
            const { data } = await yelp.get('/search', {
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

    useEffect(() => {
        searchFromApi();
    }, []);

    return [
        searchFromApi,
        results,
        errorMessage,
    ];
}
