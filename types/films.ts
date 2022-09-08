export type filmType = {
  id: number
  watched?: boolean
  url?: string
  title: string
  description?: string
  image?: string
  tags?: string[]
}

export type RootStackParamList = {
  Home?: { list: { id: number; title: string }[] }
  Details: { id: number; initialTitle: string }
}
