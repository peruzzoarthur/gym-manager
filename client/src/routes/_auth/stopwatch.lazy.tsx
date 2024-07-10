import { StopWatch } from '@/components/custom/stopWatch'
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/_auth/stopwatch')({
    component: () => (
        <div>
            <StopWatch startTime={1720579713278} running={true} />
        </div>
    ),
})
