import React from 'react'
import { useContext } from 'react';
import Layout from '../../component/App/Core/Layout';
import Text from '../../component/Text';
import StoreApp from '../../Context';


function Menu() {
    const {debugData} = useContext(StoreApp)
    return (
        <Layout scroll>
            <Text>
                {debugData}
            </Text>
        </Layout>
    );
}
export default Menu;
