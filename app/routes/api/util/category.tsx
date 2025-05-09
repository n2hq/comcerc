import { LoaderFunction } from "@remix-run/node"
import { DoResponse, GetResponse } from "~/lib/Lib"
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

        const rows: any = await query(`SELECT * FROM tbl_category`)
        if ((rows as any[]).length <= 0) {
            return GetResponse([{}], true, 200)
        }


        return GetResponse(rows, true, 200)
    }
}