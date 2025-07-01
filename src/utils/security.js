export const encryptData = (key, data) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error('Encryption error:', error);
    }
};

export const decryptData = (key) => {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Decryption error:', error);
        return null;
    }
};
export default { encryptData, decryptData };