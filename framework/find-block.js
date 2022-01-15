/**
 * Finds content within a block surrounded by specific open and close tags.
 * @param {string} open
 * @param {string} close
 * @param {string} content
 * @param {number} startIndex
 * @returns {null | { startIndex: number, endIndex: number, content: string }}
 */
function findBlock(open, close, content, startIndex) {
  if (
    content[startIndex] === open[0] &&
    content.substring(startIndex, startIndex + open.length) === open
  ) {
    for (let i = startIndex; i < content.length - 1; i++) {
      if (
        content[i] === close[0] &&
        content.substring(i, i + close.length) === close
      ) {
        return {
          startIndex: startIndex,
          endIndex: i + close.length - 1,
          content: content.substring(startIndex + open.length, i),
        };
      }
    }
  }

  return null;
}

module.exports = findBlock;
