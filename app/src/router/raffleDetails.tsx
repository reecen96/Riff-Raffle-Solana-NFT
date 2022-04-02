import { FC, useCallback, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router'

import RaffleEndedScreen from '../pages/RaffleEndedScreen'
import RaffleOngoingScreen from '../pages/RaffleOngoingScreen'
import { useRafflesStore } from '../hooks/useRafflesStore'
import { Raffle } from '../lib/types'

const RaffleDetails: FC = () => {
    // const { id: raffleId } = useParams<{ id: string }>();
    console.log("FUCK1")
    const raffleId = 'BQ2CVceaCP5HSNGeByWit2a5KCKRMGzRPuX2KRKbS9HE' //hardcode to APE RAFFLE?
    const { raffles, updateRaffleById } = useRafflesStore()
    const [currentRaffle, setCurrentRaffle] = useState<Raffle>()

    const updateCurrentRaffle = useCallback(() => {
        if (updateRaffleById) updateRaffleById(raffleId)
    }, [raffleId, updateRaffleById])

    useEffect(() => {
        updateCurrentRaffle()
        const timerId = setInterval(updateCurrentRaffle, 5000)
        return () => clearInterval(timerId)
    }, [updateCurrentRaffle])

    console.log("FUCK1")
    useEffect(() => {
        if (raffles.has(raffleId)) setCurrentRaffle(raffles.get(raffleId))
    }, [raffles, raffleId])

    const isRaffleEnded = useMemo(
        () => currentRaffle && new Date() > currentRaffle.endTimestamp,
        [currentRaffle]
    )

    console.log("FUCK1")
    if (!currentRaffle) return null

    return !isRaffleEnded ? (
        <RaffleEndedScreen
            raffle={currentRaffle}
            updateRaffle={updateCurrentRaffle}
        />
    ) : (
        <RaffleOngoingScreen
            raffle={currentRaffle}
            updateRaffle={updateCurrentRaffle}
        />
    )
}

export default RaffleDetails
