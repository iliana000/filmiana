// import graphql from 'graphql'
import { filmType } from '../../types/films'
// import { films, tags } from '../controllers/films'
import Film from '../models/film'
import Tag from '../models/tag'

const graphql = require('graphql')

const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLSchema,
  GraphQLNonNull
} = graphql

const TagType = new GraphQLObjectType({
  name: 'Tag',
  fields: () => ({
    _id: { type: GraphQLID },
    name: { type: GraphQLString },
  }),
})

const FilmType = new GraphQLObjectType({
  name: 'Film',
  fields: () => ({
    _id: { type: GraphQLID },
    title: { type: GraphQLString },
    tags: {
      type: new GraphQLList(TagType),
      resolve(parent: filmType) {
        return parent.tags?.map((_id: string) => Tag.findById(_id))
      }
    },
  }),
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    film: {
      type: FilmType,
      args: { _id: { type: GraphQLID } },
      resolve(_parents: any, args: { _id: string }) {
        return Film.findById(args._id)
      },
    },
    films: {
      type: new GraphQLList(FilmType),
      resolve: () => Film.find({}),
    },
    filmsByTag: {
      type: new GraphQLList(FilmType),
      args: { tag: { type: GraphQLString } },
      // @ts-ignore
      resolve: (_parents: any, args: { tag: string }) =>{
        // films.filter(film => film.tags?.includes(args.tag))
      }
    },
    tag: {
      type: TagType,
      args: { _id: { type: GraphQLID } },
      resolve(_parents: any, args: { _id: string }) {
        return Tag.findById(args._id)
      },
    },
    tags: {
      type: new GraphQLList(TagType),
      resolve: () => Tag.find({}),
    },
  },
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addFilm: {
      type: FilmType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) },
        url: { type: GraphQLString },
        image: { type: GraphQLString },
        watched: { type: new GraphQLNonNull(graphql.GraphQLBoolean) },
        description: { type: GraphQLString },
        // tags: { type: new GraphQLList(TagType) }
      },
      resolve(_parents: any, args: any) {
        const film = new Film({
          title: args.title,
          url: args.url,
          image: args.image,
          watched: args.watched,
          description: args.description,
          tags: args.tags,
        })
        return film.save()
      },
    },
    addTag: {
      type: TagType,
      args: { name: { type: GraphQLString } },
      resolve(_parents: any, args: { name: string }) {
        const tag = new Tag({
          name: args.name
        })
        return tag.save()
      },
    },
  },
})

export default new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
})
