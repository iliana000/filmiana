// import graphql from 'graphql'
import { films, tags } from '../controllers/films'

const graphql = require('graphql')

const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLSchema,
} = graphql

const TagType = GraphQLID

const FilmType = new GraphQLObjectType({
  name: 'Film',
  fields: () => ({
    id: { type: GraphQLInt },
    title: { type: GraphQLString },
    tags: { type: new GraphQLList(TagType) },
  }),
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    film: {
      type: FilmType,
      args: { id: { type: GraphQLInt } },
      resolve(parents, args) {
        // code to get data from db
        return films.find(f => f.id === args.id)
      },
    },
    films: {
      type: new GraphQLList(FilmType),
      resolve: () => films,
    },
    filmsByTag: {
      type: new GraphQLList(FilmType),
      args: { tag: { type: TagType } },
      resolve: (parents, args) =>
        films.filter(film => film.tags.includes(args.tag)),
    },
    tag: {
      type: TagType,
      args: { id: { type: GraphQLID } },
      resolve(parents, args) {
        // code to get data from db
        return tags.includes(args.id) ? args.id : tags.push(args.id)
      },
    },
    tags: {
      type: new GraphQLList(TagType),
      resolve: () => tags,
    },
  },
})

export default new GraphQLSchema({
  query: RootQuery,
})
