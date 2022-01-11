import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ApiService from '../../config/ApiService';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    Dimensions,
    Animated,
    Pressable,
    Platform,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import Touchable from '../molecules/Touchable';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import metrics from '../../theme/metrics';

import { NativeModules } from 'react-native';
const { StatusBarManager } = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT + 1.5;

const CatsList = ({
    textSearch,
    navigation,
}) => {

    const [pages, setPages] = useState(1)
    const [limit, setLimit] = useState(10)
    const [catList, setCatList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isLoadMore, setIsLoadMore] = useState(true)
    const [isRefreshing, setIsRefreshing] = useState(false)

    const [isCollapse, setIsCollapse] = useState(false)
    const [indexSelected, setIndexSelected] = useState(null)
    const [hasScrolled, setHasScrolled] = useState(false)

    const collapse = (item, index) => {
        // console.log('COLLAPSE')
        if (index == indexSelected) {
            setIsCollapse(!isCollapse)
        } else {
            setIndexSelected(index)
        }

    }

    useEffect(() => {
        getCatList(pages, limit)

    }, [])

    useEffect(() => {
        if (textSearch.length >= 3) {
            setIsLoadMore(false)
            searchCatList()
        } else if (textSearch.length == 0) {
            setPages(1)
            setCatList([])
            setIsLoadMore(true)
            setIsLoading(true)
            getCatList(1, limit)
        } else {
            setCatList([])
            setIsLoading(true)
        }
    }, [textSearch])

    const getCatList = async (pages, limit) => {
        try {
            const request = await fetch(ApiService.Endpoint.urlApi + '?attach_breed=1&page=' + pages + '&limit=' + limit,
                {
                    method: 'GET',
                    headers: {
                    }
                });
            const response = await request.json();
            // console.log('pages', pages, response)
            if (response.length > 0) {
                setCatList([...catList, ...response])
                setIsLoading(false)
                setIsRefreshing(false)
            } else {
                // setCatList([])
                setIsRefreshing(false)
                setIsLoadMore(false)
                setIsLoading(false)


            }
        } catch (err) {
            console.error(err)
        }
    }

    const searchCatList = async () => {
        setIsLoading(true);
        try {
            const request = await fetch(ApiService.Endpoint.urlApiSearch + textSearch,
                {
                    method: 'GET',

                });
            const response = await request.json();
            // console.log('search', response)
            if (response.length > 0) {
                setCatList(response)
                setIsLoadMore(false)
                setIsLoading(false)
            } else {
                setIsLoadMore(false)
                setIsLoading(false)


            }
        } catch (err) {
            console.error(err)
        }
    }



    const rating = (number) => {
        let star = []
        for (var i = 1; i <= 5; i++) {
            let name = 'star';
            if (i > number) {
                name = 'staro'
            }
            star.push(
                <AntDesign name={name} style={{ fontSize: fonts.size.font14, color: '#ffd375', marginLeft: 5 }} />
            )
        }
        return (
            <View style={styles.rowStyle}>
                {star}
            </View>
        );
    }

    const renderItem = ({ item, index }) => {
        let flag = item.country_code.toLowerCase();
        let urlFlag = 'https://flagcdn.com/32x24/' + flag + '.png';
        return (
            <Touchable
                style={styles.touchableStyle}
                onPress={() => collapse(item, index)}
                children={
                    <View key={item.id} style={styles.childrenStyle}>
                        <Ionicons
                            name="image-outline"
                            style={styles.preLoadImage}
                        />
                        <ImageBackground key={item.image?.id} source={{ uri: item.image?.url }} style={[styles.imageBackgroundStyle, {}]} >
                            <LinearGradient
                                start={{ x: 0, y: 0 }}
                                end={{ x: 0, y: 1 }}
                                colors={['rgba(0,0,0,0.0)', 'rgba(0,0,0,0.8)']}
                                style={styles.linearGradientStyle}
                            />
                            <Text style={[styles.nameStyle, { paddingLeft: 20, }]}>{item.name}</Text>
                            {item.alt_names !== '' &&
                                <Text style={[styles.subNameStyle, { paddingLeft: 20, fontFamily: fonts.type.poppinsThin, top: -8 }]}>{item?.alt_names}</Text>
                            }
                            <View style={[styles.rowStyle, { paddingLeft: 20, }]}>
                                <Image source={{ uri: urlFlag }} style={{ marginRight: 5, height: 8, width: 15 }} />
                                <Text style={styles.subNameStyle}>{item.origin}</Text>
                            </View>
                            <MaterialCommunityIcons name={isCollapse && indexSelected == index ? 'arrow-collapse-up' : 'arrow-collapse-down'} style={{ alignSelf: 'center', marginBottom: 20, fontSize: fonts.size.font24, color: colors.white }} />
                            {
                                isCollapse && indexSelected == index &&
                                <View key={item.id} style={{ paddingHorizontal: 20, backgroundColor: '#FFF' }} >
                                    <View style={[styles.descContainer, { alignItems: 'center', }]}>
                                        <Text style={[styles.subNameStyle, { fontFamily: fonts.type.poppinsLight, color: colors.darkGrey }]}>{'Adaptability  '}</Text>
                                        {rating(item.adaptability)}
                                    </View>
                                    <View style={[styles.descContainer, { alignItems: 'center', }]}>
                                        <Text style={[styles.subNameStyle, { fontFamily: fonts.type.poppinsLight, color: colors.darkGrey }]}>{'Child Friendly  '}</Text>
                                        {rating(item.child_friendly)}
                                    </View>
                                    <View style={[styles.descContainer, { alignItems: 'center', }]}>
                                        <Text style={[styles.subNameStyle, { fontFamily: fonts.type.poppinsLight, color: colors.darkGrey }]}>{'Dog Friendly  '}</Text>
                                        {rating(item.dog_friendly)}
                                    </View>
                                    <View style={[styles.descContainer, { alignItems: 'center', }]}>
                                        <Text style={[styles.subNameStyle, { fontFamily: fonts.type.poppinsLight, color: colors.darkGrey }]}>{'Grooming  '}</Text>
                                        {rating(item.grooming)}
                                    </View>
                                    <View style={[styles.descContainer, { alignItems: 'center', }]}>
                                        <Text style={[styles.subNameStyle, { fontFamily: fonts.type.poppinsLight, color: colors.darkGrey }]}>{'Energy Level  '}</Text>
                                        {rating(item.energy_level)}
                                    </View>
                                    <View style={[styles.descContainer, { alignItems: 'center', }]}>
                                        <Text style={[styles.subNameStyle, { fontFamily: fonts.type.poppinsLight, color: colors.darkGrey }]}>{'Social Needs  '}</Text>
                                        {rating(item.social_needs)}
                                    </View>
                                    <View style={styles.descContainer}>
                                        <Text style={[styles.subNameStyle, { fontFamily: fonts.type.poppinsLight, color: colors.darkGrey }]}>{'Description  '}</Text>
                                        <Text style={[styles.subNameStyle, { flex: 1, textAlign: 'justify', color: '#000000' }]}>{item.description}</Text>
                                    </View>
                                    <View style={styles.descContainer}>
                                        <Text style={[styles.subNameStyle, { fontFamily: fonts.type.poppinsLight, color: colors.darkGrey }]}>{'Life Span  '}</Text>
                                        <Text style={[styles.subNameStyle, { color: '#000000' }]}>{item.life_span} Years</Text>
                                    </View>
                                    <View style={styles.descContainer}>
                                        <Text style={[styles.subNameStyle, { fontFamily: fonts.type.poppinsLight, color: colors.darkGrey }]}>{'Temperament  '}</Text>
                                        <Text style={[styles.subNameStyle, { flex: 1, textAlign: 'right', color: '#000000' }]}>{item.temperament}</Text>
                                    </View>
                                    <View style={styles.descContainer}>
                                        <Text style={[styles.subNameStyle, { fontFamily: fonts.type.poppinsLight, color: colors.darkGrey }]}>{'Weight  '}</Text>
                                        <View>
                                            <View style={{ flexDirection: 'row', }}>
                                                <Text style={[styles.subNameStyle, { color: colors.grey }]}>{'      Imperial  '}</Text>
                                                <Text style={[styles.subNameStyle, { color: '#000000' }]}>{item.weight.imperial} Kg</Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', }}>
                                                <Text style={[styles.subNameStyle, { color: colors.grey }]}>{'      Metric  '}</Text>
                                                <Text style={[styles.subNameStyle, { color: '#000000' }]}>{item.weight.metric} Kg</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            }
                        </ImageBackground>

                    </View>

                }
            />
        );

    }


    const ListFooterComponent = () => {
        return (
            isLoadMore ?
                <ActivityIndicator style={{ flex: 0.5, marginTop: 20 }} size={'large'} color={colors.darkGrey} />
                :
                <Text style={[styles.subNameStyle, { alignSelf: 'center', paddingVertical: 20, color: '#000000' }]}>{"You're in the end of the list"}</Text>

        );
    }

    const onScroll = () => {
        setHasScrolled(true);
    }
    const handleLoadMore = () => {
        if (!hasScrolled || !isLoadMore) { return null; }
        // console.log('handleLoadMore')
        setPages(pages + 1)
        getCatList(pages + 1, limit);

    }

    const onRefresh = () => {
        setIsRefreshing(true);
        setIsLoading(true);
        setIsLoadMore(true);
        setIsCollapse(false);
        setPages(1);
        getCatList(pages, limit);

    }

    return (
        <View style={styles.container}>
            { isLoading ?
                <ActivityIndicator style={{ flex: 0.5 }} size={'large'} color={colors.darkGrey} />
                :
                <FlatList
                    onRefresh={onRefresh}
                    refreshing={isRefreshing}
                    bounces={false}
                    decelerationRate='fast'
                    pagingEnabled={true}
                    keyExtractor={(item, index) => { return item.id }}
                    data={catList}
                    renderItem={(item, index) => renderItem(item, index)}
                    onEndReached={handleLoadMore}
                    snapToInterval={metrics.screenHeight + STATUSBAR_HEIGHT}
                    onEndThreshold={0}
                    onScroll={onScroll}
                    // contentContainerStyle={{ paddingTop:20 }}
                    removeClippedSubviews={true}
                    scrollEventThrottle={0.0}
                    windowSize={1}
                    initialNumToRender={10}
                    maxToRenderPerBatch={10}
                    ListFooterComponent={ListFooterComponent}
                />
            }


        </View>
    );

}


