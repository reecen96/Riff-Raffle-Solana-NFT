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
    AddCircleOutlined,
    IndeterminateCheckBoxRounded,
    RemoveCircleOutlined,
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
import { LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js'
import ShortenedString from '../../../../components/ShortenedString'
import { WalletDisconnectButton } from '@solana/wallet-adapter-material-ui'
import TrashPanda from '../../../../assets/trashpanda.png'

const MAX_TICKET_AMOUNT = 999

const isLamportsEnough = (lamports: number | undefined) =>
    (lamports ?? 0) >= BUY_TICKETS_TX_FEE_LAMPORTS

interface AccountBalance {
    mint: PublicKey
    amount: u64 | undefined
}

interface PurchaseTicketsProps {
    raffle: Raffle
    updateRaffle: () => void
}

export const PurchaseTickets: FC<PurchaseTicketsProps> = ({
    raffle,
    updateRaffle,
}) => {
    const classes = { ...useCommonStyles(), ...useStyles() }
    const { draffleClient, dispenserClient } = useProgramApis()

    const [purchaseOngoing, setPurchaseOngoing] = useState(false)
    const [walletLamports, setWalletLamports] = useState<number>()
    const [buyButtonHovered, setBuyButtonHovered] = useState(false)
    // const [ticketPrice, setTicketPrice] = useState<PaymentOption>({
    //   mint: raffle.proceeds.mint,
    //   price: raffle.proceeds.ticketPrice,
    //   price: raffle.proceeds.ticketPrice,
    // });

    const nativePaymentOption = useMemo(
        () => ({
            mint: raffle.proceeds.mint,
            dispenserPriceIn: new u64(1),
            dispenserPriceOut: new u64(1),
        }),
        [raffle]
    )
    const [paymentOption, setPaymentOption] =
        useState<PaymentOption>(nativePaymentOption)
    const [buyerATABalance, setBuyerATABalance] = useState<AccountBalance>({
        mint: raffle.proceeds.mint.publicKey,
        amount: undefined,
    })
    const [ticketAmount, setTicketAmount] = useState<number>(1)
    const [dispensers, setDispensers] = useState<
        { account: DispenserRegistryRaw; publicKey: PublicKey }[]
    >([])

    const paymentOptions = useMemo(
        () =>
            (raffle.metadata.alternatePurchaseMints || []).reduce(
                (acc, mintAddress) => {
                    if (!tokenInfoMap.has(mintAddress.toString())) {
                        console.log(
                            `Mint ${mintAddress.toString()} not found in token registry`
                        )
                        return acc
                    }

                    const dispenser = dispensers.find(
                        (d) =>
                            d.account.mintTokenOut.toString() ===
                                raffle.proceeds.mint.publicKey.toString() &&
                            d.account.mintTokenIn.toString() ===
                                mintAddress.toString()
                    )
                    if (!dispenser) {
                        return acc
                    }

                    const tokenInfo = tokenInfoMap.get(mintAddress.toString())!
                    acc.set(mintAddress.toString(), {
                        mint: {
                            name: tokenInfo.name,
                            publicKey: mintAddress,
                            logoUrl: tokenInfo.logoURI,
                            symbol: tokenInfo.symbol,
                            decimals: tokenInfo.decimals,
                        },
                        dispenserPriceIn: dispenser.account.rateTokenIn,
                        dispenserPriceOut: dispenser.account.rateTokenOut,
                    })
                    return acc
                },
                new Map<string, PaymentOption>([
                    [
                        raffle.proceeds.mint.publicKey.toString(),
                        {
                            mint: raffle.proceeds.mint,
                            dispenserPriceIn: new u64(1),
                            dispenserPriceOut: new u64(1),
                        },
                    ],
                ])
            ),
        [raffle, dispensers]
    )

    const getBasketPrice = useCallback(
        (ticketAmount: number) =>
            calculateBasketPrice(
                raffle.proceeds.ticketPrice,
                ticketAmount,
                paymentOption
            ),
        [raffle.proceeds.ticketPrice, paymentOption]
    )

    useEffect(() => {
        dispenserClient.account.registry.all().then(setDispensers)
    }, [dispenserClient, setDispensers])

    useEffect(() => {
        if (!draffleClient.provider.wallet?.publicKey) return
        let timerId: ReturnType<typeof setInterval>

        const updateLamports = async () => {
            const newWalletLamports = await getWalletLamports(
                draffleClient.provider
            )
            setWalletLamports(newWalletLamports)
            if (
                isLamportsEnough(walletLamports) &&
                !(paymentOption.mint.publicKey.toBase58() === wrappedSOL)
            ) {
                clearInterval(timerId)
            }
        }

        updateLamports()
        timerId = setInterval(() => {
            updateLamports()
        }, 5000)
        return () => clearInterval(timerId)
    }, [
        walletLamports,
        draffleClient.provider,
        draffleClient.provider.wallet.publicKey,
        paymentOption.mint.publicKey,
    ])

    useEffect(() => {
        if (!draffleClient.provider.wallet.publicKey) return
        async function updateBuyerATABalance() {
            setBuyerATABalance({
                mint: paymentOption.mint.publicKey,
                amount: await getBuyerATABalance(
                    draffleClient.provider,
                    paymentOption.mint.publicKey
                ),
            })
        }
        const timerId = setInterval(() => {
            updateBuyerATABalance()
        }, 5000)
        updateBuyerATABalance()
        return () => clearInterval(timerId)
    }, [
        draffleClient.provider,
        draffleClient.provider.wallet,
        paymentOption.mint.publicKey,
    ])

    const lamportsEnough = useMemo(
        () => isLamportsEnough(walletLamports),
        [walletLamports]
    )
    const buyerTokenBalance = useMemo(() => {
        return paymentOption.mint.publicKey.toBase58() === wrappedSOL
            ? {
                  mint: new PublicKey(wrappedSOL),
                  amount: new u64(walletLamports ?? 0),
              } // We ignore the potential wSOL ATA
            : buyerATABalance
    }, [walletLamports, buyerATABalance, paymentOption.mint.publicKey])

    const hasEnoughFunds = useMemo(() => {
        const tokensEnough = buyerTokenBalance.amount?.gte(
            getBasketPrice(ticketAmount)
        )
        return tokensEnough && lamportsEnough
    }, [buyerTokenBalance, lamportsEnough, ticketAmount, getBasketPrice])

    const maxTicketsToBuyable = useMemo(() => {
        if (!buyerTokenBalance.amount) return new u64(0)
        const newMax = buyerTokenBalance.amount
            .mul(paymentOption.dispenserPriceOut)
            .div(paymentOption.dispenserPriceIn)
            .div(raffle.proceeds.ticketPrice)

        if (
            paymentOption.mint.publicKey.toString() ===
                buyerTokenBalance.mint.toString() &&
            newMax.ltn(ticketAmount)
        )
            setTicketAmount(newMax.toNumber())
        return newMax
    }, [buyerTokenBalance, paymentOption])

    useEffect(() => {
        let newTicketAmount = ticketAmount === 0 ? 1 : ticketAmount
        Math.min(ticketAmount, maxTicketsToBuyable.toNumber())
        setTicketAmount(newTicketAmount)
    }, [maxTicketsToBuyable, ticketAmount, setTicketAmount])

    const hasEnoughFundsToIncrementTicket = useMemo(() => {
        const tokensEnough = buyerTokenBalance.amount?.gte(
            getBasketPrice(ticketAmount + 1)
        )
        return tokensEnough && lamportsEnough
    }, [buyerTokenBalance, lamportsEnough, ticketAmount, getBasketPrice])

    const onBuyTickets = useCallback(async () => {
        try {
            setPurchaseOngoing(true)
            const buyerATAExists = buyerATABalance.amount !== undefined
            await buyTickets(
                draffleClient,
                dispenserClient,
                raffle,
                ticketAmount,
                paymentOption,
                buyerATAExists
            )
            setTicketAmount(1)
            await sleep(500)
            updateRaffle()
            toast.success(`You bought ${ticketAmount} ticket(s)`)
        } catch (error: any) {
            if (error.msg) {
                toast.error(`Transaction failed: ${error.msg}`)
            } else {
                toast.error('Unexpected error')
            }
        }
        setPurchaseOngoing(false)
    }, [
        draffleClient,
        dispenserClient,
        raffle,
        ticketAmount,
        paymentOption,
        buyerATABalance,
        setTicketAmount,
        updateRaffle,
    ])

    const onSelectPurchaseMint = (
        event: ChangeEvent<{
            name?: string | undefined
            value: unknown
        }>
    ) => setPaymentOption(paymentOptions.get(event.target.value as string)!)

    return (
        <div
            className={`${classes.actionSection} ${classes.root}`}
            style={{ position: 'relative' }}
        >
            <img
                src={TrashPanda}
                alt="Trash Panda"
                style={{
                    position: 'absolute',
                    left: `${buyButtonHovered ? '432px' : '332px'}`,
                    top: '-40px',
                    transition: 'all 0.5s ease',
                    zIndex: '-1',
                }}
            />

            <div className={classes.purchaseTicketsSection}>
                <Typography variant="h3" className={classes.titleSection}>
                    Purchase Tickets
                </Typography>
                <div className={classes.priceSection}>
                    <div className={classes.paymentOptionSection}>
                        <div className={classes.basketPrice}>
                            <Typography
                                variant="caption"
                                style={{ color: '#9CA3AF' }}
                            >
                                TOTAL PRICE
                            </Typography>
                            <div className={classes.totalPriceContainer}>
                                <Typography
                                    variant="h4"
                                    style={{ color: 'white' }}
                                >
                                    {getDisplayAmount(
                                        getBasketPrice(ticketAmount),
                                        paymentOption.mint
                                    )}
                                    ◎
                                </Typography>
                                <Button
                                    size="small"
                                    variant="text"
                                    disableRipple
                                    className={classes.maxButton}
                                    onClick={() => {
                                        let maxTickets = Math.min(
                                            MAX_TICKET_AMOUNT -
                                                raffle.totalTickets,
                                            maxTicketsToBuyable.toNumber()
                                        )
                                        setTicketAmount(maxTickets)
                                    }}
                                >
                                    MAX
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
                <Button
                    variant="contained"
                    className={classes.purchaseTicketsButton}
                    onClick={onBuyTickets}
                    onMouseEnter={() => {
                        setBuyButtonHovered(true)
                    }}
                    onMouseLeave={() => {
                        setBuyButtonHovered(false)
                    }}
                    disabled={
                        ticketAmount === 0 ||
                        raffle.totalTickets + ticketAmount >
                            MAX_NUMBER_OF_PARTICIPANTS ||
                        !hasEnoughFunds ||
                        purchaseOngoing
                    }
                >
                    <div className={classes.purchaseButtonContent}>
                        {purchaseOngoing ? (
                            <>
                                <div
                                    className={
                                        classes.purchaseButtonContentLeft
                                    }
                                >
                                    <CircularProgress
                                        size={20}
                                        className={classes.purchaseSpinner}
                                    />
                                </div>
                                <div
                                    className={
                                        classes.purchaseButtonContentMiddle
                                    }
                                >
                                    Processing...
                                </div>
                                <div
                                    className={
                                        classes.purchaseButtonContentRight
                                    }
                                />
                            </>
                        ) : (
                            <>
                                Buy tickets{' '}
                                {/* {!lamportsEnough && '(Insufficient SOL)'} // commenting for now because it causes unwanted layoutshift upon load*/}
                            </>
                        )}
                    </div>
                </Button>
            </div>
            <div className={classes.ticketAmountSelectSection}>
                <TextField
                    variant="outlined"
                    className={classes.ticketAmountTextField}
                    value={ticketAmount}
                    onChange={(event) => {
                        const newValue = event.target.value
                        const re = /^[0-9\b]+$/
                        if (newValue !== '' && !re.test(newValue)) return

                        let numericValue = Math.min(
                            Math.min(
                                Number(newValue),
                                MAX_TICKET_AMOUNT - raffle.totalTickets
                            ),
                            maxTicketsToBuyable.toNumber()
                        )

                        setTicketAmount(numericValue)
                    }}
                    InputProps={{
                        endAdornment: (
                            <IconButton
                                size="small"
                                onClick={() =>
                                    setTicketAmount(
                                        (currentAmount) => currentAmount + 1
                                    )
                                }
                                disabled={
                                    raffle.totalTickets + ticketAmount >=
                                        MAX_NUMBER_OF_PARTICIPANTS ||
                                    !hasEnoughFundsToIncrementTicket ||
                                    ticketAmount + 1 >
                                        MAX_TICKET_AMOUNT - raffle.totalTickets
                                }
                                className={classes.changeTicketAmountButton}
                            >
                                <AddCircleOutlined style={{ fontSize: 30 }} />
                            </IconButton>
                        ),
                        startAdornment: (
                            <IconButton
                                size="small"
                                onClick={() =>
                                    setTicketAmount((currentAmount) =>
                                        Math.max(currentAmount - 1, 1)
                                    )
                                }
                                disabled={ticketAmount <= 1}
                                className={classes.changeTicketAmountButton}
                            >
                                <RemoveCircleOutlined
                                    style={{ fontSize: 30 }}
                                />
                            </IconButton>
                        ),
                    }}
                />
                <div className={classes.ticketSubHeader}>
                    <Typography variant="body1">TICKETS</Typography>
                </div>
                <div>
                    <Typography variant="body2">
                        Wallet balance{' '}
                        {((walletLamports || 0) / LAMPORTS_PER_SOL).toFixed(2)}{' '}
                        {paymentOption.mint.symbol}
                    </Typography>
                </div>
                <WalletDisconnectButton
                    variant="outlined"
                    color="secondary"
                    className={classes.walletDisconnectButton}
                >
                    Disconnect Wallet
                </WalletDisconnectButton>
            </div>
        </div>
    )
}
