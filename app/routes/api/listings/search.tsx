import { LoaderFunction } from "@remix-run/node"
import { DoResponse } from "~/lib/Lib"
import { query } from "../DB"

export const loader: LoaderFunction = async ({ request, params }) => {
    const contentType = request.headers.get("Content-Type")

    if (contentType !== "application/json") {
        return new Response(JSON.stringify({ error: "Invalid content type. Expected JSON." }))
    }

    try {
        const url = new URL(request.url)
        let criteria = url.searchParams.get("q") as string

        if (criteria === "" || criteria === null || criteria === undefined) {
            criteria = ""
        }

        let rawdata: any = await query(`SELECT * FROM tbl_dir d
            LEFT JOIN tbl_business_profile_image b ON d.gid = b.business_guid
            WHERE 
            MATCH(title, short_description) AGAINST (? IN NATURAL LANGUAGE MODE)
            OR city_id IN (SELECT id FROM tbl_city WHERE name RLIKE ?)
            OR state_code IN (SELECT iso2 FROM tbl_state WHERE name RLIKE ?)
            OR country_code IN (SELECT iso2 FROM tbl_country WHERE name RLIKE ?);
            `, [criteria, criteria, criteria, criteria])

        if (criteria === "" || criteria === null || criteria === undefined) {
            rawdata = await query(`SELECT DISTINCT
                d.*,
                co.name AS country_name,
                st.name AS state_name,
                ci.name AS city_name,
                b.image_url AS image_url 
                FROM tbl_dir d
                LEFT JOIN tbl_country co ON d.country_code = co.iso2
                LEFT JOIN tbl_state st ON d.state_code = st.iso2
                LEFT JOIN tbl_city ci ON d.city_id = ci.id
                LEFT JOIN tbl_business_profile_image b ON d.gid = b.business_guid
                GROUP BY 
                d.gid
                ORDER BY
                d.date_created
                ASC
                LIMIT 0, 50`)
        }

        const listings = rawdata.map((listing: any) => {
            delete (listing.date_created)
            delete (listing.last_updated)
            return (listing)
        })

        return DoResponse(listings, 200)

    } catch (error: any) {
        return DoResponse({ "error": error.message }, 500)
    }

}