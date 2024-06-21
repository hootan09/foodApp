// @ts-nocheck

import { StyleSheet, Text, View, StatusBar, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SQLiteProvider, useSQLiteContext } from 'expo-sqlite';
import { Link } from 'expo-router';

const foodList = () => {
    const db = useSQLiteContext();
    const [version, setVersion] = useState('');
    const [foodsList, setFoodsList] = useState(null);

    useEffect(() => {
        const setup = async () => {
            const result = await db.getFirstAsync<{ 'sqlite_version()': string }>(
                'SELECT sqlite_version()'
            );
            setVersion(result['sqlite_version()']);

            // const foods = await db.getAllAsync<any>('SELECT * FROM Food');
            // const foods = await db.getAllAsync<any>('SELECT Id,Category,Description FROM Food LIMIT 500');
            const foods = await db.getAllAsync<any>("SELECT * FROM Food WHERE Category Like 'cucumber' LIMIT 500");
            // const foods = await db.getAllAsync<any>("SELECT * FROM Food ORDER BY Water DESC LIMIT 500");
            // const foods = await db.getAllAsync<any>('SELECT * FROM Food LIMIT 500');
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
                        <Link href={{pathname:`/foodItemDetails/${food.Id}`, params: food}} asChild>
                            <TouchableOpacity style={styles.foodItemContainer} key={index}>
                                <Text>{`${food.Id} - ${food.Category} >> ${food.Description}`}</Text>
                            </TouchableOpacity>
                        </Link>
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