import Metrics from './metrics';


const size = {
    font6: Metrics.screenWidth * (6 / 365),
    font8: Metrics.screenWidth * (8 / 365),
    font10: Metrics.screenWidth * (10 / 365),
    font11: Metrics.screenWidth * (11 / 365),
    font12: Metrics.screenWidth * (12 / 365),
    font13: Metrics.screenWidth * (13 / 365),
    font14: Metrics.screenWidth * (14 / 365),
    font15: Metrics.screenWidth * (15 / 365),
    font16: Metrics.screenWidth * (16 / 365),
    font17: Metrics.screenWidth * (17 / 365),
    font18: Metrics.screenWidth * (18 / 365),
    font20: Metrics.screenWidth * (20 / 365),
    font22: Metrics.screenWidth * (22 / 365),
    font24: Metrics.screenWidth * (24 / 365),
};

const type = {
    poppinsLight: 'Poppins-Light',
    poppinsThin: 'Poppins-Thin',
    poppinsRegular: 'Poppins-Regular',
    poppinsMedium: 'Poppins-Medium',
    poppinsSemiBold: 'Poppins-SemiBold',
    poppinsBold: 'Poppins-Bold',
    amiriRegular: 'Amiri-Regular',
};

export default {
    size,
    type,
};