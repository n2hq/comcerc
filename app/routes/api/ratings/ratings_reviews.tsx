import { LoaderFunction } from "@remix-run/node"

import { DoResponse } from "~/lib/Lib"
import { query } from "../DB"

export const loader: LoaderFunction = async ({ request, params }) => {
    const contentType = request.headers.get("Content-Type")

    if (contentType !== "application/json") {
        return new Response(JSON.stringify({ error: "Invalid content type. Expected JSON." }))
    }

    try {
        const businessGuid = params.business_guid

        const rows: any = await query(`SELECT 
            AVG(a.rating) as rating_average,
            SUM(a.rating) as rating_sum, 
            COUNT(a.rating) AS rating_count 
            FROM 
            tbl_rating a 
            WHERE 
            a.business_guid = ?`,
            [businessGuid])

        return DoResponse(rows[0], 200)

    } catch (error: any) {
        return DoResponse({ "error": error.message }, 500)
    }
}