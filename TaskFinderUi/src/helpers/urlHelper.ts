export function AddTrailingSlash(url: string): string {
    return url.slice(-1) === '/' ? url : url + '/';
}

export function RemoveTrailingSlash(url: string): string {
    return url.slice(-1) === '/' ? url.substring(0, url.length - 1) : url;
}