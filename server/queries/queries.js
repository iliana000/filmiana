// import { gql } from 'apollo-server'
import { gql } from '@apollo/client'

export const filmsQuery = gql`
  {
    films {
      _id
      title
      tags {
        name
      }
    }
  }
`

export const getFilmQuery = gql`
  query ($_id: ID!) {
    film(_id: $_id) {
      _id
      title
      # image
      # url
      # description
      tags {
        _id
        name
      }
    }
  }
`

export const addFilmQuery = gql`
  mutation (
    $title: String!
    $image: String
    $url: String
    $description: String # $tags: [String]
  ) {
    addFilm(
      title: $title
      image: $image
      url: $url
      description: $description
      # tags: $tags
      watched: false
    ) {
      title
    }
  }
`
