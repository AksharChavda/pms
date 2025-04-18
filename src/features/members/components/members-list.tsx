"use client"

import { Card,CardContent, CardTitle,CardHeader } from "@/components/ui/card"
import { useWorkspaceId } from "../../workspaces/hooks/use-workspace-id"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeftIcon, MoreVerticalIcon } from "lucide-react"
import { DottedSeprator } from "@/components/dotted-seprator"
import { useGetMembers } from "@/features/members/api/use-get-member"
import { Fragment } from "react"
import { MemberAvatar } from "@/features/members/components/member-avatar"
import { Separator } from "@/components/ui/separator"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem
} from "@/components/ui/dropdown-menu"
import { useDeleteMember } from "@/features/members/api/use-delete-member"
import { useUpdateMember } from "@/features/members/api/use-update-member"
import { MemberRole } from "@/features/members/types"
import { useConfirm } from "@/hooks/use-confirm"


export const MemberList = () =>{
    const workspaceId = useWorkspaceId()
    const {data} = useGetMembers({workspaceId})
   
    const [ConfirmDialog, Confirm] = useConfirm(
        "Remove Member",
        "This Member will be removed",
        "destructive"
    )

    const {
        mutate: deleteMember,
        isPending: isDeletingMember
    } = useDeleteMember();

    const {
        mutate: updateMember,
        isPending: isUpdatingMember
    } = useUpdateMember()


    const handleUpdateMember=(memberId: string, role:MemberRole) =>{
        updateMember(
            {
                json: {role},
                param: {memberId}
            }
        )
    }

    const handleDelete = async(memberId:string)=>{
        const ok = await Confirm()
        if(!ok) return;

        deleteMember(
            {
                param: {memberId},
            },{
                onSuccess: ()=>{
                    window.location.reload()
                }
            }
        )
    }


    return(
        <Card className="w-full h-full border-none shadow-none">
            <ConfirmDialog/>    
           <CardHeader className="flex flex-row items-center gap-x-4 p-7 space-y-0">
           <Link href={`/workspaces/${workspaceId}`}>
                <Button
                    variant="secondary"
                    size="sm"
                    className="flex items-center"
                >
                    <ArrowLeftIcon className="size-4 mr-2"/>
                        Back
                </Button>
            </Link>
                <CardTitle className="text-xl font-bold">
                    Members List
                </CardTitle>
           </CardHeader>
           <div className="px-7">
                <DottedSeprator />
           </div>
           <CardContent className="p-7">
                {data?.documents.map((member,index)=>(
                    <Fragment key={member.$id}>
                        <div className="flex items-center gap-2">
                            <MemberAvatar
                                name={member.name}
                                className="size-10"
                                fallbackClassName="text-lg"
                            />
                            <div className="flex flex-col">
                                <p className="text-md font-medium">{member.name}</p>
                                <p className="text-sm text-muted-foreground">{member.email}</p>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                         className="ml-auto"
                                         variant="secondary"
                                         size="icon"
                                    >
                                        <MoreVerticalIcon className="size-4 text-muted-foreground"/>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent side="bottom" align="end">
                                    <DropdownMenuItem 
                                        className="font-medium"
                                        onClick={()=>handleUpdateMember(member.$id,MemberRole.ADMIN)}
                                        disabled={isUpdatingMember}
                                    >
                                        Set as Admin
                                    </DropdownMenuItem>

                                    <DropdownMenuItem 
                                        className="font-medium"
                                        onClick={()=>handleUpdateMember(member.$id,MemberRole.MEMBER)}
                                        disabled={isUpdatingMember}
                                    >
                                        Set as Member
                                    </DropdownMenuItem>

                                    <DropdownMenuItem 
                                        className="font-medium text-amber-700"
                                        onClick={()=>handleDelete(member.$id)}
                                        disabled={isDeletingMember}
                                    >
                                        Remove {member.name}
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>

                        {
                            index< data.documents.length - 1 && (
                                <Separator className="my-2.5"/>
                            )
                        }
                    </Fragment>
                ))}
           </CardContent>
        </Card>
    )
}
