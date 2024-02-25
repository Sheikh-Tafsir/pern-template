export const checkLogin = () => {
    const token = localStorage.getItem('hackInShellAccessToken');
    // console.log(token);
    return (token == null || token == undefined || token == "");
};