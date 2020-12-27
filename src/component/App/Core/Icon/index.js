import React from 'react';
import PropTypes from 'prop-types'
import * as SVGIcon from './SVGIcon';
import ImageIcon from './ImageIcon';
import { has } from 'underscore'
import { Image } from 'react-native';

function Icon({ name, family, size, ...rest }) {
    switch (family) {
        case 'airpurifier':
            if (has(SVGIcon, name)) {
                let SVG = SVGIcon[name];
                return <SVG width={size} height={size} />
            } else if (has(ImageIcon, name)) {
                return <Image source={ImageIcon[name]} style={{ width: size, height: size, ...rest }} />
            } else return null
        default:
            return null

    }
}

Icon.propTypes = {
    name: PropTypes.string,
    family: PropTypes.string,
    size: PropTypes.number
}

Icon.defaultProps = {
    family: 'airpurifier',
    size: 60,
}

export default Icon;