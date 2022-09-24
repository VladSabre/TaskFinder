export function AddTrailingSlash(url: string): string {
    return url.slice(-1) === '/' ? url : url + '/';
}