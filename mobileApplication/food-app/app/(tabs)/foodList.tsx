// @ts-nocheck

import { StyleSheet, Text, View, StatusBar, ActivityIndicator, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as SQLite from 'expo-sqlite';
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';

const foodList = () => {
    const db = useSQLiteContext();
    const [version, setVersion] = useState('');
    const [foodsList, setFoodsList] = useState(null);

    useEffect(() => {
        const setup = async()=> {
            const result = await db.getFirstAsync<{ 'sqlite_version()': string }>(
                'SELECT sqlite_version()'
            );
            setVersion(result['sqlite_version()']);

            const foods = await db.getAllAsync<any>('SELECT * FROM Food');
            setFoodsList(foods);
        }

        setup();
    }, []);
    return (
        <View style={styles.container}>
            <Text style={styles.sqliteText}>SQLite version: {version}</Text>
            {!foodsList ?
                <ActivityIndicator size={'large'} />
                :

                <ScrollView>
                    {foodsList && foodsList.map((food, index) => (
                        <View style={styles.foodItemContainer} key={index}>
                            <Text>{`${food.Id} - ${food.Category} >> ${food.Description}`}</Text>
                        </View>
                    ))}
                </ScrollView>
            }
        </View>
    );
}

export default foodList

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight
    },
    sqliteText: {
        fontSize: 14,
        lineHeight: 12,
        paddingVertical: 10,
    },
})