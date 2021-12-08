import { Box, Container } from '@material-ui/core'
import React, { FC } from 'react'
import { useViewport } from '../../../hooks/useViewport'

import { useStyles } from './styles'

export interface BodyProps {}

export const Body: FC<BodyProps> = ({ children }) => {
    const { device } = useViewport()
    const classes = useStyles({ device })
    return (
        <Container
            style={{
                width: '100%',
                padding: '0 10px',
                display: ' flex',
                alignItems: 'center',
                height: '100%',
            }}
        >
            <Box className={classes.root}>{children}</Box>
        </Container>
    )
}

export default Body
