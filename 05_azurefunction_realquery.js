module.exports = async function (context, req) {

    const sql = require('mssql')

    try {
        const connection = await new sql.ConnectionPool(process.env.SqlConnectionString).connect()
        const request = connection.request()
        request.input('linkkey', sql.VarChar, req.query.linkkey)
        const result = await request.query('SELECT RedirectUrl FROM Links WHERE ShortenedPath = @linkkey')
        context.res = {
            body: result
        }
    } catch (err) {
        context.log(err)
        context.res = {
            body: 'An error has occurred',
            statusCode: 500
        }
    }
    context.done()
};