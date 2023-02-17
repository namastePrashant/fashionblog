/** @type {import('next-sitemap').IConfig} */

const siteUrl = "https://www.example.com";

module.exports = {
    siteUrl,
    generateRobotsTxt: true,
    robotsTxtOptions: {
        policies: [
            {
                userAgent: "*",
                disallow: ["/profile", "/articles/search", "/articles/search"],
            },
            { userAgent: "*", allow: "/" },
        ],
    },
    exclude: ["/profile", "/articles/search", "/articles/search"],
};
