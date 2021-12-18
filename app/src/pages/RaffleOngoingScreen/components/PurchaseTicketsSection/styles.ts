import { makeStyles } from '@material-ui/core/styles'
import { NoEncryption } from '@material-ui/icons'
import { Theme, alpha, darken } from '@material-ui/core'

export const useStyles = makeStyles((theme: Theme) => ({
    root: {
        // padding: '15px 20px 15px 20px',
    },
    titleSection: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: '15px',
        flexGrow: 1,
    },
    amountLabel: {
        width: '100%',
        display: 'flex',
    },
    purchaseTicketsSection: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: '8px 0px',
    },
    ticketAmountSelectSection: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    changeTicketAmountButton: {
        color: '#1D4ED8',
        zIndex: 1,
    },
    ticketAmountTextField: {
        minWidth: '150px',
        '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
            backgroundColor: '#374151',
            borderRadius: '16px 16px 0px 0px',
            border: 'none',
        },
        '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {},
        '& .MuiOutlinedInput-input': {
            color: theme.palette.common.white,
            textAlign: 'center',
            fontWeight: 900,
            fontSize: '64px',
            zIndex: 1,
            maxWidth: '125px',
            padding: '16px 0px',
        },
        '& .MuiOutlinedInput-adornedStart': {
            paddingLeft: '18px',
        },
        '& .MuiOutlinedInput-adornedEnd': {
            paddingRight: '18px',
        },
    },
    ticketSubHeader: {
        marginBottom: '10px',
        borderRadius: '0px 0px 16px 16px',
        backgroundColor: '#1F2937',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
    },
    maxButton: {
        color: '#6B7280',
        fontSize: '14px',
        // width: '30px',
        minWidth: '50px',
        backgroundColor: '#000',
        borderRadius: '8px',
        padding: '0px 0px',
        '&:hover': {
            // backgroundColor: 'transparent',
        },
    },

    priceSection: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginBottom: '24px',
    },
    priceLabel: {
        margin: '-5px 0 -5px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    paymentOptionSection: {
        width: '100%',
        display: 'flex',
    },
    basketPrice: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'baseline',
    },
    totalPriceContainer: {
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: '8px',
        backgroundColor: '#1F2937',
        padding: '4px 8px',
        width: '100%',
    },
    paymentOptionSelect: {
        width: '100%',
        height: '50px',
        marginTop: '-10px',
        padding: '0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    paymentOptionSelection: {
        padding: '0',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    paymentOptionMenu: {
        padding: '0 10px 0 0',
        margin: '5px 10px 5px 10px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    paymentOptionLogoContainer: {
        height: '30px',
        width: '30px',
        margin: '5px 10px 5px 10px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    paymentOptionLogo: {
        height: '100%',
        borderRadius: '50%',
    },

    buySection: {
        // width: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    purchaseButtonContent: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    purchaseTicketsButton: {
        width: '100%',
        height: '50px',
        backgroundColor: '#BFDBFE',
        borderColor: theme.palette.primary.main,
        color: theme.palette.common.black,
        '&:hover': {
            backgroundColor: darken('#BFDBFE', 0.2),
            borderColor: darken('#BFDBFE', 0.2),
        },
        '&:disabled': {
            backgroundColor: '#393939',
            borderColor: '#393939',
            color: '#898989',
        },
    },
    purchaseButtonContentLeft: {
        width: '20%',
        display: 'flex',
        justifyContent: 'center',
    },
    purchaseButtonContentMiddle: {
        width: '60%',
    },
    purchaseButtonContentRight: {
        width: '20%',
    },
    purchaseSpinner: {
        height: '50px',
        color: theme.palette.secondary.main,
    },
    walletBalance: {
        marginTop: '5px',
        fontSize: '12px',
        color: '#777',
        textAlign: 'left',
    },
    walletDisconnectButton: {
        border: 'none',
        fontSize: '12px',
        color: '#FCA5A5',
        textAlign: 'left',
        '&:hover': {
            backgroundColor: 'transparent',
            border: 'none',
        },
    },
}))
