function uniqid(prefix: string = '', moreEntropy: boolean = false): string {
    const base = Date.now().toString(36);
    let uniqueId = prefix + base;

    if (moreEntropy) {
        uniqueId += '.' + Math.random().toString(36).substr(2, 5);
    }

    return uniqueId;
}

export default uniqid;