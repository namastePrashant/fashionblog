import { gql } from "@apollo/client";

export const GET_LATEST_PRODUCTS = gql`
    query LatestProducts {
        products(first: 4) {
            edges {
                node {
                    id
                    title
                    slug
                    featuredImage {
                        node {
                            sourceUrl
                            srcSet
                            sizes
                        }
                    }
                }
            }
        }
    }
`;
