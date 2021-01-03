import React from 'react'
import { SafeAreaView, View, ViewPropTypes } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import PropTypes from 'prop-types'
import { getStatusBarHeight } from '../../StatusBar';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../../../theme';
import StatusBar from './StatusBar';


const STATUSBAR_HEIGHT = getStatusBarHeight();

function Layout({ scroll, children, colors, forceInset, contentContainerStyle, style, ...rest }) {
    return (
        <LinearGradient colors={colors} style={{ flex: 1 }}>
            <SafeAreaView forceInset={forceInset} style={[{ flex: 1 }, style]} {...rest}>
                <StatusBar />
                {
                    scroll ?
                        (
                            <ScrollView contentContainerStyle={[{ paddingTop: STATUSBAR_HEIGHT }, contentContainerStyle]} {...rest}>
                                {children}
                            </ScrollView>
                        ) : (
                            <View style={[{ flex: 1, paddingTop: STATUSBAR_HEIGHT }, contentContainerStyle]}>
                                {children}
                            </View>
                        )
                }
            </SafeAreaView>
        </LinearGradient>
    )
}

Layout.propTypes = {
    scroll: PropTypes.bool,
    style: ViewPropTypes.style,
    contentContainerStyle: ViewPropTypes.style,
    colors: PropTypes.arrayOf(PropTypes.string)
}

Layout.defaultProps = {
    scroll: false,
    contentContainerStyle: {},
    colors: colors.gradientBackground,
    forceInset: { bottom: 'never', top: 'never' }
}

export default Layout;