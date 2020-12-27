import React from 'react';
import { StyleSheet, View, ViewPropTypes, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';

function Block({
    row,
    flex,
    center,
    middle,
    top,
    bottom,
    right,
    left,
    shadow,
    space,
    fluid,
    height,
    shadowColor,
    card,
    width,
    safe,
    children,
    backgroundColor,
    wrap,
    style,
    ...rest
}) {
    const styleBlock = [
        row && styles.row,
        flex && { flex: flex === true ? 1 : flex },
        center && styles.center,
        middle && styles.middle,
        top && styles.top,
        bottom && styles.bottom,
        right && styles.right,
        left && styles.left,
        space && { justifyContent: `space-${space}` },
        fluid && styles.fluid,
        wrap && { flexWrap: 'wrap' },
        height && { height },
        width && { width },
        shadowColor && { shadowColor },
        card && styles.card,
        backgroundColor && { backgroundColor },
        shadow && styles.shadow,
        style,
        { overflow: 'hidden' }
    ];

    if (safe) {
        return (
            <SafeAreaView style={styleBlock} {...rest}>
                {children}
            </SafeAreaView>
        );
    }
    return (
        <View style={styleBlock} {...rest}>
            {children}
        </View>
    );
};

Block.propTypes = {
    row: PropTypes.bool,
    flex: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
    center: PropTypes.bool,
    middle: PropTypes.bool,
    top: PropTypes.bool,
    bottom: PropTypes.bool,
    right: PropTypes.bool,
    card: PropTypes.bool,
    left: PropTypes.bool,
    shadow: PropTypes.bool,
    space: PropTypes.string,
    fluid: PropTypes.bool,
    height: PropTypes.any,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    shadowColor: PropTypes.string,
    safe: PropTypes.bool,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.node]),
    style: ViewPropTypes.style,
};

Block.defaultProps = {
    children: <></>,
    style: {},
    row: false,
    flex: false,
    center: false,
    middle: false,
    top: false,
    bottom: false,
    right: false,
    left: false,
    card: false,
    shadow: false,
    space: null,
    fluid: false,
    height: null,
    width: null,
    shadowColor: null,
    safe: false,
};

const styles = StyleSheet.create({
    block: {
        flexDirection: 'column',
    },
    row: {
        flexDirection: 'row',
    },
    middle: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    center: {
        alignItems: 'center',
        alignSelf: 'center',
    },
    left: {
        alignItems: 'flex-start',
    },
    right: {
        alignItems: 'flex-end',
    },
    top: {
        alignItems: 'flex-start',
        alignSelf: 'flex-start',
    },
    bottom: {
        alignItems: 'flex-end',
        alignSelf: 'flex-end',
    },
    fluid: {
        width: 'auto',
    },
    card: {
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#B2B2B2',
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.8,
        shadowRadius: 6.68,
        elevation: 5,
    },
});

export default Block;