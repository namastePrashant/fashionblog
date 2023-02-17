import { gql } from "@apollo/client";

export const GET_ALL_TAGS = gql`
    query getAllTags($count: Int) {
        tags(first: $count) {
            nodes {
                name
                slug
                uri
            }
        }
    }
`;
