import React from 'react';
import { Text as TextRN } from 'react-native';

function Text({ h1, h2, h3, h4, h5, h6, p, small, center, color, size, bold, style, ...rest }) {
    let textStyled = [
        h1 && { fontSize: 60 },
        h2 && { fontSize: 40 },
        h3 && { fontSize: 30 },
        h4 && { fontSize: 20 },
        h5 && { fontSize: 18 },
        h6 && { fontSize: 16 },
        p && { fontSize: 14 },
        small && { fontSize: 12 },
        color && { color, },
        size && { fontSize: size },
        bold && { fontWeight: 'bold' },
        center && { alignSelf: 'center', textAlign: 'center' },
        style,
    ]
    return <TextRN style={textStyled} {...rest} />
}

export default Text;