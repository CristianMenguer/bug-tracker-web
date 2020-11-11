interface Project {
    _id: string
    slug: string
    name: string
    description: string
    issues: Issue[]
    created_at: Date
    updated_at: Date
}
