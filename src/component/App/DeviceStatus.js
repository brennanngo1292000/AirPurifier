import React from 'react'
import { useContext } from 'react';
import { has, isString } from 'underscore';
import StoreApp from '../../Context';
import { colors } from '../../theme';
import Block from '../Block';
import Text from '../Text';

function getPowerShow (power) {
    if(has(power, 'power') && power['power'] == 1) return 'ON';
    return 'OFF'
}
function getStatusShow (lwt) {
    if(isString(lwt) && lwt.toLowerCase() == 'online') return 'online';
    return 'offline'
}

function DeviceStatus () {
    const {  power,  lwt} = useContext(StoreApp);
        return (
            <Block middle center style={{ marginLeft: 20 }}>
                <Text center color={colors.text1}>
                    {getPowerShow(power)}
                </Text>
                <Text center color={colors.text2}>
                    Currently: {getStatusShow(lwt)}
                </Text>
           </Block>
        )
}
export default DeviceStatus;