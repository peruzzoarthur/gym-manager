import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from '@/components/ui/drawer'
import { ProfilePictureForm } from './profilePictureForm'
import { User } from '@/types/gym.types'

import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'
import { useMediaQuery } from 'usehooks-ts'
import { Pencil1Icon } from '@radix-ui/react-icons'

type ProfilePictureDrawerDialogProps = {
    refetchUser: (
        options?: RefetchOptions | undefined
    ) => Promise<QueryObserverResult<User | null, Error>>
}

export function ProfilePictureDrawerDialog({
    refetchUser,
}: ProfilePictureDrawerDialogProps) {
    const [open, setOpen] = React.useState(false)
    const isDesktop = useMediaQuery('(min-width: 768px)')

    if (isDesktop) {
        return (
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <Button variant="ghost">
                        <Pencil1Icon />
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] flex flex-col items-center">
                    <DialogHeader>
                        <DialogTitle>Edit profile picture</DialogTitle>
                        <DialogDescription>
                            Make changes to your profile picture here.
                        </DialogDescription>
                    </DialogHeader>
                    <ProfilePictureForm refetchUser={refetchUser} />
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
                <Button variant="ghost">
                    <Pencil1Icon />
                </Button>
            </DrawerTrigger>
            <DrawerContent className="flex items-center">
                <DrawerHeader className="text-left">
                    <DrawerTitle>Edit profile picture</DrawerTitle>
                    <DrawerDescription>
                        Make changes to your profile picture here.
                    </DrawerDescription>
                </DrawerHeader>
                <ProfilePictureForm refetchUser={refetchUser} />
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline" className="mt-2">
                            Cancel
                        </Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}
