import { ActionFunctionArgs, LoaderFunction } from "react-router"
import { EditUserType } from "~/lib/Interfaces"
import { DoResponse } from "~/lib/Lib"
import { query } from "../../DB"


export const loader: LoaderFunction = async ({ request, params }) => {
    const contentType = request.headers.get("Content-Type")

    /* if (contentType !== "application/json") {
        return new Response(JSON.stringify({ error: "Invalid content type. Expected JSON." }))
    } */

    const businessGuid = params.business_guid
    const userGuid = params.user_guid

    try {
        const rawdata: any = await query(`SELECT * FROM tbl_dir 
            WHERE 
            gid = ? 
            AND 
            owner = ?
            ORDER BY date_created DESC`, [businessGuid, userGuid])



        return DoResponse(rawdata, 200)

    } catch (error: any) {
        return DoResponse({ "error": error.message }, 500)
    }

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
            const body: any = await request.json()
            let userGuid = params.user_guid
            let businessGuid = params.business_guid




            {/** get user */ }
            const listings: any[] = await query(`SELECT * FROM tbl_dir 
                WHERE
                owner = ?
                AND
                gid = ?`, [userGuid, businessGuid])

            const listing: any = listings[0]

            if ((listings as any[]).length <= 0) {
                return DoResponse({ error: "Business does not exist" }, 400)
            }

            {/** assign values for update */ }
            let active = body.active as boolean === undefined ? listing.active : body.active

            const result = await query(
                `UPDATE tbl_dir SET
                active_status = ? 
                WHERE owner = ?
                AND
                gid = ?`,
                [
                    active,
                    userGuid,
                    businessGuid
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

    return DoResponse({
        success: false,
        message: "method not allowed"
    }, 405)
}