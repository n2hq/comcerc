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

    return DoResponse({
        success: false,
        message: "method not allowed"
    }, 405)
}

export const action = async ({ request, params }: ActionFunctionArgs) => {

    const contentType = request.headers.get("Content-Type")

    if (contentType !== "application/json") {
        return DoResponse(
            { error: "Invalid content type. Expected JSON." }
        )
    }

    if (request.method === "PUT") {
        try {

            {/**get param and post body */ }
            const body: EditUserType = await request.json()
            let guid = params.guid

            {/** get user */ }
            const rawuser: EditUserType[] = await query(`SELECT * FROM tbl_user WHERE user_guid = ?`, [guid])
            const user: EditUserType = rawuser[0]

            if ((rawuser as any[]).length <= 0) {
                return DoResponse({ error: "User does not exist" }, 400)
            }





            {/** assign values for update */ }
            let active = body.active as boolean === undefined ? user.active : body.active

            const result = await query(
                `UPDATE tbl_user SET
                active = ? 
                WHERE user_guid = ?`,
                [
                    active,
                    guid
                ])

            return DoResponse({
                success: true,
                message: `User ${active ? 'activated' : 'deactivated'} successfully`,
                user: body
            }, 200)
        }
        catch (error: any) {
            console.log(error.message)
            return DoResponse({ error: error.message }, 500)
        }
    }

    if (request.method === "DELETE") {
        try {
            {/**get param and post body */ }
            let guid = params.guid

            {/** get user */ }
            const rawuser: any = await query(`SELECT * FROM tbl_user WHERE user_guid = ?`, [guid])
            const user: EditUserType = rawuser[0]

            if ((rawuser as any[]).length <= 0) {
                return DoResponse({
                    success: false,
                    error: "User does not exist"
                }, 404)
            }

            const result = await query(
                `DELETE FROM tbl_user
                WHERE user_guid = ?`,
                [guid])

            const data = {
                message: `User ${guid} deleted successfully`
            }

            return DoResponse(data, 200)

        } catch (error: any) {
            return DoResponse({ error: error.message }, 500)
        }
    }

    return DoResponse({
        success: false,
        message: "method not allowed"
    }, 405)
}