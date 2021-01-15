import React from 'react';
import {useRef, useContext} from 'react';
import StoreApp from '../../Context';
import Block from '../Block';
import {Touchable} from '../Button';
import ActionSheet from './Core/ActionSheet';
import Icon from './Core/Icon';

const Mode = () => {
  const _action = useRef(undefined);
  const {onMode, lwt, power} = useContext(StoreApp);
  const Selection = () => {
    const onPress = (index) => {
      switch (index) {
        case 0:
        case '0':
          return onMode(0);
        case 1:
        case '1':
          return onMode(1);
        default:
          return;
      }
    };
    return (
      <ActionSheet
        ref={_action}
        title={'Which one mode do you like ?'}
        options={['Auto', 'Manual', 'Cancel']}
        cancelButtonIndex={2}
        destructiveButtonIndex={2}
        onPress={onPress}
      />
    );
  };
  const _onMode = () => _action.current?.show();
  return (
    <Block middle>
      <Touchable onPress={_onMode}>
        <Icon family={'airpurifier'} name={'mode'} size={100} />
      </Touchable>
      <Selection />
    </Block>
  );
};

export default Mode;
