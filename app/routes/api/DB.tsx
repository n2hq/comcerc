import mysql, { Pool, PoolConnection } from "mysql2/promise";

declare global {
    var mysqlPool: Pool | null
}

let cachedPool: Pool | null = global.mysqlPool || null

const DATABASE_HOST = import.meta.env.VITE_DATABASE_HOST
const DATABASE_PORT = import.meta.env.VITE_DATABASE_PORT
const DATABASE_NAME = import.meta.env.VITE_DATABASE_NAME
const DATABASE_PASS = import.meta.env.VITE_DATABASE_PASS
const DATABASE_USER = import.meta.env.VITE_DATABASE_USER


if (!cachedPool) {
    cachedPool = global.mysqlPool = mysql.createPool({
        host: DATABASE_HOST as string,
        port: Number(DATABASE_PORT) || 3306,
        user: DATABASE_USER as string,
        password: DATABASE_PASS as string,
        database: DATABASE_NAME as string,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    })
}

export async function getConnection(): Promise<PoolConnection> {
    console.log(DATABASE_HOST)
    console.log('hello')
    return cachedPool!.getConnection()
}

export async function query<T = any>(sql: string, values: any[] = []): Promise<any> {
    const connection = await getConnection()
    try {
        const [results] = await connection.execute<any>(sql, values)
        connection.commit()
        return results
    } finally {
        connection.release()
    }
}
