module.exports = class Utils {

    /**
     * Get the first substring occurrence giving its first and last part but excluding them
     * Example: (start, end) not [starts,end]
     * @param string{String} The string from you want to get a sub part
     * @param start{String} The first part of the substring you want to get
     * @param end{any} The last part of the substring you want to get
     * @returns {String} Substring
     */
    static getSubstring(string, start, end) {
        string = string.slice(string.indexOf(start) + start.length);
        const endIndex = end === -1 ? undefined : string.indexOf(end);
        return string.substring(0, endIndex).trim();
    }

    /**
     * Get the last substring occurrence giving its first and last part but excluding them.
     * Example: (start, end) not [starts,end]
     * @param string{String} The string from you want to get a sub part
     * @param start{String} The first part of the substring you want to get
     * @param end{any} The last part of the substring you want to get
     * @returns {String} Substring
     */
    static getLastSubstring(string, start, end) {
        string = string.slice(string.lastIndexOf(start) + start.length);
        const endIndex = end === -1 ? undefined : string.lastIndexOf(end);
        return string.substring(0, endIndex).trim();
    }
}