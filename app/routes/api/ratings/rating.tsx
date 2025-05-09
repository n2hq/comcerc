import { LoaderFunction } from "@remix-run/node"

import { DoResponse } from "~/lib/Lib"
import { query } from "../DB"

export const loader: LoaderFunction = async ({ request, params }) => {
    const contentType = request.headers.get("Content-Type")

    if (contentType !== "application/json") {
        return new Response(JSON.stringify({ error: "Invalid content type. Expected JSON." }))
    }

    try {
        const userGuid = params.user_guid
        const businessGuid = params.business_guid

        const rows: any = await query(`SELECT * from tbl_rating
            WHERE
            user_guid = ? 
            AND 
            business_guid = ?
            `, [userGuid, businessGuid])

        if ((rows as any[]).length <= 0) { return DoResponse([], 200) }

        //const listings: any[] = rows.map((listing: any) => { return (listing) })

        return DoResponse(rows[0], 200)

    } catch (error: any) {
        return DoResponse({ "error": error.message }, 500)
    }

}