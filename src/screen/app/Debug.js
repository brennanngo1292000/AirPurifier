import React from 'react';
import {useContext} from 'react';
import Layout from '../../component/App/Core/Layout';
import Block from '../../component/Block';
import Text from '../../component/Text';
import StoreApp from '../../Context';
import {colors} from '../../theme';

function Menu() {
  const {debugData} = useContext(StoreApp);
  return (
    <Layout scroll>
      <Block style={{padding: 10}}>
        <Text center h5 color={colors.text1} >DEBUG</Text>
        <Text color={colors.text1}>{debugData}</Text>
      </Block>
    </Layout>
  );
}
export default Menu;
