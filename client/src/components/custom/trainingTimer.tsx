import { useState, useEffect, useRef } from 'react'
import { Timeout } from '@tanstack/react-router'
import { Card } from '../ui/card'

type TrainingTimerProps = {
    startTime: number
}
export const TrainingTimer = ({ startTime }: TrainingTimerProps) => {
    const [elapsedTime, setElapsedTime] = useState<number>(0)
    const intervalIdRef = useRef<Timeout | null>(null)
    const [isRunning] = useState<boolean>(true)
    const startTimeRef = useRef<number>(startTime)

    useEffect(() => {
        if (isRunning) {
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current)
            }, 10)
        }

        return () => {
            clearInterval(intervalIdRef.current ?? undefined)
        }
    }, [isRunning])

    function formatTime() {
        const hours = Math.floor(elapsedTime / (1000 * 60 * 60))

        const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60)

        const seconds = Math.floor((elapsedTime / 1000) % 60)

        const milliseconds = Math.floor((elapsedTime % 1000) / 10)

        const hoursString = String(hours).padStart(2, '0')

        const minutesString = String(minutes).padStart(2, '0')

        const secondsString = String(seconds).padStart(2, '0')

        const millisecondsString = String(milliseconds).padStart(2, '0')

        return `${hoursString}:${minutesString}:${secondsString}:${millisecondsString}`
    }

    return (
        <Card className="flex flex-col items-center justify-center w-24 h-10 p-2 rounded-full">
            <p className="text-sm font-bold">{formatTime()}</p>
        </Card>
    )
}
