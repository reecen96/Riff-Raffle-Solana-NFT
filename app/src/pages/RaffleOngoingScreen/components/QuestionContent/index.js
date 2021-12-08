import {
    ChangeEvent,
    FC,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react'
import {
    CircularProgress,
    IconButton,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@material-ui/core'
import { sleep } from '@project-serum/common'
import { u64 } from '@solana/spl-token'
import toast from 'react-hot-toast'
import {
    AddBoxRounded,
    AddCircleOutline,
    IndeterminateCheckBoxRounded,
    RemoveCircleOutline,
} from '@material-ui/icons'

import { MAX_NUMBER_OF_PARTICIPANTS } from '../../../../config/misc'
import {
    buyTickets,
    BUY_TICKETS_TX_FEE_LAMPORTS,
    calculateBasketPrice,
} from '../../../../lib/actions/buyTickets'
import { PaymentOption, Raffle } from '../../../../lib/types'
import {
    getDisplayAmount,
    getBuyerATABalance,
    getWalletLamports,
} from '../../../../lib/accounts'
import Button from '../../../../components/Button'
import useCommonStyles from '../../../../assets/styles'
import { tokenInfoMap, wrappedSOL } from '../../../../config/tokenRegistry'
import { useProgramApis } from '../../../../hooks/useProgramApis'
import { useStyles } from './styles'
import { DispenserRegistryRaw } from '../../../../providers/ProgramApisProvider'
import { PublicKey } from '@solana/web3.js'
import ShortenedString from '../../../../components/ShortenedString'

const QuestionContent = () => {
    const classes = { ...useCommonStyles(), ...useStyles() }

    return (
        <div className={classes.root}>
            <div className={classes.contentHeading}>
                <Typography variant="h2">
                    Ok, so you have questions...
                </Typography>
                <Typography variant="body2">
                    We're not all smooth brained apes and sometimes we need it
                    spelled out for us.
                </Typography>
            </div>
            <div className={classes.contentBody}>
                <div className={classes.contentColumn}>
                    <Typography
                        variant="body2"
                        className={classes.contentQuestions}
                    >
                        What is the Ape Raffle?
                    </Typography>
                    <Typography variant="body2">
                        From time to time the Degen DAOO will raffle a Degen Ape
                        NFT. Tickets will cost 0.1 SOL per entry. Bid Smol The
                        raffle will be open for 7 days and at the end of that
                        time the winner will be chosen and the ape sent to them.
                    </Typography>
                    <Typography
                        variant="body2"
                        className={classes.contentQuestions}
                    >
                        Where do the Proceeds go?
                    </Typography>
                    <Typography variant="body2">
                        The proceeds will be first used to cover the cost of
                        this ape with rare features, in this case - 50 SOL. The
                        remainder will go toward the Degen DAOO treasury to help
                        grow & fund community initiatives.
                        <br />
                        <br />
                        To date the Degen DAOO has built a vibrant 3,200 member
                        base. It has set up a validator on the Solana network to
                        support its operation, given away hundreds of community
                        NFTs to its members, marketed the Degeniverse and Solana
                        on a large digital billboard in the centre of Hong
                        Kong’s busiest and most expensive central areas and
                        built a safe space for its community members to hand,
                        learn and grow together.
                    </Typography>
                    <Typography
                        variant="body2"
                        className={classes.contentQuestions}
                    >
                        Will there be more raffles in the future?
                    </Typography>
                    <Typography variant="body2">
                        Yes! There will be more oppotunities to win the raffle.
                    </Typography>
                </div>
                <div className={classes.contentColumn}>
                    <Typography
                        variant="body2"
                        className={classes.contentQuestions}
                    >
                        How will the raffle operate? How do you participate?
                    </Typography>
                    <Typography variant="body2">
                        We will be using dRaffle to run the raffle via smart
                        contract. To participate, connect your wallet, select
                        the number of 0.1 SOL tickets you’d like to purchase,
                        and confirm!
                    </Typography>
                    <Typography
                        variant="body2"
                        className={classes.contentQuestions}
                    >
                        Why 0.1 SOL?
                    </Typography>
                    <Typography variant="body2">
                        0.1 SOL was the number that the Degen DAOO made infamous
                        during the Degenerate Trash Panda launch. In a show of
                        community coordination, they voted on setting the NFT
                        bid price to 0.1 SOL under the #bidsmol rally cry and
                        people were able to acquire their DTP token for 0.1 SOL
                        ($20) at a time when NFTs were launching for 1-2SOL
                        ($200-400).
                        <br />
                        <br />
                        This was landmark at the time and allowed a wide and
                        diverse range of participants the ability to acquire a
                        Degen Trash Panda at a very affordable price. The launch
                        also ended up raising more for charity ($797,000) than
                        it did for the team ($200,000).
                    </Typography>
                    <Typography
                        variant="body2"
                        className={classes.contentQuestions}
                    >
                        Can I enter more than once?
                    </Typography>
                    <Typography variant="body2">
                        Sure! Buy as many tickets as you’d like for a chance to
                        win your very own DAA.
                    </Typography>
                </div>
            </div>
        </div>
    )
}
export default QuestionContent
