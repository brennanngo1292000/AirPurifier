import React from 'react'
import { useContext } from 'react';
import Layout from '../../component/App/Core/Layout';
import Text from '../../component/Text';
import StoreApp from '../../Context';
import { colors } from '../../theme';


function Menu() {
    const {debugData} = useContext(StoreApp)
    return (
        <Layout scroll>
            <Text color={colors.text1}>
                {debugData}
            </Text>
        </Layout>
    );
}
export default Menu;
