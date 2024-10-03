// Function to create the LPS array (longest prefix suffix)
function computeLPSArray(pattern) {
    debugger
    const lps = Array(pattern.length).fill(0);
    let len = 0;
    let i = 1;

    while (i < pattern.length) {
        if (pattern[i] === pattern[len]) {
            len++;
            lps[i] = len;
            i++;
        } else {
            if (len !== 0) {
                len = lps[len - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }
    return lps;
}

// Function to perform KMP search
function KMPSearch(text, pattern) {
    const lps = computeLPSArray(pattern);
    debugger
    const result = [];
    let i = 0; // index for text
    let j = 0; // index for pattern

    while (i < text.length) {
        if (pattern[j] === text[i]) {
            i++;
            j++;
        }

        if (j === pattern.length) {
            // Pattern found at index i-j
            result.push(i - j);
            j = lps[j - 1];
        } else if (i < text.length && pattern[j] !== text[i]) {
            if (j !== 0) {
                j = lps[j - 1];
            } else {
                i++;
            }
        }
    }

    return result; // Returns indices where the pattern is found
}

// Example usage
const text = "ABABDABACDABABCABAB";
const pattern = "ABABCABAB";
const occurrences = KMPSearch(text, pattern);
console.log("Pattern found at index:", occurrences);






