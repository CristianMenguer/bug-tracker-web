interface Comment {
    _id: string
    title: string
    text: string
    issue?: Issue
    issue_id: string
    user_id: string
    user: User
    number: number
    created_at: Date
    updated_at: Date
}
