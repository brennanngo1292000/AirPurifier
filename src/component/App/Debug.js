import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {useContext} from 'react';
import StoreApp from '../../Context';
import {Touchable} from '../Button';
import Icon from './Core/Icon';

function Debug() {
  const {isDebug} = useContext(StoreApp);
  const {navigate} = useNavigation();
  const _onDebug = () => navigate('debug');
  return isDebug ? (
    <Touchable onPress={_onDebug}>
      <Icon family={'airpurifier'} name={'debug'} size={100} />
    </Touchable>
  ) : null;
}
export default Debug;
