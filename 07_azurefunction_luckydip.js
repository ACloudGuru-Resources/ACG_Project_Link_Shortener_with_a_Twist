module.exports = async function (context, req) {

    const sql = require('mssql')

    try {
        const connection = await new sql.ConnectionPool(process.env.SqlConnectionString).connect()
        
        const request = connection.request()
        const result = await request.query('SELECT COUNT(*) as linkCount FROM Links')
        const linkCount = result.recordset[0]['linkCount']

        const offset = parseInt(Math.floor(Math.random() * linkCount))
        const request2 = connection.request()
        request2.input('offset', sql.Int, offset)
        const link = await request2.query('SELECT RedirectUrl FROM Links ORDER BY Id OFFSET @offset ROWS FETCH NEXT 1 ROWS ONLY')
        
        context.log('Lucky dip (link offset ' + offset + ') to ' + link.recordset[0].RedirectUrl)
        context.res = {
            statusCode: 302,
            headers: { "location": link.recordset[0].RedirectUrl },
            body: null
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