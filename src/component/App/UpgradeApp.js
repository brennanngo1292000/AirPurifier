import React, {Component} from 'react';
import CodePush from 'react-native-code-push';
import { colors } from '../../theme';
import Block from '../Block';
import { Touchable } from '../Button';
import Text from '../Text';

class UpgradeApp extends Component {
    onButtonPress() {
        CodePush.sync({
            updateDialog: true,
            installMode: CodePush.InstallMode.IMMEDIATE
        });
    }
    render() {
        return (
            <Block flex middle>
                <Touchable onPress={this.onButtonPress}>
                    <Text color={colors.text1}>Check for updates</Text>
                </Touchable >
            </Block>
        )
    }
}

export default UpgradeApp;