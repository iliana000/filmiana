export type filmType = {
  _id: string
  watched?: boolean
  url?: string
  title: string
  description?: string
  image?: string
  tags?: string[]
}

export type RootStackParamList = {
  Home?: { list: { _id: string; title: string }[] }
  Details: { _id: string; initialTitle: string }
}
