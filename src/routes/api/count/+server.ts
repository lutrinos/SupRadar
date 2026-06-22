

// https://lutrinos.goatcounter.com/count

export async function POST({ request, getClientAddress }) {
    request.headers.delete('cookie');
    request.headers.set('X-Forwarded-For', getClientAddress());
    request.headers.set('Host', 'lutrinos.goatcounter.com');

    const url = new URL(request.url);
    url.host = "lutrinos.goatcounter.com";
    url.port = "";
    url.pathname = url.pathname.substring(4);

    return fetch(url, {
        headers: request.headers,
        method: 'POST'
    })
}

export function GET({ request }) {
    const number = Math.floor(Math.random() * 6) + 1;

    return new Response(number.toString(), {
        headers: {
            'Content-Type': 'application/json'
        }
    });
}