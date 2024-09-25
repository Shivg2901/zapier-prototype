export function parse(text: string | undefined, values: any, startDelimeter = "{", endDelimeter = "}") {
    if (text === undefined) {
        console.warn("parse function received undefined text");
        return "";
    }

    let startIndex = 0;
    let endIndex = 1;
    let finalString = "";

    while (endIndex < text.length) {
        if (text[startIndex] === startDelimeter) {
            let endPoint = startIndex + 1;
            while (endPoint < text.length && text[endPoint] !== endDelimeter) {
                endPoint++;
            }
            if (endPoint >= text.length) {
                console.warn(`Unclosed delimiter in text: ${text}`);
                return text;
            }
            let stringHoldingValue = text.slice(startIndex + 1, endPoint);
            const keys = stringHoldingValue.split(".");
            let localValues = { ...values };
            for (let i = 0; i < keys.length; i++) {
                if (typeof localValues === "string") {
                    try {
                        localValues = JSON.parse(localValues);
                    } catch (e) {
                        console.warn(`Failed to parse JSON: ${localValues}`);
                        return text;
                    }
                }
                localValues = localValues?.[keys[i]];
                if (localValues === undefined) {
                    console.warn(`Undefined value for key: ${keys[i]}`);
                    return text;
                }
            }
            finalString += localValues;
            startIndex = endPoint + 1;
            endIndex = endPoint + 2;
        } else {
            finalString += text[startIndex];
            startIndex++;
            endIndex++;
        }
    }
    if (startIndex < text.length) {
        finalString += text[startIndex];
    }
    return finalString;
}
