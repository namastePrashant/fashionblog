import { gql } from "@apollo/client";

export const GET_POWER_LIST_USERS = gql`
    query PowerLists($count: Int, $after: String, $keyword: String) {
        powerLists(first: $count, after: $after, where: { search: $keyword }) {
            edges {
                node {
                    id
                    databaseId
                    bio {
                        plBiographicInfo
                    }
                    nameFields {
                        plName {
                            plDepartment
                            plEmailAddress
                            plFirstName
                            plHonorificPrefix
                            plHonorificSuffix
                            plLastName
                            plMiddleName
                            plOrganization
                            plPhoneNumber
                            plTitle
                        }
                    }
                    notes {
                        plNotes
                    }
                    featuredImage {
                        node {
                            altText
                            sourceUrl
                            mediaDetails {
                                height
                                width
                            }
                        }
                    }
                }
                cursor
            }
            pageInfo {
                endCursor
                hasNextPage
                hasPreviousPage
            }
        }
    }
`;
