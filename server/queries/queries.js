import { gql } from 'apollo-server'

const films = gql`
  {
    film {
      image
      title
    }
  }
`
