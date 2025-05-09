import { LoaderFunction } from "@remix-run/node"
import { DoResponse } from "~/lib/Lib"
import { query } from "../DB"
import { State } from "~/lib/Interfaces"

export const loader: LoaderFunction = async ({ request, params }) => {
    const contentType = request.headers.get("Content-Type")

    if (contentType !== "application/json") {
        return DoResponse(
            { error: "Invalid content type. Expected JSON." }
        )
    }

    if (request.method === "GET") {
        const url = new URL(request.url);
        const countryCode = url.searchParams.get("country_code");
        const stateCode = url.searchParams.get("state_code");


        console.log(`statecode: ${stateCode}`)
        console.log(`countrycode: ${countryCode}`)
        const rows: any = await query(`SELECT * FROM tbl_city 
            WHERE
            country_code = ?
            AND
            state_code = ?`, [countryCode, stateCode])

        if ((rows as any[]).length <= 0) {
            return DoResponse([{}], 200)
        }

        const cities: any = rows.map((city: any) => {
            return ({
                name: city.name,
                country_code: city.country_code,
                state_code: city.state_code,
                id: city.id
            })
        })

        return DoResponse(cities, 200)
    }
}