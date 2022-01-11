

const Endpoint = {
    urlApi: 'https://api.thecatapi.com/v1/breeds',
    urlApiSearch: 'https://api.thecatapi.com/v1/breeds/search?q=',
    urlApiImage:'https://api.thecatapi.com/v1/images/'

}

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
}

export default {
    Endpoint,
    headers
};