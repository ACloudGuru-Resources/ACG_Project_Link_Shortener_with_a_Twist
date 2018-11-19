module.exports = async function (context, req) {

    const sql = require('mssql')

    try {
        await sql.connect('<connection string>')
        const result = await sql.query`select 42`
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