import React from 'react';
import {useContext} from 'react';
import StoreApp from '../../Context';
import Block from '../Block';
import Text from '../Text';

function DeviceStatus() {
  const {lwt} = useContext(StoreApp);
  return (
    !lwt && (
      <Block flex row middle center space={'between'} style={{padding: 10}}>
        <Block>
          <Text></Text>
        </Block>
        <Text center color={'red'}>
          OFFLINE
        </Text>
      </Block>
    )
  );
}
export default DeviceStatus;
