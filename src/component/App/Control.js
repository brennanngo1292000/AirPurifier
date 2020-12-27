import * as React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../theme';
import Block from '../Block';
import Carousel from '../SnapCarousel';
import Text from '../Text';


// tele/92/air_purifier/LWT
// msg: Online/ Offline
// stat/92/air_purifier/power
// msg: 
// Bật máy: {"power": 1, "by": "...."}
// Tắt máy: {"power": 0, "by": "...."}

// stat/92/air_purifier/mode
// msg: 
// Manual: {"mode": 1, "by": "...."}
// Auto: {"mode": 0, "by": "...."}

// stat/92/air_purifier/speed
// Msg: 
// Tốc độ 1: {"speed": 1, "by": "...."}
// Tốc độ 2: {"speed": 2, "by": "...."}
// Tốc độ 3: {"speed": 3, "by": "...."}

// stat/92/air_purifier/pm2.5
// {"pm2.5": 1, "time": time_unix}

// stat/92/air_purifier/pm1.0
// {"pm1.0": 1, "time": time_unix}

// stat/92/air_purifier/pm100
// {"pm100": 1, "time": time_unix}

// cmnd/.../..../power
// cmnd/.../.../mode
// cmnd/..../..../speed
// Msg giống như trên,  trường "by": "ap_co"

class Control extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            carouselItems: [
                {
                    icon: 'speed',
                    label: 'Speed',
                    value: 0,
                },
                {
                    icon: 'mode',
                    label: 'Mode',
                    value: 1,
                }
            ]
        }
    }

    _renderItem({ item: { icon, label }, index }) {
        return (
            <Block height={150} style={{ borderRadius: 5, marginLeft: 10, marginRight: 5, borderColor: '#424750', borderWidth: 1 }}>
                <LinearGradient colors={colors.gradientBackground} style={{ flex: 1 }} >
                    <Text color={colors.text1} style={{ margin: 10 }}>
                        {label}
                    </Text>
                </LinearGradient>
            </Block>
        )
    }

    render() {
        return (
            <Block row center style={{ marginBottom: 10 }}>
                <Carousel
                    layout={"default"}
                    ref={ref => this.carousel = ref}
                    data={this.state.carouselItems}
                    sliderWidth={200}
                    itemWidth={300}
                    renderItem={this._renderItem}
                    onSnapToItem={index => this.setState({ activeIndex: index })}
                />
            </Block>
        );
    }
}

export default Control;