import React from 'react';
import { ImageBackground } from 'react-native';
import Block from '../Block';
import { wp } from '../ReponsiveScreen';
import Text from '../Text';

function Info() {
    return (
        <ImageBackground
            source={require('../../assets/image/info.png')}
            resizeMode={"contain"}
            style={{ width: wp(80), height: wp(80) }}>
            <Block flex center middle>
                <Text h5 color={'white'}>
                    HELLO
                </Text>
            </Block>
        </ImageBackground>
    )
}

export default Info;