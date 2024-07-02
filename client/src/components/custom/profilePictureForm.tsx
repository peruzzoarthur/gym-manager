import { useState } from 'react'
import { useToast } from '../ui/use-toast'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { ErrorResponse, User } from '@/types/padel.types'
import { axiosInstance } from '@/axiosInstance'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'
import { ErrorBox } from './errorBox'

type ProfilePictureFormProps = {
    refetchUser: (
        options?: RefetchOptions | undefined
    ) => Promise<QueryObserverResult<User | null, Error>>
}
export function ProfilePictureForm({ refetchUser }: ProfilePictureFormProps) {
    const [isError, setError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string | undefined>()
    const { toast } = useToast()
    const [file, setFile] = useState<File | null>(null)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setFile(event.target.files[0])
        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!file) {
            setErrorMessage('No file attached')
            setError(true)
            return
        }

        const formData = new FormData()
        formData.append('file', file)

        try {
            const data: AxiosResponse<{
                user: User
            }> = await axiosInstance.patch('users/profile-image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            toast({
                title: 'Success uploading photo',
            })

            await refetchUser()
            return data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<ErrorResponse>
                if (axiosError.response) {
                    setError(true)
                    setErrorMessage(axiosError.response.data.message)
                }
            } else {
                setError(true)
                setErrorMessage('Error updating profile picture.')
            }
        }
    }

    return (
        <div className="flex mt-6">
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-end space-y-2">
                    <Input
                        className="bg-white cursor-pointer bg-opacity-40"
                        type="file"
                        accept="image/jpeg"
                        onChange={handleFileChange}
                    />
                    <Button className="w-1/3" type="submit">
                        Upload
                    </Button>
                </div>
            </form>

            {isError && (
                <ErrorBox errorMessage={errorMessage} setError={setError} />
            )}
        </div>
    )
}
