import { Theme } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { DeviceType } from '../../providers/ViewportProvider'

export const useStyles = makeStyles<Theme, { device: DeviceType }>(
    (theme: Theme) => ({
        root: ({ device }) => ({
            width: '100%',
            minWidth: device === DeviceType.Phone ? '256px' : '313px',
            display: 'flex',
            flexDirection: 'column',
            fontSize: '30px',
        }),

        ticketInfoSection: {
            padding: '16px 24px',
            minHeight: '104px',
            backgroundColor: '#111827',
            boxShadow: '0 2px 4px 0 #000',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '16px',
            margin: '16px 8px',
        },
        ticketInfo: {
            display: 'flex',
            flexDirection: 'row',
        },
        raffleTimeLeft: {
            display: 'flex',
            flexDirection: 'row',
            width: '100%',
        },
        timeLeftUnit: {
            flexBasis: '25%',
            padding: '16px 24px',
            minHeight: '104px',
            backgroundColor: '#111827',
            boxShadow: '0 2px 4px 0 #000',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderRadius: '16px',
            margin: '8px',
        },

        ticketPrice: {
            width: '42%',
        },
        myTickets: {
            width: '55%',
        },
        showMyTickets: {
            width: '45%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'baseline',
            paddingBottom: '5px',
        },
        ticketButton: {
            fontSize: '14px',
            color: theme.palette.primary.main,
            textShadow: '0px 0px 5px #e86bff',
            padding: '0 0',
            '&:hover': {
                backgroundColor: 'transparent',
            },
        },
        separator: { margin: '0 5px' },
    })
)
