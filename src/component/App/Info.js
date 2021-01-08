import React from 'react';
import { useContext } from 'react';
import { ImageBackground } from 'react-native';
import StoreApp from '../../Context';
import Block from '../Block';
import { wp } from '../ReponsiveScreen';
import Text from '../Text';

function getSpeedShow(value) {
    switch(value){
        case 1:
        case '1':
            return 'Tốc độ 1';
        case 2:
        case '2':
            return 'Tốc độ 2';
        case 3:
        case '3':
            return 'Tốc độ 3';
        default:
            return 'Tốc độ -';
    }
}

function getModeShow(value) {
    switch(value){
        case 1:
        case '1':
            return 'Chế độ manual';
        case 2:
        case '2':
            return 'Chế độ auto';
        default:
            return 'Chế độ _ ';
    }
}
function getPMShow(type, value) {
    if(value != null && value != undefined)  return `${type} : ${value} μg/m3`;
    else return `${type} : _ μg/m3`
}

function Info() {
    const {mode, speed,  pm25, pm100, pm10} = useContext(StoreApp)
    return (
        <ImageBackground
            source={require('../../assets/image/info.png')}
            resizeMode={"contain"}
            style={{ width: wp(70), height: wp(70) }}>
            <Block flex center middle>
                <Text p color={'white'}>
                    {getSpeedShow(speed['speed'])}
                </Text>
                <Text p color={'white'}>
                   {getModeShow(mode['mode'])}
                </Text>
                <Text p color={'white'}>
                   {getPMShow('PM2.5', pm25['pm2.5'])}
                </Text> 
                {/* <Text p color={'white'}>
                   {getPMShow('PM1.0', pm10['pm1.0'])}
                </Text> 
                <Text p color={'white'}>
                   {getPMShow('PM100', pm100['pm100'])}
                </Text> */}
            </Block>
        </ImageBackground>
    )
}

export default Info;