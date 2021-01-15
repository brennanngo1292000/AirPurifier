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
    case 0:
    case '0':
      return 'Mode: Auto';
    case 1:
    case '1':
      return 'Mode: Manual';
    default:
      return 'Mode: --';
  }
}
function getPMShow(type, value) {
  if (value != null && value != undefined && value != '')
    return `${type} : ${value} μg/m3`;
  else return `${type} : -- μg/m3`;
}

function Info() {
  const {mode, speed, pm25, power} = useContext(StoreApp);
  return (
    <Block flex middle width={'100%'}>
      {power == 1 && speed != 0 && (
        <Pulse
          color={colors.foregory}
          numPulses={3}
          diameter={400}
          speed={20*Number(speed)}
          duration={2000}
        />
      )}
      <LinearGradient
        colors={colors.gradientBackground}
        style={{width: wp(50), height: wp(50), borderRadius: wp(50) / 2}}>
        {power == 1 ? (
          <Block flex center middle>
            <Text p color={colors.text2}>
              {getSpeedShow(speed)}
            </Text>
            <Text p color={colors.text2}>
              {getModeShow(mode)}
            </Text>
            <Text p color={colors.text2}>
              {getPMShow('PM2.5', pm25)}
            </Text>
          </Block>
        ) : (
          <Block flex center middle>
            <Text p color={colors.text2} size={40}>
              OFF
            </Text>
          </Block>
        )}
      </LinearGradient>
    </Block>
  );
}

export default Info;
