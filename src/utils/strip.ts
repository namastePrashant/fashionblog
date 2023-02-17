export default function strip(html?: any) {
    let doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
}
