module.exports = class Utils {

    /**
     * Get a substring giving its first and last part but excluding them
     * Gets (start, end) not [starts,end]
     * @param string{String} The string where you want to get a get a sub part
     * @param start{String} The first part of the substring you want to get
     * @param end{any} The last part of the substring you want to get
     * @returns {String} Substring
     */
    static getSubstring(string, start, end) {

        const startIndex = string.indexOf(start) + start.length;
        const endIndex = end === -1 ? undefined : string.indexOf(end);

        return string.substring(startIndex, endIndex).trim();
    }


}