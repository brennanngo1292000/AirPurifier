import React from 'react'
import Layout from '../../component/App/Core/Layout';
import Icon from '../../component/App/Core/Icon';
import { Touchable } from '../../component/Button';
import { colors } from '../../theme';
import Block from '../../component/Block';
import Text from '../../component/Text';
import LinearGradient from 'react-native-linear-gradient';
import Info from '../../component/App/Info';
import Control from '../../component/App/Control';

function Lock() {
    return (
        <Layout>
            <Block row space={'between'} width={'100%'} style={{ position: 'absolute', top: 0, zIndex: 999 }} >
                <Touchable>
                    <Icon family={'airpurifier'} name={'menu'} size={100} />
                </Touchable>
                <Block center middle >
                    <Text center color={colors.text2} bold small>
                        Brennan
                    </Text>
                    <Text center color={colors.text1} bold p>
                        Air Purifier
                    </Text>
                </Block>
                <Touchable>
                    <Icon family={'airpurifier'} name={'profile'} size={100} />
                </Touchable>
            </Block>
            <Block flex style={{ marginTop: 80, borderTopLeftRadius: 20, borderTopRightRadius: 20, overflow: 'hidden', borderColor: '#424750', borderWidth: 1 }}>
                <LinearGradient colors={colors.gradientBackground} style={{ flex: 1 }} >
                    <Block backgroundColor={'#17181C'} center width={80} height={5} style={{ position: 'absolute', top: 10, borderRadius: 10 }} />
                    <Block row space={'between'} width={'100%'} >
                        <Block middle center style={{ marginLeft: 20 }}>
                            <Text center color={colors.text1}>
                                ON
                            </Text>
                            <Text center color={colors.text2}>
                                Currently: Online
                            </Text>
                        </Block>
                        <Touchable>
                            <Icon family={'airpurifier'} name={'power'} size={150} />
                        </Touchable>
                    </Block>
                    <Block flex center>
                        <Info />
                    </Block>
                    <Control />
                </LinearGradient>
            </Block>
        </Layout>
    );
}
export default Lock;
