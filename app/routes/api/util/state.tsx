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

        const rows: any = await query(`SELECT * FROM tbl_state WHERE country_code = ?`, [countryCode])

        if ((rows as any[]).length <= 0) {
            return DoResponse([{}], 200)
        }

        const states: any = rows.map((state: any) => {
            return ({
                name: state.name,
                country_code: state.country_code,
                id: state.iso2
            })
        })

        return DoResponse(states, 200)
    }
}