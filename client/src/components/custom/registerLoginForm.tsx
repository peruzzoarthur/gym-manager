import { Button } from '@/components/ui/button'
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form'
import { motion } from 'framer-motion'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useForm } from 'react-hook-form'
import { registerSchema } from '@/components/validators/register'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { ArrowRight, CalendarIcon } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import axios, { AxiosError, AxiosResponse } from 'axios'
import { ErrorResponse, User } from '@/types/gym.types'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { format } from 'date-fns'
import { Calendar } from '../ui/calendar'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '../ui/select'
import { Label } from '../ui/label'
import { useNavigate } from '@tanstack/react-router'
import { ErrorBox } from './errorBox'

type RegisterInput = z.infer<typeof registerSchema>

export default function RegisterLoginForm() {
    const [year, setYear] = useState<string>('')
    const [defaultMonth, setDefaultMonth] = useState<Date>(
        '' as unknown as Date
    )
    const [isError, setError] = useState<boolean>(false)
    const [errorMessage, setErrorMessage] = useState<string | undefined>()
    const { toast } = useToast()
    const [formStep, setFormStep] = React.useState(0)
    const form = useForm<RegisterInput>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            dob: '' as unknown as Date,
            password: '',
            confirmPassword: '',
        },
    })

    const navigate = useNavigate()

    const onSubmit = async (input: RegisterInput) => {
        try {
            const requestBody: Partial<RegisterInput> = {
                firstName: input.firstName,
                lastName: input.lastName,
                email: input.email,
                dob: input.dob,
                password: input.password,
                confirmPassword: input.confirmPassword,
            }

            if (input.confirmPassword !== input.password) {
                toast({
                    title: 'Passwords do not match',
                    variant: 'destructive',
                })
                return
            }

            const data: AxiosResponse<User> = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/users/`,
                requestBody
            )
            navigate({ to: '/login' })
            toast({
                title: 'Success',
            })
            return data.data
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<ErrorResponse>
                if (axiosError.response && axiosError.response.status === 409) {
                    setError(true)
                    setErrorMessage('Email already in use.')
                }
            } else {
                setError(true)
                setErrorMessage('Error creating user.')
            }
        }
    }

    return (
        <div className="flex justify-center mt-20">
            <Card className="min-w-[380px]">
                <CardHeader>
                    <CardTitle>Register</CardTitle>
                    <CardDescription>
                        Start playing with us today.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="relative space-y-3 overflow-x-hidden"
                        >
                            <motion.div
                                className={cn('space-y-3', {
                                    // hidden: formStep == 1,
                                })}
                                // formStep == 0 -> translateX == 0
                                // formStep == 1 -> translateX == '-100%'
                                animate={{
                                    translateX: `-${formStep * 100}%`,
                                }}
                                transition={{
                                    ease: 'easeInOut',
                                }}
                            >
                                {/* firstName */}
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>First name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter your first name..."
                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                {/* lastName */}
                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Last name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter your last name..."
                                                    {...field}
                                                />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* email */}
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter your email..."
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* year */}

                                <FormField
                                    control={form.control}
                                    name="dob"
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Date of birth</FormLabel>
                                            <Label className="text-muted-foreground">
                                                Select year
                                            </Label>
                                            <div className="flex flex-col items-center justify-end space-y-2">
                                                <Select
                                                    onValueChange={(value) => {
                                                        setYear(value)
                                                        setDefaultMonth(
                                                            new Date(
                                                                Number(value),
                                                                5
                                                            )
                                                        )
                                                    }}
                                                    defaultValue={year}
                                                >
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Select year" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {Array.from(
                                                            { length: 101 },
                                                            (_, i) =>
                                                                (
                                                                    2024 - i
                                                                ).toString()
                                                        ).map((y, index) => (
                                                            <SelectItem
                                                                value={y}
                                                                key={index}
                                                            >
                                                                {y}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <Label className="text-muted-foreground">
                                                Select date
                                            </Label>
                                            <div className="flex flex-col items-center justify-end space-y-2">
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <FormControl>
                                                            <Button
                                                                variant={
                                                                    'outline'
                                                                }
                                                                className={cn(
                                                                    'w-[180px]  pl-3 text-left font-normal',
                                                                    !field.value &&
                                                                        'text-muted-foreground'
                                                                )}
                                                            >
                                                                {field.value ? (
                                                                    format(
                                                                        field.value,
                                                                        'PPP'
                                                                    )
                                                                ) : (
                                                                    <span>
                                                                        Pick a
                                                                        date
                                                                    </span>
                                                                )}
                                                                <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                                                            </Button>
                                                        </FormControl>
                                                    </PopoverTrigger>
                                                    <PopoverContent
                                                        className="w-auto p-0"
                                                        align="start"
                                                    >
                                                        <Calendar
                                                            initialFocus
                                                            mode="single"
                                                            selected={
                                                                new Date(
                                                                    field.value
                                                                )
                                                            }
                                                            defaultMonth={
                                                                defaultMonth
                                                            }
                                                            onSelect={
                                                                field.onChange
                                                            }
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </div>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </motion.div>
                            <motion.div
                                className={cn(
                                    'space-y-3 absolute top-0 left-0 right-0',
                                    {
                                        // hidden: formStep == 0,
                                    }
                                )}
                                // formStep == 0 -> translateX == 100%
                                // formStep == 1 -> translateX == 0
                                animate={{
                                    translateX: `${100 - formStep * 100}%`,
                                }}
                                style={{
                                    translateX: `${100 - formStep * 100}%`,
                                }}
                                transition={{
                                    ease: 'easeInOut',
                                }}
                            >
                                {/* password */}
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter your password..."
                                                    {...field}
                                                    type="password"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {/* confirm password */}
                                <FormField
                                    control={form.control}
                                    name="confirmPassword"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Confirm password
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Please confirm your password..."
                                                    {...field}
                                                    type="password"
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </motion.div>
                            <div className="flex gap-2">
                                <Button
                                    type="submit"
                                    className={cn({
                                        hidden: formStep == 0,
                                    })}
                                >
                                    Submit
                                </Button>
                                <Button
                                    type="button"
                                    variant={'ghost'}
                                    className={cn({
                                        hidden: formStep == 1,
                                    })}
                                    onClick={() => {
                                        // validation
                                        form.trigger([
                                            'email',
                                            'firstName',
                                            'dob',
                                            'lastName',
                                        ])
                                        const emailState =
                                            form.getFieldState('email')
                                        const firstNameState =
                                            form.getFieldState('firstName')
                                        const dobState =
                                            form.getFieldState('dob')
                                        const lastNameState =
                                            form.getFieldState('lastName')

                                        if (
                                            !emailState.isDirty ||
                                            emailState.invalid
                                        )
                                            return
                                        if (
                                            !firstNameState.isDirty ||
                                            lastNameState.invalid
                                        )
                                            return
                                        if (
                                            !dobState.isDirty ||
                                            dobState.invalid
                                        )
                                            return
                                        if (
                                            !lastNameState.isDirty ||
                                            lastNameState.invalid
                                        )
                                            return

                                        setFormStep(1)
                                    }}
                                >
                                    Next Step
                                    <ArrowRight className="w-4 h-4 ml-2" />
                                </Button>
                                <Button
                                    type="button"
                                    variant={'ghost'}
                                    onClick={() => {
                                        setFormStep(0)
                                    }}
                                    className={cn({
                                        hidden: formStep == 0,
                                    })}
                                >
                                    Go Back
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
            {isError && (
                <ErrorBox errorMessage={errorMessage} setError={setError} />
            )}
        </div>
    )
}
