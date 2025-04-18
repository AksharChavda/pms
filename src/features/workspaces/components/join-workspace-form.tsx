"use client"


import { DottedSeprator } from "@/components/dotted-seprator"
import { Button } from "@/components/ui/button"
import { Card,CardContent, CardTitle,CardHeader, CardDescription } from "@/components/ui/card"
import Link from "next/link"
import { useJoinWorkspace } from "../api/use-join-workspace"
import { useInviteCode } from "../hooks/use-invite-code"
import { useWorkspaceId } from "../hooks/use-workspace-id"
import { useRouter } from "next/navigation"

interface JoinWorkspaceFormProps{
    initialValues:{
        name:string
    }
}

export const JoinWorkspaceForm = ({
    initialValues,
}:JoinWorkspaceFormProps) => {
    const router = useRouter()
    const workspaceId = useWorkspaceId();
    const {mutate, isPending} = useJoinWorkspace();
    const inviteCode = useInviteCode();

    const onSubmit = () =>{
        mutate({
            param: {workspaceId},
            json : {code:inviteCode}
        },{
            onSuccess: ({data}) =>{
                router.push(`/workspaces/${data.$id}`)
            }
        })
    }

    return(
        <Card className="w-full h-full border-none shadow-none">
            <CardHeader className="p-7">
                <CardTitle className="text-xl font-bold">
                    Join Workspace
                </CardTitle>
                <CardDescription>
                    You&apos;ve been invited to join <strong>{initialValues.name}</strong> project
                </CardDescription>
            </CardHeader>
            <div className="px-7">
                <DottedSeprator/>
            </div>
            <CardContent className="p-7">
                <div className="flex flex-col lg:flex-row gap-2 items-center justify-between">
                    <Button
                        size="lg"
                        variant="secondary"
                        type="button"
                        asChild
                        className="w-full lg:w-fit"
                        disabled={isPending}
                    >
                        <Link href="/">Cancel</Link>
                    </Button>
                    <Button
                        size="lg"
                         type="button"
                         className="w-full lg:w-fit"
                         onClick={onSubmit}
                         disabled={isPending}
                    >
                        Join Workspace
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
}