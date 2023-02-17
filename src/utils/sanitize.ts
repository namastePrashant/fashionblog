import DOMPurify from "dompurify";

// export const sanitize = (content?:any) => {
//   return process.browser ? DOMPurify.sanitize(content) : content;
// };

export const sanitize = (content?: any) => {
    const isBrowser = typeof window !== "undefined";

    return isBrowser ? DOMPurify.sanitize(content) : content;
};
