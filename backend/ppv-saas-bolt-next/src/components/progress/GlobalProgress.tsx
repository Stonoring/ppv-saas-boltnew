"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle2, Clock, AlertTriangle } from "lucide-react"

interface Task {
  id: string
  name: string
  status: "completed" | "in-progress" | "pending"
  progress: number
}

const tasks: Task[] = [
  {
    id: "1",
    name: "Document Review",
    status: "completed",
    progress: 100,
  },
  {
    id: "2",
    name: "Policy Updates",
    status: "in-progress",
    progress: 60,
  },
  {
    id: "3",
    name: "Compliance Check",
    status: "pending",
    progress: 0,
  },
]

export function GlobalProgress() {
  const getStatusIcon = (status: Task["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "pending":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
    }
  }

  const getStatusText = (status: Task["status"]) => {
    switch (status) {
      case "completed":
        return "Completed"
      case "in-progress":
        return "In Progress"
      case "pending":
        return "Pending"
    }
  }

  const overallProgress =
    tasks.reduce((acc, task) => acc + task.progress, 0) / tasks.length

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Overall Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{Math.round(overallProgress)}%</span>
            </div>
            <Progress value={overallProgress} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Task Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {tasks.map((task) => (
              <div key={task.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(task.status)}
                    <span className="font-medium">{task.name}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {getStatusText(task.status)}
                  </span>
                </div>
                <Progress value={task.progress} />
                <div className="flex justify-end">
                  <span className="text-sm text-muted-foreground">
                    {task.progress}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
