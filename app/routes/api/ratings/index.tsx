import { ActionFunctionArgs, LoaderFunction } from "@remix-run/node"
import { IAddUser, Rating } from "~/lib/Interfaces"
import { DoResponse, GenerateRandomHash, HashPwd } from "~/lib/Lib"
import { query } from "../DB"

export const loader: LoaderFunction = async ({ request, params }) => {

    return DoResponse({
        success: false,
        message: "method not allowed"
    }, 405)


}

export async function action({ request }: ActionFunctionArgs) {
    const contentType = request.headers.get("Content-Type")
    if (contentType !== "application/json") {
        return DoResponse({ error: "Invalid content type. Expected JSON." }, 500)
    }

    if (request.method === "POST") {
        try {


            const body: Rating = await request.json()

            if (!body.business_guid) {
                return DoResponse({ error: "Please fill all information!" }, 400)
            }

            if (!body.user_guid) {
                return DoResponse({ error: "User GUID empty!" }, 400)
            }
            if (!body.rating) {
                return DoResponse({ error: "Rating empty!" }, 400)
            }
            if (!body.comment) {
                return DoResponse({ error: "Please enter comment!" }, 400)
            }
            if (!body.fullname) {
                return DoResponse({ error: "Please enter full name!" }, 400)
            }


            const userGuid = body.user_guid
            const businsessGuid = body.business_guid
            const rating = body.rating
            const comment = body.comment
            const fullname = body.fullname
            const ratingGuid = crypto.randomUUID()

            {/** check if rating exists */ }
            const rows: any = await query(`SELECT * FROM tbl_rating 
                WHERE
                user_guid = ?
                AND
                business_guid = ?`,
                [
                    userGuid,
                    businsessGuid
                ])



            if ((rows as any[]).length > 0) {
                {/** update if rating exists */ }
                const result = await query(`UPDATE tbl_rating 
                    SET 
                    rating = ?, 
                    comment = ?, 
                    fullname = ?  
                    WHERE
                    user_guid = ? 
                    AND 
                    business_guid = ?`,
                    [
                        rating,
                        comment,
                        fullname,
                        userGuid,
                        businsessGuid
                    ])
            } else {
                {/** insert if it doesn't exist */ }

                const result = await query(`INSERT INTO tbl_rating 
                    (rating, comment, fullname, user_guid, business_guid, rating_guid)
                    VALUES
                    (?, ?, ?, ?, ?, ?)`,
                    [
                        rating,
                        comment,
                        fullname,
                        userGuid,
                        businsessGuid,
                        ratingGuid
                    ])
            }

            let responseData = null

            if ((rows as any[]).length > 0) {
                body.rating_guid = rows[0].rating_guid
                responseData = {
                    success: true,
                    message: "rating updated successfully",
                    data: body
                }
            } else {
                body.rating_guid = ratingGuid
                responseData = {
                    success: true,
                    message: "rating created successfully",
                    data: body
                }
            }


            return DoResponse(responseData, 200)

        } catch (error: any) {
            return DoResponse({ error: error.message }, 500)
        }
    }

    return DoResponse({ error: "method not allowed" }, 200)
}