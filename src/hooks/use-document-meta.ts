import { useEffect } from "react";

type MetaInput = {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
};

function setMeta(selector: string, attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

export function useDocumentMeta({ title, description, ogTitle, ogDescription, ogImage }: MetaInput) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) setMeta(`meta[name="description"]`, "name", "description", description);
    if (ogTitle) setMeta(`meta[property="og:title"]`, "property", "og:title", ogTitle);
    if (ogDescription) setMeta(`meta[property="og:description"]`, "property", "og:description", ogDescription);
    if (ogImage) setMeta(`meta[property="og:image"]`, "property", "og:image", ogImage);
  }, [title, description, ogTitle, ogDescription, ogImage]);
}
