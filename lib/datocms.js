import { GraphQLClient } from 'graphql-request'

export const request = data => {
  const { query, variables, preview } = data

  const endpoint = preview
    ? `https://graphql.datocms.com/preview`
    : `https://graphql.datocms.com/`

  const client = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${process.env.NEXT_PUBLIC_DATOCMS_API_TOKEN}`,
    },
  })

  return client.request(query, variables)
}
