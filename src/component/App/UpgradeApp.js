import React, {Component} from 'react';
import { View ,TouchableOpacity, Text } from 'react-native';
import CodePush from 'react-native-code-push';

class MyApp extends Component {
    onButtonPress() {
        CodePush.sync({
            updateDialog: true,
            installMode: CodePush.InstallMode.IMMEDIATE
        });
    }
    render() {
        return (
            <View>
                <TouchableOpacity onPress={this.onButtonPress}>
                    <Text>Check for safdsg dgfdhgfj asgfdghdfjhgfjk dgfh updates</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default MyApp;