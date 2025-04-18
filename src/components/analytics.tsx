import { ProjectAnalyticsResponseType } from "@/features/projects/api/use-get-project-analytics"
import { ScrollArea,ScrollBar } from "./ui/scroll-area"
import { AnalyticsCard } from "./analytics-card"
import { DottedSeprator } from "./dotted-seprator"

export const Analytics = ({data}:ProjectAnalyticsResponseType) =>{
    return(
        <ScrollArea className="border rounded-lg w-full whitespace-nowrap shrink-0">
            <div className="w-full flex flex-row">
                <div className="flex items-center flex-1">
                    <AnalyticsCard
                        title="Total Task"
                        value={data.taskCount}
                        variant={data.taskDifference> 0? "Up" : "Down"}
                        increaseValue={data.taskDifference}
                    />
                    <DottedSeprator direction="vertical" />
                </div>
                <div className="flex items-center flex-1">
                    <AnalyticsCard
                        title="Assigneed Task"
                        value={data.assigneedTaskCount}
                        variant={data.assigneedTaskDifference> 0? "Up" : "Down"}
                        increaseValue={data.assigneedTaskDifference}
                    />
                    <DottedSeprator direction="vertical" />
                </div>
                <div className="flex items-center flex-1">
                    <AnalyticsCard
                        title="Completed Task"
                        value={data.completedTaskCount}
                        variant={data.completedTaskDifference> 0? "Up" : "Down"}
                        increaseValue={data.completedTaskDifference}
                    />
                    <DottedSeprator direction="vertical" />
                </div>
                <div className="flex items-center flex-1">
                    <AnalyticsCard
                        title="Overdue Task"
                        value={data.overdueTaskCount}
                        variant={data.overdueTaskDifference> 0? "Up" : "Down"}
                        increaseValue={data.overdueTaskDifference}
                    />
                    <DottedSeprator direction="vertical" />
                </div>
                <div className="flex items-center flex-1">
                    <AnalyticsCard
                        title="Incomplete Task"
                        value={data.incompleteTaskCount}
                        variant={data.incompleteTaskDifference> 0? "Up" : "Down"}
                        increaseValue={data.incompleteTaskDifference}
                    />
                    <DottedSeprator direction="vertical" />
                </div>
            </div>
            <ScrollBar orientation="horizontal"/>
        </ScrollArea>
    )
}