import { ActionFunctionArgs, LoaderFunction } from "@remix-run/node"
import { query } from "../../DB"
import { ListingType } from "~/lib/Interfaces"
import { DoResponse, GenerateRandomHash } from "~/lib/Lib"


export const loader: LoaderFunction = async ({ request, params }) => {
    const contentType = request.headers.get("Content-Type")

    /* if (contentType !== "application/json") {
        return new Response(JSON.stringify({ error: "Invalid content type. Expected JSON." }))
    } */

    const buid = params.buid
    const user_guid = params.user_guid

    try {
        const rawdata: any = await query(`SELECT * FROM tbl_selected_facility_features`)
        return DoResponse(rawdata, 200)

    } catch (error: any) {
        return DoResponse({ "error": error.message }, 500)
    }

}

export async function action({ request, params }: ActionFunctionArgs) {
    const contentType = request.headers.get("Content-Type")

    if (contentType !== "application/json") {
        return new Response(JSON.stringify({ error: "Invalid content type. Expected JSON." }))
    }

    if (request.method === "POST") {

        try {


            const body: any = await request.json()
            const userGuid = body.user_guid
            const businessGuid = body.business_guid
            const selected = body.selected
            console.log(body)
            //return DoResponse(body, 200)


            // Clear old features
            await query(`DELETE FROM tbl_selected_facility_features 
                WHERE 
                user_guid = ? 
                AND 
                business_guid = ?
                `, [userGuid, businessGuid])


            if (selected.length > 0) {
                const vals = selected.map(async (feature: any) => {
                    try {
                        const guid = crypto.randomUUID()
                        await query(`INSERT INTO tbl_selected_facility_features 
                    (user_guid, business_guid, feature_id, user_description, guid) VALUES (?, ?, ?, ?, ?)`,
                            [userGuid, businessGuid, feature.feature_id, feature.user_description, guid])
                    } catch (error: any) {
                        console.log('>>>>>bumbum')
                        return DoResponse({ error: error.message }, 405)
                    }
                })
            }




            const gid = crypto.randomUUID()

            const data = {
                message: 'Features added successfully',
                data: body,
                user_guid: userGuid,
                business_guid: businessGuid
            }

            return new Response(JSON.stringify(data), { status: 201 })
        } catch (error: any) {
            console.log(error.message)
            return new Response(JSON.stringify({ error: error.message }), { status: 500 })
        }
    }
}