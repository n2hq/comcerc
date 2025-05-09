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

        /* const rows: any = await query(`SELECT 
            a.*, 
            b.image_url,
            c.*, 
            co.name AS country_name,
            st.name AS state_name,
            ci.name AS city_name
            FROM tbl_rating a
            JOIN tbl_user_profile_image b ON a.user_guid = b.user_guid
            JOIN tbl_user c ON b.user_guid = c.user_guid
            LEFT JOIN tbl_country co ON c.country_code = co.iso2
            LEFT JOIN tbl_state st ON c.state_code = st.iso2
            LEFT JOIN tbl_city ci ON c.city_id = ci.id
            WHERE a.business_guid = ?
            AND 
            co.iso2 = st.country_code
            AND 
            st.iso2 = ci.state_code`, [businessGuid]) */
        const rows: any = await query(`SELECT DISTINCT
                r.rating,
                r.fullname,
                r.comment,
                r.created_at,
                r.updated_at,
                up.image_url,
                co.name AS country_name,
                st.name AS state_name,
                ci.name AS city_name
                FROM tbl_rating r
                JOIN tbl_user u ON r.user_guid = u.user_guid
                LEFT JOIN tbl_user_profile_image up ON r.user_guid = up.user_guid
                LEFT JOIN tbl_country co ON u.country_code = co.iso2
                LEFT JOIN tbl_state st ON u.state_code = st.iso2
                LEFT JOIN tbl_city ci ON u.city_id = ci.id
                WHERE r.business_guid = ?
                GROUP BY 
                r.rating_guid`, [businessGuid])

        if ((rows as any[]).length <= 0) { return DoResponse([], 200) }

        //const listings: any[] = rows.map((listing: any) => { return (listing) })

        return DoResponse(rows, 200)

    } catch (error: any) {
        return DoResponse({ "error": error.message }, 500)
    }

}