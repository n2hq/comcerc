import { LoaderFunction } from "@remix-run/node"
import { DoResponse } from "~/lib/Lib"
import { query } from "../DB"
import { Country, State } from "~/lib/Interfaces"

export const loader: LoaderFunction = async ({ request, params }) => {
    const contentType = request.headers.get("Content-Type")

    if (contentType !== "application/json") {
        return DoResponse(
            { error: "Invalid content type. Expected JSON." }
        )
    }

    if (request.method === "GET") {


        const rows: any = await query(`SELECT * FROM tbl_country`)
        if ((rows as any[]).length <= 0) {
            return DoResponse({}, 200)
        }

        const countries: any = rows.map((country: any) => {
            return ({
                name: country.name,
                id: country.iso2
            })
        })

        return DoResponse(countries, 200)
    }
}