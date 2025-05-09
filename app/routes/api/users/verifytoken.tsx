import { ActionFunctionArgs } from "@remix-run/node";
import { DoResponse } from "~/lib/Lib";
import { TokenType } from "~/lib/Interfaces";
import jwt from 'jsonwebtoken'

const JWT_SECRET = import.meta.env.VITE_JWT_SECRET as string

export async function action({ request, params }: ActionFunctionArgs) {

    const contentType = request.headers.get("Content-Type")
    if (contentType !== "application/json") {
        return DoResponse({ error: "Invalid content type. Expected JSON." }, 405)
    }

    if (request.method === "POST") {
        try {
            const requestToken: TokenType = await request.json()
            const token = requestToken.token
            const user = jwt.verify(token, JWT_SECRET)
            return DoResponse(user, 200)
        } catch (error: any) {
            return DoResponse(null, 200)
        }
    }

    return DoResponse({ success: false, message: 'method not allowed' }, 405)
}