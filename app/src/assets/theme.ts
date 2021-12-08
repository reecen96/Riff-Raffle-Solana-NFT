import { createTheme } from '@material-ui/core/styles'
import { DeviceType } from '../providers/ViewportProvider'

const PRIMARY_COLOR = '#0EA5E9'
const SECONDARY_COLOR = '#0EA5E9'
const MAIN_TEXT_COLOR = '#FFF'
const CONTENT_BACKGROUND = '#111827'

const theme = ({ device }: { device: DeviceType }) =>
    createTheme({
        typography: {
            allVariants: { color: '#FFF', fontFamily: 'Inter var, system-ui' },
            h1: {
                color: MAIN_TEXT_COLOR,
                textAlign: 'center',
                fontWeight: 900,
                fontSize: device === DeviceType.Phone ? '24px' : '64px',
            },
            h2: {
                color: MAIN_TEXT_COLOR,
                fontWeight: 'bold',
                fontSize: device === DeviceType.Phone ? '24px' : '36px',
            },
            h3: {
                color: MAIN_TEXT_COLOR,
                fontWeight: 'bold',
                fontSize: device === DeviceType.Phone ? '24px' : '24px',
            },
            h4: {
                color: SECONDARY_COLOR,
                fontWeight: 'bold',
                fontSize: device === DeviceType.Phone ? '20px' : '32px',
            },
            body1: {
                fontSize: device === DeviceType.Phone ? '14px' : '18px',
            },
            body2: {
                fontSize: device === DeviceType.Phone ? '12px' : '16px',
                fontWeight: 400,
                color: '#9CA3AF',
            },
            overline: {
                color: '#999',
                fontSize: device === DeviceType.Phone ? '12px' : '13px',
            },
            caption: {
                fontSize: device === DeviceType.Phone ? '10x' : '10px',
            },
        },
        palette: {
            type: 'dark',
            background: {
                paper: CONTENT_BACKGROUND,
                default:
                    'linear-gradient(0deg, rgba(57,9,74,1) 0%, rgba(6,18,98,1) 100%, rgba(57,9,74,1) 100%);',
            },
            primary: {
                main: PRIMARY_COLOR,
            },
            secondary: {
                main: SECONDARY_COLOR,
            },
            grey: { 500: '#777' },
        },
    })

export default theme
