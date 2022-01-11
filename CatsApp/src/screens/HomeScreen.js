import React, { Component, memo } from 'react'

import fonts from '../theme/fonts';
import colors from '../theme/colors';
import metrics from '../theme/metrics';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TextInput,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import CatsList from '../components/organisms/CatsList';


class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textSearch: '',
        }
    }



    render() {
        return (
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    <TextInput
                        style={styles.textInputStyle}
                        blurOnSubmit={true}
                        onChangeText={text => this.setState({ textSearch: text })}
                        value={this.state.textSearch}
                        placeholder="Search your cats!"
                        placeholderTextColor="#CCC"
                    />
                    {this.state.textSearch.length < 3 && this.state.textSearch.length != 0 &&
                        <Text style={styles.titleStyle}>
                            *minimal 3 karakter
                    </Text>
                    }
                </View >


                <CatsList
                    textSearch={this.state.textSearch}
                    navigation={this.props.navigation}
                />

            </View >
        )
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    titleStyle: {
        fontFamily: fonts.type.poppinsLight,
        fontSize: fonts.size.font10,
        color: 'red',
    },
    headerContainer: {
        padding: 20,
        paddingBottom: 10,
        paddingTop: 40,
        elevation: 10,
        // borderWidth:1,
        backgroundColor:'#FFFFFF',
    },
    row: {
        flexDirection: 'row',
    },
    textInputStyle: {
        height: 40,
        width: metrics.screenWidth - 40,
        borderColor: '#CCC',
        borderWidth: 1,
        color: '#000',
        fontFamily: fonts.type.poppinsRegular,
        borderRadius: 10,
        paddingHorizontal: 20,
    }

})




export default memo(HomeScreen);