export const AuthorFragment = `
    fragment AuthorFragment on User{
        id
        name
        slug
        avatar{
            url
        }
        nicename
    }
`;