PropTypes.string,
    CatsList.propTypes = {
        navigation: PropTypes.any,
    };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEE'
    },
    touchableStyle: {
        overflow: 'hidden',
        width: metrics.screenWidth,
        height: metrics.screenHeight + STATUSBAR_HEIGHT,
        // marginTop: 10,
        // borderRadius: 12,
        // elevation: 20,
        // borderWidth: 0.8,
        // borderColor: '#EEE',
        // backgroundColor: '#FFF',

    },
    childrenStyle: {
        flex: 1,
    },
    rowStyle: {
        flexDirection: 'row',
        // justifyContent: 'space-between',
        alignItems: 'center',

    },
    nameStyle: {
        fontFamily: fonts.type.poppinsRegular,
        fontSize: fonts.size.font24,
        color: colors.white,
    },
    descStyle: {
        fontFamily: fonts.type.poppinsBold,
        fontSize: fonts.size.font12,
        color: '#000',
    },
    subNameStyle: {
        fontFamily: fonts.type.poppinsRegular,
        fontSize: fonts.size.font12,
        color: colors.white,
    },
    linearGradientStyle: {
        position: 'absolute',
        bottom: 0,
        width: metrics.screenWidth,
        height: '70%',
    },
    imageBackgroundStyle: {
        width: metrics.screenWidth,
        height: metrics.screenHeight + STATUSBAR_HEIGHT,
        // height: metrics.screenHeight,
        width: 'auto',
        justifyContent: 'flex-end',
    },
    descContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#EEE',
    },
    preLoadImage: {
        marginTop: 50,
        fontSize: 120,
        position: 'absolute',
        alignSelf: 'center',
        color: 'rgba(0,0,0,0.25)',
    }


});



export default memo(CatsList);