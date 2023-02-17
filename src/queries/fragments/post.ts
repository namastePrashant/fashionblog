export const PostFragment = `
    fragment PostFragment on Post{
        id
        title
        slug
        uri
        excerpt
        date
        featuredImage{
            node{
                sourceUrl
                caption
            }
        }
    }
`;
