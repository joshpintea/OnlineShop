

export function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = JSON.stringify(data);

            if (response.status === 401 || response.status === 403) {
                // localStorage.clear();
                // window.location.reload();
            }

            return Promise.reject(error);
        }

        return data;
    });
}