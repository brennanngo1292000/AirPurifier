import React from 'react';
import {useRef, useContext} from 'react';
import StoreApp from '../../Context';
import Block from '../Block';
import {Touchable} from '../Button';
import ActionSheet from './Core/ActionSheet';
import Icon from './Core/Icon';

const Speed = () => {
  const _actionsheet = useRef(undefined);
  const {onSpeed} = useContext(StoreApp);
  const Selection = () => {
    const onPress = (index) => {
      switch (index) {
        case '0':
        case 0:
          return onSpeed(1);
        case '1':
        case 1:
          return onSpeed(2);
        case '2':
        case 2:
          return onSpeed(3);
        default:
          return;
      }
    };
    return (
      <ActionSheet
        ref={_actionsheet}
        title={'Which one speed do you like ?'}
        options={['Low', 'Middle', 'High', 'Cancel']}
        cancelButtonIndex={3}
        destructiveButtonIndex={3}
        onPress={onPress}
      />
    );
  };
  const _onMode = () => _actionsheet.current?.show();
  return (
    <Block middle>
      <Touchable onPress={_onMode}>
        <Icon family={'airpurifier'} name={'speed'} size={100} />
      </Touchable>
      <Selection />
    </Block>
  );
};

export default Speed;
