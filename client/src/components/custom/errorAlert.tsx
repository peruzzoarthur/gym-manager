import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

type ErrorAlertProps = {
    message: string | undefined
}
export function ErrorAlert({ message }: ErrorAlertProps) {
    return (
        <Alert variant="destructive">
            <ExclamationTriangleIcon className="w-4 h-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
        </Alert>
    )
}
