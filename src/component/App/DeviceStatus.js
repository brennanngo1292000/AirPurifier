import React from 'react';
import {useContext} from 'react';
import {isString} from 'underscore';
import StoreApp from '../../Context';
import Block from '../Block';
import Text from '../Text';

function getStatusShow(lwt) {
  if (isString(lwt) && lwt.toLowerCase() == 'online') return '';
  return 'OFFLINE';
}

function DeviceStatus() {
  const {lwt} = useContext(StoreApp);
  return (
    <Block flex row middle center space={'between'} style={{padding: 10}}>
      <Block>
        <Text></Text>
      </Block>
      <Text center color={'red'}>
        {getStatusShow(lwt)}
      </Text>
    </Block>
  );
}
export default DeviceStatus;
