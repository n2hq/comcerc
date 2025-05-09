import { ActionFunctionArgs, LoaderFunction } from "@remix-run/node";
import { query } from "../DB";
import { DoResponse, GenerateRandomHash, HashPwd } from "~/lib/Lib"
import { IAddUser, LoginType, ResetPasswordType } from "~/lib/Interfaces";
import { RequestStatus, RequestType } from "~/lib/json";

export const loader: LoaderFunction = async ({ request, params }) => {
    const contentType = request.headers.get("Content-Type")

    if (contentType !== "application/json") {
        return DoResponse(
            { error: "Invalid content type. Expected JSON." }
        )
    }


}

export async function action({ request, params }: ActionFunctionArgs) {
    const contentType = request.headers.get("Content-Type")
    if (contentType !== "application/json") {
        return DoResponse({ error: "Invalid content type. Expected JSON." }, 500)
    }

    if (request.method === "PUT") {
        try {

            const body: LoginType = await request.json()
            let userGuid = params.guid

            if (!body.password) {
                return DoResponse({ error: "Enter password!" }, 400)
            }

            {/** check if user exists */ }
            let rows: any = await query(`SELECT * FROM tbl_user WHERE user_guid = ?`, [userGuid])
            if ((rows as any[]).length <= 0) {
                return DoResponse(
                    {
                        exists: false,
                        message: "User with id does not exist!"
                    },
                    404
                )
            }
            const user = rows[0]

            {/** set the params */ }
            const password = body.password
            const hashedPassword = HashPwd(password)

            {/** update the password */ }
            let result = await query(`UPDATE tbl_user 
                    SET
                    password = ? 
                    WHERE
                    user_guid = ?`,
                [hashedPassword, userGuid])

            const data = {
                success: true,
                message: 'password change is successful'
            }

            return DoResponse(data, 200)

        } catch (error: any) {
            return DoResponse({ error: error.message }, 500)
        }
    }

    return DoResponse({ error: "method not allowed" }, 200)
}