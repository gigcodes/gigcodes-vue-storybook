export function utf8btoa(stringToEncode) {
    // first we convert it to utf-8
    const utf8String = encodeURIComponent(stringToEncode).replace(/%([0-9A-F]{2})/g, (_, code) =>
        String.fromCharCode(`0x${code}`)
    )

    // return base64 encoded string
    return btoa(utf8String)
}
