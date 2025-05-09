import { LoaderFunction } from "@remix-run/node";
import { DoResponse } from "~/lib/Lib";
import { query } from "../DB";
import { EditUserType, IUser } from "~/lib/Interfaces";
import { ActionFunctionArgs } from "react-router";

export const loader: LoaderFunction = async ({ request, params }) => {
    const contentType = request.headers.get("Content-Type")

    if (contentType !== "application/json") {
        return DoResponse(
            { error: "Invalid content type. Expected JSON." }
        )
    }

    if (request.method === "GET") {
        const userHash = params.user_hash

        const rows: any = await query(`SELECT * FROM tbl_user 
            WHERE
            user_hash = ?`, [userHash])
        if ((rows as any[]).length <= 0) {
            return DoResponse({}, 200)
        }

        const users: IUser[] = rows.map((user: IUser) => {
            return ({
                email: user.email,
                first_name: user.first_name,
                hash: user.user_hash,
                guid: user.user_guid,
                active: user.active,
                deleted: user.deleted
            })
        })
        delete (rows[0].password)

        return DoResponse(users[0], 200)
    }
}

