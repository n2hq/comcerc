import { ActionFunctionArgs, LoaderFunction } from "@remix-run/node"
import { query } from "../DB"
import { ListingType } from "~/lib/Interfaces"
import { DoResponse } from "~/lib/Lib"

export const loader: LoaderFunction = async ({ request, params }) => {
    const contentType = request.headers.get("Content-Type")

    if (contentType !== "application/json") {
        return new Response(JSON.stringify({ error: "Invalid content type. Expected JSON." }))
    }

    try {
        const id = params.guid_or_username
        const isFeatured = true

        const rows: any = await query(`SELECT 
            d.*,
            c.name AS country_name,
            s.name AS state_name,
            ci.name AS city_name
            FROM tbl_dir d
            LEFT JOIN tbl_country c ON d.country_code = c.iso2 AND d.country_code IS NOT NULL AND d.country_code != ''
            LEFT JOIN tbl_state s ON d.state_code = s.iso2 AND d.state_code IS NOT NULL AND d.state_code != ''
            LEFT JOIN tbl_city ci ON d.city_id = ci.id AND d.city_id IS NOT NULL AND d.city_id != ''
            WHERE (d.featured = ?)
            ORDER BY RAND()
            LIMIT 0, 10
            `, [isFeatured])

        if ((rows as any[]).length <= 0) { return DoResponse({}, 200) }

        const listings: any[] = rows.map((listing: any) => { return (listing) })

        return DoResponse(listings, 200)

    } catch (error: any) {
        return DoResponse({ "error": error.message }, 500)
    }

}

