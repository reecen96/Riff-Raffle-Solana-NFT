import {
    Button,
    Dialog,
    DialogContent,
    DialogProps,
    DialogTitle,
    Typography,
} from '@material-ui/core'
import { FC, useState } from 'react'
import CountUp from 'react-countup'

import { getDisplayAmount } from '../../lib/accounts'
import { Raffle } from '../../lib/types'
import useCommonStyles from '../../assets/styles'
import { useStyles } from './styles'
import { useViewport } from '../../hooks/useViewport'

type UserTicketsDialogProps = DialogProps & {
    setOpen: (isOpen: boolean) => void
    userTickets?: number[]
}

const UserTicketsDialog: FC<UserTicketsDialogProps> = ({
    setOpen,
    userTickets,
    ...props
}) => {
    return (
        <Dialog {...props} onClose={() => setOpen(false)} fullWidth={true}>
            <DialogTitle>My tickets</DialogTitle>
            <DialogContent>
                {userTickets?.map((userTicket) => (
                    <div key={userTicket}>#{userTicket + 1}</div>
                ))}
            </DialogContent>
        </Dialog>
    )
}

interface RaffleInfoSectionProps {
    raffle: Raffle
    userConnected: boolean
    userTickets?: number[]
}

const RaffleInfoSection: FC<RaffleInfoSectionProps> = ({
    userConnected,
    raffle,
    userTickets,
}) => {
    const { device } = useViewport()
    const classes = { ...useCommonStyles(), ...(useStyles({ device }) as any) }
    const [open, setOpen] = useState(false)

    return (
        <div className={classes.root}>
            <div className={classes.ticketInfo}>
                <div
                    className={classes.ticketInfoSection}
                    style={{ flexGrow: 1 }}
                >
                    <Typography variant="h4">
                        {`${getDisplayAmount(
                            raffle.proceeds.ticketPrice,
                            raffle.proceeds.mint
                        )} ◎`}
                    </Typography>
                    <Typography variant="body1" className={classes.label}>
                        Ticket Price
                    </Typography>
                </div>
                <div
                    className={classes.ticketInfoSection}
                    style={{ flexGrow: 3 }}
                >
                    <div className={classes.value}>
                        <CountUp
                            start={0}
                            end={raffle.totalTickets}
                            delay={0}
                            duration={0.8}
                            preserveValue
                            useEasing
                        >
                            {({ countUpRef }) => (
                                <Typography variant="h4" ref={countUpRef} />
                            )}
                        </CountUp>
                        <Typography variant="h4" className={classes.separator}>
                            /
                        </Typography>
                        <Typography variant="h4"> &#8734;</Typography>
                    </div>
                    <Typography variant="body1" className={classes.label}>
                        Total Tickets sold
                    </Typography>
                </div>
            </div>
            <div style={{ marginLeft: '16px', marginTop: '4px' }}>
                <Typography variant="caption">TIME REMAINING</Typography>
            </div>
            <div className={classes.raffleTimeLeft}>
                <div className={classes.timeLeftUnit}>
                    <Typography variant="h4">12</Typography>
                    <Typography variant="body1">DAYS</Typography>
                </div>
                <div className={classes.timeLeftUnit}>
                    <Typography variant="h4">12</Typography>
                    <Typography variant="body1">HOURS</Typography>
                </div>
                <div className={classes.timeLeftUnit}>
                    <Typography variant="h4">12</Typography>
                    <Typography variant="body1">MINS</Typography>
                </div>
                <div className={classes.timeLeftUnit}>
                    <Typography variant="h4">12</Typography>
                    <Typography variant="body1">SECS</Typography>
                </div>
            </div>
            {/* {userConnected && (
                <div className={classes.ticketsSection}>
                    <div className={classes.myTickets}>
                        <Typography
                            variant="overline"
                            className={classes.label}
                        >
                            My tickets
                        </Typography>
                        <div className={classes.value}>
                            <CountUp
                                start={0}
                                end={userTickets?.length ?? 0}
                                delay={0}
                                duration={0.8}
                                preserveValue
                                useEasing
                            >
                                {({ countUpRef }) => (
                                    <Typography variant="h4" ref={countUpRef} />
                                )}
                            </CountUp>
                        </div>
                    </div>
                    {userTickets?.length && (
                        <div className={classes.showMyTickets}>
                            <Button
                                variant="text"
                                size="small"
                                disableRipple
                                onClick={() => {
                                    setOpen(true)
                                }}
                                className={classes.ticketButton}
                            >
                                See my tickets
                            </Button>
                            <UserTicketsDialog
                                userTickets={userTickets}
                                open={open}
                                setOpen={setOpen}
                            />
                        </div>
                    )}
                </div>
            )} */}
        </div>
    )
}

export default RaffleInfoSection
