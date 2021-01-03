import * as React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import StoreApp from '../../Context';
import { log } from '../../lib/debug';
import { colors } from '../../theme';
import Block from '../Block';
import { Touchable } from '../Button';
import Carousel from '../SnapCarousel';
import Text from '../Text';

class Control extends React.Component {
    static contextType = StoreApp;
    constructor(props) {
        super(props);
        this.state = {
            activeIndex: 0,
            carouselItems: [
                {
                    icon: 'mode',
                    label: 'Mode',
                    value: 1,
                },
                {
                    icon: 'speed',
                    label: 'Speed',
                    value: 0,
                }
            ]
        }
    }
    

    render() {
        let {onMode, onSpeed} = this.context;
        function _renderItem({ item: { icon, label, value }, index }) {
            return (
                <Block height={150} style={{ borderRadius: 5, marginLeft: 10, marginRight: 5, borderColor: '#424750', borderWidth: 1 }}>
                    <LinearGradient colors={colors.gradientBackground} style={{ flex: 1 }} >
                        <Text color={colors.text2} style={{ margin: 10 }}>
                            {label}
                        </Text>
                        <Block>
                           {
                               value == 0?
                                    (
                                        <Block middle>
                                            <Touchable style={{padding:5}} onPress={()=>onSpeed(1)}>
                                                <Text color={'white'}>
                                                    Tốc độ 1
                                                </Text>
                                            </Touchable>
                                            <Touchable  style={{padding:5}} onPress={()=>onSpeed(2)}> 
                                                <Text  color={'white'}>
                                                    Tốc độ 2
                                                </Text>
                                            </Touchable>
                                            <Touchable  style={{padding:5}} onPress={()=>onSpeed(3)}>
                                                <Text  color={'white'}>
                                                    Tốc độ 3
                                                </Text>
                                            </Touchable>
                                        </Block>
                                    )
                                : (
                                        <Block middle>
                                            <Touchable  style={{padding:5}} onPress={()=>onMode(0)}>
                                                <Text color={'white'}>
                                                    Chế độ auto
                                                </Text>
                                            </Touchable>
                                            <Touchable  style={{padding:5}} onPress={()=>onMode(1)}>
                                                <Text color={'white'}>
                                                   Chế độ manual
                                                </Text>
                                            </Touchable>
                                        </Block>
                                   )  
                           }
                        </Block>
                    </LinearGradient>
                </Block>
            )
        }
        return (
            <Block row center style={{ marginBottom: 10 }}>
                <Carousel
                    layout={"default"}
                    ref={ref => this.carousel = ref}
                    data={this.state.carouselItems}
                    sliderWidth={200}
                    itemWidth={300}
                    renderItem={_renderItem}
                    onSnapToItem={index => this.setState({ activeIndex: index })}
                />
            </Block>
        );
    }
}

export default Control;