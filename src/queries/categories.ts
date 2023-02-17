import { gql } from "@apollo/client";

export const GET_ALL_CATEGORIES = gql`
    query getAllCategories($count: Int) {
        categories(first: $count) {
            nodes {
                id
                name
                slug
                parent {
                    node {
                        name
                        slug
                        id
                    }
                }
            }
        }
    }
`;
