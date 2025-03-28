export function getDateString(): string {
    return new Date().toLocaleDateString("ja-JP", {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    }).replaceAll(/[:/ ]/g, '-')
}

function blobToDataURL(blob: Blob): Promise<string> {
    return new Promise((resolve, _) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
    })
}

export async function blobToBase64(blob: Blob):Promise<string> {
    const dataurl = await blobToDataURL(blob)
    return dataurl.split(",")[1]
}