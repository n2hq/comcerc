import { ActionFunctionArgs } from "@remix-run/node";
import { query } from "../DB";
import { DoResponse, GenerateRandomHash, HashPwd } from "~/lib/Lib"
import { IAddUser, LoginType, ResetPasswordType } from "~/lib/Interfaces";
import { RequestType, RequestStatus } from "~/lib/json";

export async function action({ request }: ActionFunctionArgs) {
    const contentType = request.headers.get("Content-Type")
    if (contentType !== "application/json") {
        return DoResponse({ error: "Invalid content type. Expected JSON." }, 500)
    }

    if (request.method === "POST") {
        try {

            const body: ResetPasswordType = await request.json()

            if (!body.email) {
                return DoResponse({ error: "Enter email!" }, 400)
            }

            /* if (!body.owner) {
                return DoResponse({ error: "User guid is required!" }, 400)
            } */

            {/** check if user exists */ }
            let rows: any = await query(`SELECT * FROM tbl_user 
                WHERE 
                email = ?`,
                [body.email])

            if ((rows as any[]).length <= 0) {
                return DoResponse(
                    {
                        exists: false,
                        message: "User with email does not exist!"
                    },
                    409
                )
            }
            const user = rows[0]

            {/** set the params */ }
            const title = "Password Request"
            const type = RequestType.PASSWORD_RESET
            const owner = user.user_guid
            const guid = crypto.randomUUID()
            const status = RequestStatus.OPEN

            {/** check if open reset password request exists */ }
            rows = await query(`SELECT * FROM tbl_requests 
                WHERE owner = ?
                AND status = ?
                AND type = ?`, [owner, status, type])
            if ((rows as any[]).length > 0) {
                {/** if open reset password request exists update the request */ }

                console.log(`UPDATE tbl_requests 
                    SET
                    title = '${title}',
                    type = '${type}',
                    guid = '${guid}',
                    status = '${status}'
                    WHERE
                    owner = '${owner}'
                    AND
                    type = '${type}'
                    AND
                    status = '${status}'`)
                const result = await query(`UPDATE tbl_requests 
                    SET
                    title = ?,
                    type = ?,
                    guid = ?,
                    status = ?
                    WHERE
                    owner = ?
                    AND
                    type = ?
                    AND
                    status = ?`,
                    [title, type, guid, status, owner, type, status])
            } else {

                {/** if open reset password request doesn't exist, create a new one */ }
                const result = await query(`INSERT INTO tbl_requests 
                    (title, type, owner, guid, status) values (?, ?, ?, ?, ?)`,
                    [title, type, owner, guid, status])
            }

            const data = {
                success: true,
                message: 'password reset initiated. check email to continue.',
                title: title,
                type: type,
                owner: owner,
                guid: guid,
                status: status
            }

            return DoResponse(data, 200)

        } catch (error: any) {
            return DoResponse({ message: error.message }, 500)
        }
    }

    return DoResponse({ message: "method not allowed" }, 200)
}