import Image from "next/image"
import Link from "next/link"
import { DottedSeprator } from "./dotted-seprator"
import { Navigation } from "./navigation"
import { WorkspaceSwitcher } from "./workspace-switcher"
import { Projects } from "./projects"

export const Sidebar = () => {
    return(
        <aside className="h-full bg-neutral-100 p-4 w-full">
            <Link href="/">
            <div className="flex flex-row"><Image src="/ngo-logo.svg" alt="logo" width={64} height={48}/> <p className="ml-3 mt-2">Smart <br /> NGO Management</p> </div>
            </Link>
            <DottedSeprator className="my-4"/>
                <WorkspaceSwitcher/>
            <DottedSeprator className="my-4"/>
            <Navigation/>
            <Projects/>
        </aside>
    )
}