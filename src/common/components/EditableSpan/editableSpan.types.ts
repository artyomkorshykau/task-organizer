export type EditableSpanProps = {
    title: string
    onChange: (title: string, tdID: string) => void
    id: string
}