import { ActionFunctionArgs } from "@remix-run/node";
import { query } from "../DB";
import { DoResponse, GenerateRandomHash, HashPwd } from "~/lib/Lib"
import { ChangeEmailType, IAddUser, LoginType, ResetPasswordType } from "~/lib/Interfaces";
import { RequestType, RequestStatus } from "~/lib/json";

export async function action({ request }: ActionFunctionArgs) {
    const contentType = request.headers.get("Content-Type")
    if (contentType !== "application/json") {
        return DoResponse({ error: "Invalid content type. Expected JSON." }, 500)
    }

    if (request.method === "POST") {

        try {
            const body: ChangeEmailType = await request.json()

            if (!body.email) {
                return DoResponse({ error: "Enter email!" }, 400)
            }
            if (!body.guid) {
                return DoResponse({ error: "User / Owner Guid is required!" }, 400)
            }

            {/** check if user's guid exists */ }
            let rows: any = await query(`SELECT * FROM tbl_user WHERE user_guid = ?`, [body.guid])
            if ((rows as any[]).length <= 0) {
                return DoResponse(
                    {
                        exists: false,
                        message: "User does not exist!"
                    },
                    409
                )
            }
            const user = rows[0]

            {/** set the params */ }
            const title = "Email Change Request"
            const type = RequestType.CHANGE_EMAIL
            const owner = user.user_guid
            const guid = crypto.randomUUID()
            const status = RequestStatus.OPEN

            {/** check if open change email request exists */ }
            rows = await query(`SELECT * FROM tbl_requests 
                WHERE owner = ?
                AND status = ?
                AND type = ?`, [owner, status, type])

            if ((rows as any[]).length > 0) {
                {/** if open change email request exists update the request */ }
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

                {/** if open change email request doesn't exist, create a new one */ }
                const result = await query(`INSERT INTO tbl_requests 
                    (title, type, owner, guid, status) values (?, ?, ?, ?, ?)`,
                    [title, type, owner, guid, status])
            }

            const data = {
                success: true,
                message: 'email change request saved successfully',
                title: title,
                type: type,
                owner: owner,
                guid: guid,
                status: status
            }

            return DoResponse(data, 200)

        } catch (error: any) {
            console.log(error.message + ">>>]")
            return DoResponse({ error: error.message }, 500)
        }
    }

    return DoResponse({ error: "method not allowed" }, 200)
}