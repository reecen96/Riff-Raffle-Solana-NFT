import { Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        padding: '16px 24px',
        backgroundColor: '#111827',
        boxShadow: '0 2px 4px 0 #000',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    contentHeading: {
        display: 'flex',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '36px 0',
    },
    contentBody: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
    },
    contentColumn: {
        padding: '16px 24px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        flexBasis: '50%',
    },
    contentQuestions: {
        fontWeight: 600,
        color: 'white',
        margin: '24px 0 8px',
    },
}))
