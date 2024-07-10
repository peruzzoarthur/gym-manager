import { useState, useEffect, useRef } from 'react'
import { Button } from '../ui/button'
import { Timeout } from '@tanstack/react-router'
import { Card } from '../ui/card'
import { Timer, TimerOff, TimerReset } from 'lucide-react'

type StopWatchProps = {
    startTime: number
    running: boolean
}
export const StopWatch = ({ startTime, running }: StopWatchProps) => {
    const [elapsedTime, setElapsedTime] = useState<number>(0)
    const intervalIdRef = useRef<Timeout | null>(null)
    const [isRunning, setIsRunning] = useState<boolean>(running)
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

    function start() {
        setIsRunning(true)

        startTimeRef.current = Date.now() - elapsedTime
    }

    function stop() {
        setIsRunning(false)
    }

    function reset() {
        setElapsedTime(0)

        setIsRunning(false)
    }

    function formatTime() {
        // const hours = Math.floor(elapsedTime / (1000 * 60 * 60))

        const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60)

        const seconds = Math.floor((elapsedTime / 1000) % 60)

        const milliseconds = Math.floor((elapsedTime % 1000) / 10)

        // const hoursString = String(hours).padStart(2, '0')

        const minutesString = String(minutes).padStart(2, '0')

        const secondsString = String(seconds).padStart(2, '0')

        const millisecondsString = String(milliseconds).padStart(2, '0')

        return `${minutesString}:${secondsString}:${millisecondsString}`
    }

    return (
        <Card className="flex flex-col items-center justify-center w-48 h-48 rounded-full">
            <div className="text-xl">{formatTime()}</div>

            <div className="grid grid-cols-3">
                <Button onClick={start} variant="ghost">
                    <Timer />
                </Button>

                <Button onClick={stop} variant="ghost">
                    <TimerOff />
                </Button>

                <Button onClick={reset} variant="ghost">
                    <TimerReset />
                </Button>
            </div>
        </Card>
    )
}
