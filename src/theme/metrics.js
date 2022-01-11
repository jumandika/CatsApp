
import { Dimensions } from "react-native"

const { width, height } = Dimensions.get('window');
const  screenWidth = Dimensions.get('window').width;
const  screenHeight  = Dimensions.get('window').height;

const metrics = {
    screenWidth: width < height ? width : height,
    screenHeight: width < height ? height : width,
    // screenWidth: screenWidth,
    // screenHeight: screenHeight,

}

export default metrics;