module.exports = async function (context, req) {

    const sql = require('mssql')

    try {
        const connection = await new sql.ConnectionPool(process.env.SqlConnectionString).connect()
        const request = connection.request()
        request.input('linkkey', sql.VarChar, req.query.linkkey)
        const result = await request.query('SELECT RedirectUrl FROM Links WHERE ShortenedPath = @linkkey')
        
        if (result.recordset.length === 0) {
            context.log.warn('No record found for ' + req.query.linkkey)
            context.res = {
                body: 'Not found',
                statusCode: 404
            }
        } else {
            context.log('Redirecting `' + req.query.linkkey + '` to ' + result.recordset[0].RedirectUrl)
            context.res = {
                statusCode: 302,
                headers: { "location": result.recordset[0].RedirectUrl },
                body: null
            }
        }
    } catch (err) {
        context.log.error(err)
        context.res = {
            body: 'An error has occurred',
            statusCode: 500
        }
    }
    context.done()
};