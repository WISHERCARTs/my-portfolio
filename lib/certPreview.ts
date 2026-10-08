/** File name (without extension) of a certificate's preview image in /images/certs. */
export function certPreviewName(title: string) {
  return title
    .toLowerCase()
    .replace(/\+/g, "p")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function certPreviewSrc(title: string) {
  return `/images/certs/${certPreviewName(title)}.jpg`;
}
