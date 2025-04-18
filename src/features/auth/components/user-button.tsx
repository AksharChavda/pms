"use client";

import {
    Avatar,
    AvatarFallback,
} from '@/components/ui/avatar'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { DottedSeprator } from '@/components/dotted-seprator';
import { useCurrent } from "@/features/auth/api/use-current";
import { useLogout } from '../api/use-logout';
import { Loader, LogOut } from 'lucide-react';

export const UserButton = () => {
    const { data: user, isLoading } =  useCurrent();
    const {mutate: logout} = useLogout();

    if(isLoading) {
        return(
            <div className="size-10 rounded-full flex items-center justify-center bg-neutral-200 border-neutral-300">
                <Loader className='size-4 animate-spin text-muted-foreground'/>
            </div>
        )
    }

    if(!user) {
        return null;
    }

    const {name, email} = user;

    const avatarFallback = name
    ? name[0].toUpperCase()
    : email[0].toUpperCase() ?? "U"

    return(
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger className='outline-none relative'>
                <Avatar className='size-10 hover:opacity-75 transition border-neutral-300'>
                    <AvatarFallback className='bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center'> 
                        {avatarFallback}
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end' side='bottom' className='w-60' sideOffset={10}>
                <div className="flex flex-col items-center justify-center gap-2 px-2.5 py-4">
                <Avatar className='size-[52px] border border-neutral-300'>
                    <AvatarFallback className='bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center'> 
                        {avatarFallback}
                    </AvatarFallback>
                </Avatar>
                <div className='flex flex-col items-center justify-center'>
                    <p className='text-sm font-medium text-neutral-900'>
                        {name || 'User'}
                    </p>
                    <p className='text-xs text-neutral-500'>
                        {email}
                    </p>
                </div>
                </div>
                <DottedSeprator className='mb-1'/>
                <DropdownMenuItem 
                className='h-10 flex items-center justify-center text-amber-700 font-medium cursor-pointer'
                onClick={() => logout()}
                >
                    <LogOut className='size-4 mr-2'/>
                    Log Out
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}