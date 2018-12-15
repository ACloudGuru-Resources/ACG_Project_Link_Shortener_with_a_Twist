module.exports = async function (context, req) {

    const sql = require('mssql')

    try {
        const connection = await new sql.ConnectionPool(process.env.SqlConnectionString).connect()
        const request = connection.request()
        request.input('path', sql.VarChar, req.query.path)
        const result = await request.query('SELECT RedirectUrl FROM Links WHERE ShortenedPath = @path')
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