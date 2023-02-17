import { gql } from "@apollo/client";
import { MenuFragments } from "./fragments/menu";

export const GET_MENUS = gql`
    query Menus {
        primaryMenu: menu(idType: NAME, id: "blogSitePrimary") {
            menuItems(first: 100) {
                nodes {
                    ...MenuFragments
                }
            }
        }
        footerAbout: menu(idType: NAME, id: "blogSiteAboutFooter") {
            menuItems(first: 100) {
                nodes {
                    ...MenuFragments
                }
            }
        }
        footerCategory: menu(idType: NAME, id: "blogSiteCategoryFooter") {
            menuItems(first: 100) {
                nodes {
                    ...MenuFragments
                }
            }
        }
    }
    ${MenuFragments}
`;
