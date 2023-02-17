export function removeLastTrailingSlash(url?: string) {
    if (typeof url !== "string") return url;
    return url.replace(/\/$/, "");
}
