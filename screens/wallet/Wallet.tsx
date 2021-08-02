import React, { useState } from "react";
import { FlatList, View, StyleSheet, Text } from "react-native";
import { TextField } from "../../components/TextField";
import { ApplicationState, getTokens as getWalletTokens } from "../../redux";
import { useSelector, useDispatch } from "react-redux";
import { TokenListItem } from "../../components/TokenListItem";

export default function Wallet() {
    const [address, setAddress] = useState('');

    const dispatch = useDispatch()
    const { tokens, error } = useSelector((state: ApplicationState) => state.walletReducer);
    const { solana } = useSelector((state: ApplicationState) => state.solanaReducer);

    const onAddressChange = (text: string) => {
        setAddress(text);
        dispatch(getWalletTokens(text, solana))
    };

    return (
        <View style={styles.container}>
            <View>
                <TextField
                    onTextChange={onAddressChange}
                    placeholder="SOL Address"
                />
                <Text style={styles.errorText}>{error}</Text>
            </View>
            <FlatList
                keyExtractor={item => item.mint}
                data={tokens}
                renderItem={({ item }) => <TokenListItem walletToken={item} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    errorText: {
        marginLeft: 30,
        color: 'red',
    },
    container: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
    },
});