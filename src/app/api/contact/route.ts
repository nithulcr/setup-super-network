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

    console.log("Contact API hit with body:", body);
    
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
      console.log("Validation failed:", firstError);
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
    console.log("Generated Enquiry ID:", enquiryId);

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
      console.log("Attempting to send emails...");
      await sendContactEmails(data, enquiryId);
      console.log("Emails sent successfully!");
    } catch (emailError: any) {
      console.error("Email sending failed detailed error:", emailError);
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
