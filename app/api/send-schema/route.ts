/*
 * SETUP INSTRUCTIONS:
 * 1. Install the Resend SDK by running this command in your terminal:
 * npm install resend
 * * 2. Create a .env.local file in the root of your project and add your Resend API Key:
 * RESEND_API_KEY=re_your_api_key_here
 * * 3. Update the 'from' email address below to a verified domain on your Resend account 
 * (e.g., 'hello@getlocalschema.com'). Note: If you don't have a verified domain yet, 
 * you can use Resend's testing email 'onboarding@resend.dev' to send to your verified personal email.
 */

import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { developerEmail, userEmail, schemaCode } = body;

    // Validate inputs
    if (!developerEmail || !schemaCode) {
      return NextResponse.json(
        { error: "Missing required fields: developerEmail or schemaCode" },
        { status: 400 }
      );
    }

    // Send the email using Resend
    const data = await resend.emails.send({
      from: "LocalSchema <onboarding@resend.dev>", // Replace with your verified domain
      to: [developerEmail],
      cc: userEmail ? [userEmail] : undefined,
      subject: "JSON-LD Schema Code for Implementation",
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-w: 600px; margin: 0 auto; color: #0f172a; line-height: 1.6;">
          <h2 style="color: #4f46e5; margin-bottom: 24px; font-weight: 800; letter-spacing: -0.025em;">Local Business Schema Ready for Implementation</h2>
          
          <p style="font-size: 16px; font-weight: 500; color: #475569;">Hello,</p>
          <p style="font-size: 16px; font-weight: 500; color: #475569;">You have been sent JSON-LD schema markup generated via LocalSchema to implement on your website. Please add the following code snippet inside the <code>&lt;head&gt;</code> section of the website's HTML.</p>
          
          <div style="background-color: #020617; padding: 24px; border-radius: 12px; margin: 32px 0; border: 1px solid #1e293b; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
            <pre style="color: #e2e8f0; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; font-size: 14px; white-space: pre-wrap; word-wrap: break-word; margin: 0;">${schemaCode.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</pre>
          </div>
          
          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin-bottom: 32px;">
            <p style="margin-top: 0; font-weight: 700; color: #0f172a;">Implementation Instructions:</p>
            <ul style="color: #475569; padding-left: 20px; margin-bottom: 0;">
              <li style="margin-bottom: 8px;">Do not modify the structure of the JSON unless explicitly required.</li>
              <li style="margin-bottom: 8px;">Ensure there are no trailing commas, as this will break the JSON parser.</li>
              <li>Test the live URL using the <a href="https://search.google.com/test/rich-results" style="color: #4f46e5; font-weight: 600; text-decoration: none;">Google Rich Results Test</a> after deployment.</li>
            </ul>
          </div>
          
          <p style="font-size: 13px; color: #94a3b8; margin-top: 40px; border-top: 1px solid #f1f5f9; padding-top: 24px; text-align: center;">
            Generated securely by <a href="https://www.getlocalschema.com" style="color: #4f46e5; font-weight: 600; text-decoration: none;">LocalSchema</a>.
          </p>
        </div>
      `,
    });

    if (data.error) {
      console.error("Resend API Error:", data.error);
      return NextResponse.json({ error: data.error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });

  } catch (error) {
    console.error("Error processing email request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}