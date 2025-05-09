import { ActionFunctionArgs } from "@remix-run/node";
import { query } from "../DB";
import { DoResponse, generate7DigitNumber, GenerateRandomHash, HashPwd } from "~/lib/Lib";
import { IAddUser } from "~/lib/Interfaces";

export async function loader() {
    let users: any = null

    try {
        users = await query(`SELECT * FROM tbl_user ORDER BY date_created DESC`)
        return DoResponse(users, 200)
    } catch (error: any) {
        let errors = { "error": error.message }
        return DoResponse(errors, 500)
    }

    return new Response(JSON.stringify({ users: users }), {
        headers: { "Content-Type": "application/json" },
    });
}

export async function action({ request }: ActionFunctionArgs) {


    if (request.method === "POST") {
        try {
            const contentType = request.headers.get("Content-Type")
            if (contentType !== "application/json") {
                return DoResponse({ error: "Invalid content type. Expected JSON." }, 500)
            }

            const body: IAddUser = await request.json()

            if (!body.email || !body.first_name || !body.password) {
                return DoResponse({ error: "Missing email or firstname" }, 400)
            }

            const userGuid = crypto.randomUUID()
            const hashedPassword = HashPwd(body.password)
            const userHash = GenerateRandomHash()
            const verifyCode = generate7DigitNumber()


            {/** check if email exists */ }
            const rows: any = await query(`SELECT * FROM tbl_user WHERE email = ?`, [body.email])
            if ((rows as any[]).length > 0) {
                return DoResponse(
                    {
                        exists: true,
                        message: "Email is not available. Check your email if you tried to signed up earlier."
                    },
                    409
                )
            }

            const result = await query(`INSERT INTO tbl_user 
                (email, password, first_name, user_guid, user_hash, verify_code)
                VALUES (?, ?, ?, ?, ?, ?)`,
                [
                    body.email,
                    hashedPassword,
                    body.first_name,
                    userGuid,
                    userHash,
                    verifyCode
                ])

            const data = {
                success: true,
                message: 'User created successfully',
                userId: result.insertId,
                user_guid: userGuid,
                user_hash: userHash,
                first_name: body.first_name,
                email: body.email
            }

            return DoResponse({ requestMethod: data }, 200)

        } catch (error: any) {
            return DoResponse({ message: error.message }, 500)
        }
    }

    return DoResponse({ message: "method not allowed" }, 200)
}