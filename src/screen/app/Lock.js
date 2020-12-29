import React from 'react'
import Layout from '../../component/App/Core/Layout';
import Icon from '../../component/App/Core/Icon';
import { Touchable } from '../../component/Button';
import { colors } from '../../theme';
import Block from '../../component/Block';
import Text from '../../component/Text'
import { wp } from '../../component/ReponsiveScreen';

function Lock({ navigation: { navigate } }) {

    function unlock() {
        return navigate('control')
    }

    function openSetting() {
        return navigate('setting')
    }

    return (
        <Layout >
            <Touchable onPress={openSetting} style={{ position: 'absolute', top: 0, right: 0, zIndex: 999 }}>
                <Icon family={'airpurifier'} name={'setting'} size={100} />
            </Touchable>
            <Block middle center style={{ position: 'absolute', bottom: 0, margin: 10, zIndex: 999 }}>
                <Touchable onPress={unlock}>
                    <Icon family={'airpurifier'} name={'lock'} size={100} />
                </Touchable>
                <Text color={colors.text2} center>Tab to open</Text>
            </Block>
            <Block flex center middle space={'between'} >
                <Block flex={2} center middle >
                    <Text center color={colors.text2} bold>
                        Brennan
                    </Text>
                    <Text center color={colors.text1} bold h2>
                        Air Purifier
                    </Text>
                </Block>
                <Block flex={5} center middle >
                    <Icon family={'airpurifier'} name={'airpurifier'} size={wp(80)} />
                </Block>
            </Block>

        </Layout>
    );
}
export default Lock;
