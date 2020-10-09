import Prismic from 'prismic-javascript'

const apiEndpoint = `https://${process.env.NEXT_PUBLIC_PRISMIC_REPO}.prismic.io/api/v2`

export const getPrismic = req => Prismic.getApi(apiEndpoint, { req })

export const { Predicates } = Prismic
