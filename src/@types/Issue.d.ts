interface Issue {
    _id: string
    title: string
    description: string
    status: IssueStatus
    project: Project
    project_id: string
    number: number
    comments: Comment[]
    due_date: Date
    created_at: Date
    updated_at: Date
}
