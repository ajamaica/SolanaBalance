import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

interface TextFieldProps {
    placeholder: string;
    onTextChange: Function;
}

export const TextField: React.FC<TextFieldProps> = ({
    placeholder,
    onTextChange,
}) => {
    return (
        <View style={styles.container}>
            <TextInput
                placeholder={placeholder}
                autoCapitalize="none"
                onChangeText={(text) => onTextChange(text)}
                style={styles.textField}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 50,
        borderRadius: 30,
        backgroundColor: '#f1f1f1',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        paddingLeft: 20,
        paddingRight: 10,
    },
    textField: {
        flex: 1,
        height: 50,
        fontSize: 20,
        color: '#000',
    },
});