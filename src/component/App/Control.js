import React from 'react';
import Block from '../Block';
import Speed from './Speed';
import Power from './Power';
import Mode from './Mode';
import Debug from './Debug';

const Control = () => (
  <Block row space={'around'}>
    <Power />
    <Mode />
    <Speed />
    <Debug />
  </Block>
);

export default Control;
