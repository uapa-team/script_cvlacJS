module.exports = class Utils{

    /**
     * Get a substring giving its first and last part but excluding them
     * @param string{String} The string where you want to get a get a sub part
     * @param start{String} The first part of the substring you want to get
     * @param end{String} The last part of the substring you want to get
     * @returns {String} Substring
     */
    static getSubstring(string, start, end) {
        return string.substring(string.indexOf(start) + start.length, string.indexOf(end)).trim();
    }
}