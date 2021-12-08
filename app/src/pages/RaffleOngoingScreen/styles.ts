import { Theme } from '@material-ui/core'
import { makeStyles, alpha } from '@material-ui/core/styles'

import { DeviceType } from '../../providers/ViewportProvider'

export const useStyles = makeStyles<Theme, { device: DeviceType }>(
    (theme: Theme) => ({
        root: {
            width: '100%',
            height: 'inherit',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            padding: '0 16px',
        },
        actionTagline: {
            // width: '100%',
            // flexGrow: 1,
        },
        actionItems: {
            padding: '8px 0',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
        },
        topSection: {
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            flexDirection: 'column',
            marginBottom: '40px',
        },
        raffleTitle: {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignContent: 'flex-start',
            alignItems: 'flex-start',
            justifyItems: 'space-between',
        },
        raffleSubtitle: {
            marginTop: '10px',
            color: theme.palette.secondary.main,
            width: '75%',
        },
        leftTitleSection: {
            width: '10%',
            display: 'flex',
        },
        middleTitleSection: {
            width: '90%',
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center',
        },
        rightTitleSection: {
            width: '10%',
        },
        backButton: {
            color: theme.palette.common.black,
            backgroundColor: alpha(theme.palette.secondary.main, 0.8),
            '&:hover': {
                boxShadow: `0px 0px 5px ${theme.palette.secondary.main}, inset 0px 0px 5px ${theme.palette.secondary.main}`,
                backgroundColor: alpha(theme.palette.secondary.main, 0.8),
            },
        },
        countdown: ({ device }) => ({
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            marginTop: '10px',
            fontSize: device === DeviceType.Phone ? '32px' : '60px',
            color: 'white',
            WebkitTextStrokeWidth: '1px',
            WebkitTextStrokeColor: theme.palette.secondary.main,
            textShadow: `0 0 10px ${theme.palette.secondary.main}`,
        }),
        mainContent: {
            width: '90%',
            height: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginBottom: '96px',
        },
        prizesSection: {
            display: 'flex',
            flexDirection: 'column',
            marginRight: '55px',
            minHeight: '445px',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        prizesHeader: {
            marginBottom: '10px',
        },
        labelPrizeAmount: {
            marginLeft: '5px',
            color: theme.palette.secondary.main,
            textTransform: 'initial',
            '&:hover': {
                textShadow: `0px 0px 5px ${theme.palette.secondary.main}`,
                backgroundColor: 'transparent',
                textDecoration: 'none',
            },
        },
        seeAllPrizesLabel: {},
        detailsSection: ({ device }) => ({
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            width: '550px',
        }),
        actionSectionContainer: {
            // padding: '20px 0 20px 0',
        },

        connectToBuyButton: {
            width: '187px',
            height: '50px',
            color: theme.palette.common.black,
            border: 'none',
            backgroundColor: theme.palette.common.white,
            textTransform: 'none',
            '&:hover': {
                backgroundColor: '#8fd9fb',
            },
        },
        scrollIcon: {
            color: theme.palette.common.white,
            transform: `rotate(90deg)`,
            fontSize: '50px',
            opacity: '0.6',
            marginTop: '20px',
            marginBottom: '60px',
        },
        spacer: {
            width: '100%',
            height: '20px',
        },
    })
)
