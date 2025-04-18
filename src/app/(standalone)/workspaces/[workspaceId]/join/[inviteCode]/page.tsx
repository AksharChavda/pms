import { getCurrent } from "@/features/auth/queries"
import { redirect } from "next/navigation"
import { WorkspaceIdJointClient } from "./client"


const WorkspaceIdJoinPage = async() => {

    const user = await getCurrent()
    if(!user) redirect('/sign-in')

 return <WorkspaceIdJointClient/>
}

export default WorkspaceIdJoinPage