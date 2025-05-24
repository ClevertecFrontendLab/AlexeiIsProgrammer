const getCookie = (name: string): string | null => {
    const encodedName = encodeURIComponent(name) + '=';

    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];

        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1);
        }

        if (cookie.indexOf(encodedName) === 0) {
            return decodeURIComponent(cookie.substring(encodedName.length, cookie.length));
        }
    }

    return null;
};

export default getCookie;
