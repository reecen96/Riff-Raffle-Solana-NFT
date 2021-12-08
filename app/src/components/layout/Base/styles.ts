import { Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) => ({
    background: {
        width: '100vw',
        height: '100vh',
        background: '#000410',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'fixed',
        zIndex: -1,
    },
    content: {
        // position: 'fixed',
        // top: 0,
        // left: 0,
        // width: '100%',
        // height: '100%',
        // display: 'flex',
        // flexDirection: 'column',
    },
}))
