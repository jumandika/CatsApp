import React, { memo } from 'react';
import PropTypes from 'prop-types';
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
    TouchableNativeFeedback,
    TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


const Touchable = ({
    onPress,
    style,
    disabled,
    children,
    key,
}) => {
    const scaleInAnimated = new Animated.Value(0);
    const scaleOutAnimated = new Animated.Value(0);

    if (Platform.OS == "android") {
        return (
            <View
                key={key}
                style={{ ...style }}
            >
                {onPress ?
                    <TouchableNativeFeedback
                        key={key}
                        hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}
                        useForeground={true}
                        background={TouchableNativeFeedback.Ripple('rgba(0,0,0,0.050)', true)}
                        onPress={onPress}
                        disabled={disabled}
                    >
                        {children}
                    </TouchableNativeFeedback>
                    :
                    <TouchableNativeFeedback
                        key={key}
                        hitSlop={{ top: 20, bottom: 20, left: 50, right: 50 }}
                        useForeground={true}
                        background={TouchableNativeFeedback.Ripple('rgba(0,0,0,0.030)', true)}
                        disabled={disabled}
                    >
                        {children}
                    </TouchableNativeFeedback>

                }
            </View>

        );
    } else {
        return (
            <Animated.View
                key={key}
                style={{ ...style }}
            >
                {onPress ?
                    <TouchableOpacity
                        key={key}
                        onPress={onPress}
                        style={SCALE.getScaleTransformationStyle(scaleOutAnimated)}
                        disabled={disabled}
                    >
                        {children}
                    </TouchableOpacity>
                    :
                    <TouchableOpacity
                        key={key}
                        style={SCALE.getScaleTransformationStyle(scaleOutAnimated)}
                        disabled={disabled}
                    >
                        {children}
                    </TouchableOpacity>
                }
            </Animated.View>

        );

    }
}


Touchable.propTypes = {
    key: PropTypes.any,
    onPress: PropTypes.func,
    onLongPress: PropTypes.func,
    onPressIn: PropTypes.func,
    style: PropTypes.any,
    children: PropTypes.element.isRequired,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});



export default memo(Touchable);