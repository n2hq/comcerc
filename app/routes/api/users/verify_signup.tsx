import { DoResponse } from "~/lib/Lib"
import { query } from "../DB"
import { VerifiedStatus } from "~/lib/Constants"
import { ActionFunctionArgs } from "@remix-run/node"

export async function action({ request, params }: ActionFunctionArgs) {
    const contentType = request.headers.get("Content-Type")
    if (contentType !== "application/json") {
        return DoResponse({ error: "Invalid content type. Expected JSON." }, 500)
    }

    if (request.method === "PUT") {
        try {

            const body: any = await request.json()
            let userHash = params.user_hash
            let code = body.code



            {/** check if user exists */ }
            let rows: any = await query(`SELECT * FROM tbl_user 
                WHERE
                user_hash = ?`, [userHash])
            if ((rows as any[]).length <= 0) {
                return DoResponse(
                    {
                        exists: false,
                        message: "User with hash does not exist!"
                    },
                    500
                )
            }
            const user = rows[0]



            {/** verify signup */ }
            {/** check if open request exists */ }
            rows = await query(`SELECT * FROM tbl_user 
                WHERE
                user_hash = ?
                AND
                is_verified = ?
                `, [userHash, VerifiedStatus.OK])

            if ((rows as any[]).length > 0) {
                return DoResponse(
                    {
                        exists: false,
                        message: "You have been verified! You can now signin with your email and password."
                    },
                    500
                )
            }

            let result = await query(`UPDATE tbl_user 
                    SET
                    is_verified = ? 
                    WHERE
                    user_hash = ?`,
                [VerifiedStatus.OK, userHash])


            const data = {
                success: true,
                message: 'Sign up is complete. You can now signin with your email and password! Redirecting...'
            }

            return DoResponse(data, 200)

        } catch (error: any) {

            return DoResponse({ message: error.message }, 500)
        }
    }

    return DoResponse({ message: "method not allowed" }, 500)
}