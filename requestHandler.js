class Request {

    constructor(method, body) {
        this.method = method;
        this.body = body;
        this.headers = {
            'Content-Type': 'application/json'
        }
    }

    api(url) {

        const request = {
            method: this.method,
            headers: this.headers,
            body: JSON.stringify(this.body)
        }

        return fetch('https://192.168.0.104/' + url, request).then(response => response.json()).then(data => data).catch(error => error);

    }
}