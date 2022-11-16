
const handleHttp = (res, error, errorRaw) => {
    res.status(500);
    res.send({ error, description: errorRaw.message, code: errorRaw.code, errno: errorRaw.errno })
}

export { handleHttp }