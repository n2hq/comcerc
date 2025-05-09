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

    if (request.method === "GET") {
        const guid = params.guid

        const rows: any = await query(`SELECT * FROM tbl_user WHERE user_guid = ?`, [guid])
        if ((rows as any[]).length <= 0) {
            return DoResponse({}, 200)
        }

        const users: IUser[] = rows.map((user: IUser) => {
            return ({
                email: user.email,
                first_name: user.first_name,
                hash: user.user_hash,
                guid: user.user_guid,
                active: user.active,
                deleted: user.deleted
            })
        })
        delete (rows[0].password)

        return DoResponse(rows[0], 200)
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
            const body: EditUserType = await request.json()
            let guid = params.guid

            {/** get user */ }
            const rawuser: EditUserType[] = await query(`SELECT * FROM tbl_user WHERE user_guid = ?`, [guid])
            const user: EditUserType = rawuser[0]

            if ((rawuser as any[]).length <= 0) {
                return DoResponse({ error: "User does not exist" }, 400)
            }





            {/** assign values for update */ }
            let first_name = body.first_name as string === undefined ? user.first_name : body.first_name
            let lastname = body.lastname as string === undefined ? user.lastname : body.lastname
            let country_code = body.country_code as string === undefined ? user.country_code : body.country_code
            let state_code = body.state_code as string === undefined ? user.state_code : body.state_code
            let city_id = body.city_id as string === undefined ? user.city_id : body.city_id
            let zipcode = body.zipcode as string === undefined ? user.zipcode : body.zipcode
            let phone = body.phone as string === undefined ? user.phone : body.phone
            let address_one = body.address_one as string === undefined ? user.address_one : body.address_one
            let address_two = body.address_two as string === undefined ? user.address_two : body.address_two


            const result = await query(
                `UPDATE tbl_user SET
                first_name = ?,
                lastname = ?,
                country_code = ?,
                state_code = ?,
                city_id = ?,
                zipcode = ?,
                phone = ?,
                address_one = ?,
                address_two = ?
                WHERE user_guid = ?`,
                [
                    first_name,
                    lastname,
                    country_code,
                    state_code,
                    city_id,
                    zipcode,
                    phone,
                    address_one,
                    address_two,
                    guid
                ])

            return DoResponse({
                success: true,
                message: 'User updated successfully',
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