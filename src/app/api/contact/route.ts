import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { generateEnquiryId, sendContactEmails } from "@/lib/mail";
import { ContactApiResponse } from "@/types/contact";

const contactSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export async function POST(req: NextRequest) {
  try {
    let body;
    try {
      body = await req.json();
    } catch (e) {
      return NextResponse.json(
        { success: false, message: "Invalid JSON body" },
        { status: 400 }
      );
    }

    if (!body) {
      return NextResponse.json(
        { success: false, message: "Request body is empty" },
        { status: 400 }
      );
    }

    // Validation
    const result = contactSchema.safeParse(body);
    if (!result.success) {
      const firstError = result.error.issues[0]?.message || "Validation failed";
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          error: firstError,
        },
        { status: 400 }
      );
    }

    const data = result.data;
    const enquiryId = generateEnquiryId();

    // Check environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.error("Critical Error: EMAIL_USER or EMAIL_PASS is missing in environment.");
      return NextResponse.json(
        { success: false, message: "Server configuration error" },
        { status: 500 }
      );
    }

    // Send Emails
    try {
      await sendContactEmails(data, enquiryId);
    } catch (emailError: any) {
      console.error("Email sending failed:", emailError);
      return NextResponse.json(
        {
          success: false,
          message: "Failed to send emails",
          error: emailError.message || "Unknown email error",
        },
        { status: 500 }
      );
    }

    return NextResponse.json<ContactApiResponse>({
      success: true,
      message: "Enquiry submitted successfully",
      enquiryId,
    });
  } catch (error: any) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error", error: error.message },
      { status: 500 }
    );
  }
}
