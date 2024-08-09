export function modifyDropboxUrl(url) {
    if (!url) return '';
    return url.replace("dl=1", "raw=1");
  }
  