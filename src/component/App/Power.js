import React from 'react';
import {useContext} from 'react';
import {has} from 'underscore';
import StoreApp from '../../Context';
import {Touchable} from '../Button';
import Icon from './Core/Icon';

function Power() {
  const {power, onPower} = useContext(StoreApp);
  const _onPower = () => {
    if (has(power, 'power') && power['power'] == 1) onPower(0);
    else onPower(1);
  };
  return (
    <Touchable onPress={_onPower}>
      <Icon family={'airpurifier'} name={'power'} size={100} />
    </Touchable>
  );
}
export default Power;
