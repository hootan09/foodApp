import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack, useLocalSearchParams } from 'expo-router';
import { title } from 'process';

const foodItemDetails = () => {
    // const {id} = useLocalSearchParams();
    const food = useLocalSearchParams();
    const keyValuesfood = Object.entries(food);
    keyValuesfood.shift()
    keyValuesfood.shift();

  return (
    <>
    <Stack.Screen options={{
        title: food.Category?.toString(),
    }} />
    <ScrollView style={styles.container}>
        {keyValuesfood.map(item => (
                <View style={styles.row}>
                    <Text style={styles.field}>{item[0]}:</Text>
                    <Text style={styles.value}>{item[1]}</Text>
                </View>
        ))}

    </ScrollView>
    </>
  )
}

export default foodItemDetails

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    row:{
        marginTop: 5,
        flexDirection: 'row',
        alignContent: 'center',
        paddingHorizontal: 16,
        paddingVertical: 5,
        marginRight: 5,
        borderBottomWidth: StyleSheet.hairlineWidth
    },
    field:{
        fontSize:16,
        lineHeight: 14,
        fontWeight: '700',
        paddingVertical: 3,
    },
    value:{
        fontSize:14,
        lineHeight: 12,
        fontWeight: '400',
        paddingVertical: 3,
        marginLeft: 4,
        flexWrap: 'wrap',
        flexShrink: 1,
    },
})