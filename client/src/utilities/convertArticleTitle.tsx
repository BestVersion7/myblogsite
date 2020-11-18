const convertArticleTitle = (str: string) => {
    return str.replace(/\s+/g, "-").toLowerCase();
};
export default convertArticleTitle;
