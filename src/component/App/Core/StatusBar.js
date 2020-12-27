import React from 'react'
import { Platform, StatusBar as StatusBarRN } from 'react-native'
import PropTypes from 'prop-types'
import { FocusAwareStatusBar } from '../../StatusBar'

function StatusBar({ translucent, ...rest }) {
    StatusBarRN.setBarStyle('light-content');
    if (Platform.OS === 'android') {
        StatusBarRN.setBackgroundColor('rgba(0,0,0,0)');
        StatusBarRN.setTranslucent(typeof translucent == 'boolean' && translucent);
    }
    return <FocusAwareStatusBar {...rest} />;
};

StatusBar.propTypes = {
    translucent: PropTypes.bool,
};
StatusBar.defaultProps = {
    translucent: true
}

export default StatusBar;
