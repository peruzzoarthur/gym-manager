import { ErrorAlert } from './errorAlert'

type ErrorBoxProps = {
    setError: (value: React.SetStateAction<boolean>) => void
    errorMessage: string | undefined
}

export const ErrorBox = ({ errorMessage, setError }: ErrorBoxProps) => {
    return (
        <div onClick={() => setError(false)} className="mt-4">
            <ErrorAlert message={errorMessage} />
        </div>
    )
}
