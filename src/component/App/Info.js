import React from 'react';
import {useContext} from 'react';
import StoreApp from '../../Context';
import Block from '../Block';
import {wp} from '../ReponsiveScreen';
import Text from '../Text';
import Pulse from '../Pulse';
import {colors} from '../../theme';
import LinearGradient from 'react-native-linear-gradient';

function getSpeedShow(value) {
  switch (value) {
    case 1:
    case '1':
      return 'Speed: Low';
    case 2:
    case '2':
      return 'Speed: Middle';
    case 3:
    case '3':
      return 'Speed: High';
    default:
      return 'Speed:  --';
  }
}

function getModeShow(value) {
  switch (value) {
    case 1:
    case '1':
      return 'Mode: Manual';
    case 2:
    case '2':
      return 'Mode: Auto';
    default:
      return 'Mode: --';
  }
}
function getPMShow(type, value) {
  if (value != null && value != undefined && value != '')
    return `${type} : ${value} μg/m3`;
  else return `${type} : -- μg/m3`;
}
function getSpeedViewer(value) {
  switch (value) {
    case 1:
    case '1':
      return {
        numPulses: 1,
        diameter: 500,
        speed: 10,
        duration: 3000,
      };
    case 2:
    case '2':
      return {
        numPulses: 2,
        diameter: 500,
        speed: 20,
        duration: 2000,
      };
    case 3:
    case '3':
      return {
        numPulses: 3,
        diameter: 500,
        speed: 30,
        duration: 1000,
      };
    default:
      return {
        numPulses: 0,
        diameter: 0,
        speed: 0,
        duration: 0,
      };
  }
}

function Info() {
  const {mode, speed, pm25, power} = useContext(StoreApp);
  return (
    <Block flex middle width={'100%'}>
      <>
        {speed['speed'] > 0 ||
          (power['power'] && (
            <Pulse
              color={colors.foregory}
              {...getSpeedViewer(speed['speed'])}
            />
          ))}
        <LinearGradient
          colors={colors.gradientBackground}
          style={{width: wp(50), height: wp(50), borderRadius: wp(50) / 2}}>
          {!power['power'] ? (
            <Block flex center middle>
              <Text p color={colors.text2} size={40}>
                OFF
              </Text>
            </Block>
          ) : (
            <Block flex center middle>
              <Text p color={colors.text2}>
                {getSpeedShow(speed['speed'])}
              </Text>
              <Text p color={colors.text2}>
                {getModeShow(mode['mode'])}
              </Text>
              <Text p color={colors.text2}>
                {getPMShow('PM2.5', pm25['pm2.5'])}
              </Text>
            </Block>
          )}
        </LinearGradient>
      </>
    </Block>
  );
}

export default Info;
