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

            const url = new URL(request.url)
            let userGuid = url.searchParams.get("guid") as string
            let email = url.searchParams.get("email") as string


            if (email === undefined) {
                return DoResponse({ error: "Enter new email!" }, 400)
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

            {/** check if email change request exists */ }
            rows = await query(`SELECT * FROM tbl_requests 
                WHERE owner = ?
                AND status = ?
                AND type = ?`, [userGuid, RequestStatus.OPEN, RequestType.CHANGE_EMAIL])





            if ((rows as any[]).length <= 0) {
                return DoResponse(
                    {
                        exists: false,
                        message: "Request has expired!"
                    },
                    404
                )
            }


            {/** update the email */ }
            let result = await query(`UPDATE tbl_user 
                    SET
                    email = ? 
                    WHERE
                    user_guid = ?`,
                [email, userGuid])


            {/** update the request table */ }
            result = await query(`UPDATE tbl_requests 
                    SET
                    status = ? 
                    WHERE
                    owner = ?
                    AND
                    type = ?
                    AND
                    status = ?`,
                [RequestStatus.CLOSED, userGuid, RequestType.CHANGE_EMAIL, RequestStatus.OPEN])



            const data = {
                success: true,
                message: 'email change is successful'
            }

            return DoResponse(data, 200)

        } catch (error: any) {
            return DoResponse({ error: error.message }, 500)
        }
    }

    return DoResponse({ error: "method not allowed" }, 200)
}