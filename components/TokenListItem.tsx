import React from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, Linking } from 'react-native';
import { WalletToken } from '../type';
import { qrCodeURL } from '../utils/AppConst';


export const TokenListItem = (props: { walletToken: WalletToken }) => {
    const _onPressButton = () => {
        Linking.openURL(qrCodeURL(props.walletToken.pubkey)).catch((err) => console.error('An error occurred', err));
    };
    return (
        <TouchableHighlight onPress={_onPressButton} underlayColor="white">
            <View style={styles.listItem}>
                <Image source={{ uri: props.walletToken.logoURI }} width={60} height={60} style={styles.iconImage} />
                <View style={styles.descriptionContainer}>
                    <Text style={styles.nameText} numberOfLines={1} ellipsizeMode='middle' >{props.walletToken?.name ?? props.walletToken.mint}</Text>
                    <Text>{props.walletToken.lamports} {props.walletToken.symbol}</Text>
                </View>
            </View>
        </TouchableHighlight>
    )
}

const styles = StyleSheet.create({
    iconImage: {
        width: 60,
        height: 60,
        marginLeft: 10,
        borderRadius: 30,
        backgroundColor: '#f1f1f1'
    },
    descriptionContainer: {
        alignItems: "flex-start",
        flex: 1,
        marginLeft: 20
    },
    nameText: {
        fontWeight: "bold"
    },
    listItem: {
        margin: 15,
        padding: 10,
        backgroundColor: "#FFF",
        width: "100%",
        flex: 1,
        alignSelf: "center",
        flexDirection: "row",
        borderRadius: 5
    },
});