import { FC, useMemo, useRef } from 'react'
import {
    WalletMultiButton,
    WalletDisconnectButton,
} from '@solana/wallet-adapter-material-ui'
import { ArrowBack, DoubleArrow } from '@material-ui/icons'
import { Button, IconButton, Typography } from '@material-ui/core'
import { useHistory } from 'react-router'

import { useProgramApis } from '../../hooks/useProgramApis'
import { Raffle } from '../../lib/types'
import Countdown from '../../components/Countdown'
import PrizeShowcaseOngoing from './components/PrizeShowcaseOngoing'
import RaffleInfoSection from '../../components/RaffleInfoSection'
import { PurchaseTickets } from './components/PurchaseTicketsSection/PurchaseTicket'
import { routes } from '../../router/routes'
import Screen from '../../components/layout/Screen'
import useCommonStyles from '../../assets/styles'
import { useStyles } from './styles'
import PrizeGalleryOngoing from './components/PrizeGalleryOngoing'
import { useViewport } from '../../hooks/useViewport'
import { DeviceType } from '../../providers/ViewportProvider'
import Spacer from '../../components/Spacer'
// import LogoAnimation from '../../components/LogoAnimation'
import flameIcon from '../../assets/flameIcon.svg'
import WinThisApe from '../../assets/WinThisApe.svg'
import DaooLogo from '../../assets/DaooLogo.svg'
import QuestionContent from './components/QuestionContent'
interface IRaffleOngoingScreenProps {
    raffle: Raffle
    updateRaffle: () => void
}

const RaffleOngoingScreen: FC<IRaffleOngoingScreenProps> = ({
    raffle,
    updateRaffle,
}) => {
    const { device } = useViewport()
    const classes = { ...useCommonStyles(), ...(useStyles({ device }) as any) }
    const { push } = useHistory()
    const { draffleClient } = useProgramApis()

    const entrant = useMemo(() => {
        if (!draffleClient.provider.wallet?.publicKey) return
        return raffle?.entrants.get(
            draffleClient.provider.wallet.publicKey.toString()
        )
    }, [raffle, draffleClient.provider.wallet?.publicKey]) // "Unnecessary" dependency required due to React not picking up change in publicKey subfield

    if (!raffle) return null

    return (
        <div className={classes.root}>
            <div className={classes.topSection}>
                <div className={classes.raffleTitle}>
                    <Typography variant="h1">Degen DAOO Raffle</Typography>
                </div>
                <div className={classes.raffleSubtitle}>
                    <Typography variant="body1">
                        Enter the raffle to have a chance to win this smooth
                        brained Degen Ape Academy Ape. Each ticket costs 0.1 SOL
                        (thanks #bidsmol), will last 7 days from the start, and
                        you may buy as many tickets as you want.
                    </Typography>
                </div>
            </div>
            <div className={classes.mainContent}>
                <div className={classes.prizesSection}>
                    <PrizeShowcaseOngoing prizes={raffle.prizes} />
                    <img src={WinThisApe} alt="Win this Ape!" />
                </div>
                <div className={classes.detailsSection}>
                    <div className={classes.actionSectionContainer}>
                        {draffleClient.provider.wallet.publicKey ? (
                            <PurchaseTickets
                                raffle={raffle}
                                updateRaffle={updateRaffle}
                            />
                        ) : (
                            <ConnectActionSection />
                        )}
                    </div>
                    <RaffleInfoSection
                        raffle={raffle}
                        userConnected={
                            !!draffleClient.provider.wallet.publicKey
                        }
                        userTickets={entrant?.tickets}
                    />
                </div>
            </div>
            <QuestionContent />
        </div>
    )
}

const ConnectActionSection: FC = () => {
    const { device } = useViewport()
    const classes = { ...useCommonStyles(), ...(useStyles({ device }) as any) }

    return (
        <div className={classes.actionSection}>
            <div className={classes.actionItems}>
                <div className={classes.actionTagline}>
                    <Typography variant="h3">Purchase Tickets</Typography>
                </div>
                <WalletMultiButton
                    variant="outlined"
                    color="secondary"
                    className={` ${classes.connectToBuyButton}`}
                >
                    Connect Wallet
                    <img
                        src={flameIcon}
                        alt="flame icon"
                        style={{ marginLeft: 4 }}
                        className={classes.flameIcon}
                    />
                </WalletMultiButton>
                {/* <WalletDisconnectButton /> */}
            </div>
            <img src={DaooLogo} alt="DAOO Logo" />
        </div>
    )
}

interface IRaffleOngoingDetailsProps {
    raffle: Raffle
    updateRaffle: () => void
}

const RaffleOngoingScreenWithLayout: FC<IRaffleOngoingDetailsProps> = (
    props
) => {
    const { push } = useHistory()

    return (
        <Screen onBackNavigation={() => push(routes.RAFFLES)}>
            <RaffleOngoingScreen {...props} />
        </Screen>
    )
}

export default RaffleOngoingScreenWithLayout
