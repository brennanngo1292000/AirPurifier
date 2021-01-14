import React from 'react'
import Layout from '../../component/App/Core/Layout';
import { colors } from '../../theme';
import Block from '../../component/Block';
import Text from '../../component/Text';
import LinearGradient from 'react-native-linear-gradient';
import Info from '../../component/App/Info';
import Control from '../../component/App/Control';
import DeviceStatus from '../../component/App/DeviceStatus';

function Lock({navigation:{navigate}}) {
    return (
        <Layout>
            <Block middle width={'100%'} height={100} style={{ position: 'absolute', top: 0, zIndex: 999 }} >
                <Text center color={colors.text2} bold small>
                   MẪN THỊ THANH HOA
                </Text>
                <Text center color={colors.text1} bold p>
                    Air Purifier
                </Text>
            </Block>
            <Block flex style={{ marginTop: 80, borderTopLeftRadius: 20, borderTopRightRadius: 20, overflow: 'hidden', borderColor: '#65AEE3', borderWidth: 1 }}>
                <LinearGradient colors={colors.gradientBackground} style={{ flex: 1 }} >
                    <Block backgroundColor={'#0F7189'} center width={80} height={5} style={{ position: 'absolute', top: 10, borderRadius: 10}} />
                    <Block row space={'between'} width={'100%'} style={{paddingTop:20}} >
                        <DeviceStatus />
                    </Block>
                    <Block flex >
                        <Info />
                    </Block>
                    <Control />
                </LinearGradient>
            </Block>
        </Layout>
    );
}
export default Lock;
