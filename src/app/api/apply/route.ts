import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

async function getResend() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  const { Resend } = await import("resend");
  return new Resend(apiKey);
}

async function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  const { createClient } = await import("@supabase/supabase-js");
  return createClient(url, key);
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const studentId = formData.get("studentId") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const file = formData.get("file") as File | null;

    // Server-side validation
    if (!name || !studentId || !email || !phone) {
      return NextResponse.json(
        { success: false, message: "모든 필드를 입력해주세요." },
        { status: 400 }
      );
    }

    if (!/^[가-힣a-zA-Z\s]+$/.test(name)) {
      return NextResponse.json(
        {
          success: false,
          message: "이름은 한글 또는 영어만 입력 가능합니다.",
        },
        { status: 400 }
      );
    }

    if (!/^\d+$/.test(studentId)) {
      return NextResponse.json(
        { success: false, message: "학번은 숫자만 입력 가능합니다." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, message: "올바른 이메일을 입력해주세요." },
        { status: 400 }
      );
    }

    const supabaseAdmin = await getSupabaseAdmin();

    // Upload file to Supabase Storage
    let fileUrl: string | null = null;
    let fileName: string | null = null;

    if (file && supabaseAdmin) {
      fileName = file.name;
      const fileBuffer = Buffer.from(await file.arrayBuffer());
      const filePath = `${Date.now()}_${studentId}_${file.name}`;

      const { error: uploadError } = await supabaseAdmin.storage
        .from("applications")
        .upload(filePath, fileBuffer, {
          contentType: file.type || "application/octet-stream",
        });

      if (uploadError) {
        console.error("File upload error:", uploadError);
      } else {
        const { data: urlData } = supabaseAdmin.storage
          .from("applications")
          .getPublicUrl(filePath);
        fileUrl = urlData.publicUrl;
      }
    } else if (file) {
      fileName = file.name;
    }

    // Save to Supabase DB
    if (supabaseAdmin) {
      const { error: dbError } = await supabaseAdmin
        .from("applications")
        .insert({
          name,
          student_id: studentId,
          email,
          phone,
          file_url: fileUrl,
          file_name: fileName,
        });

      if (dbError) {
        console.error("DB insert error:", dbError);
      }
    }

    // Send emails via Resend
    const resend = await getResend();
    const clubEmail = process.env.CLUB_EMAIL || "onboarding@resend.dev";

    if (resend) {
      // Confirmation email to applicant
      try {
        await resend.emails.send({
          from: `금은동 <${clubEmail}>`,
          to: [email],
          subject: "금은동 지원서 접수 확인",
          html: `
            <div style="font-family: 'Noto Sans KR', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <div style="background: #0f1629; border-radius: 12px; padding: 40px; color: #e5e7eb;">
                <h1 style="color: #d4af37; margin-bottom: 20px; font-size: 24px;">금은동에 지원해주셔서 감사합니다!</h1>
                <p style="margin-bottom: 16px; line-height: 1.6;">안녕하세요, <strong style="color: white;">${name}</strong>님!</p>
                <p style="margin-bottom: 24px; line-height: 1.6;">금은동에 지원해주셔서 진심으로 감사드립니다. 지원서가 정상적으로 접수되었습니다.</p>
                <div style="background: #1a2240; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
                  <p style="margin: 0 0 8px; color: #9ca3af; font-size: 14px;">접수 정보</p>
                  <p style="margin: 4px 0; color: white;">이름: ${name}</p>
                  <p style="margin: 4px 0; color: white;">학번: ${studentId}</p>
                  <p style="margin: 4px 0; color: white;">이메일: ${email}</p>
                </div>
                <p style="line-height: 1.6;">서류 심사 후 결과를 개별 연락드리겠습니다.</p>
                <hr style="border: none; border-top: 1px solid #243056; margin: 24px 0;" />
                <p style="color: #6b7280; font-size: 13px;">충북대학교 금융투자 동아리 금은동</p>
              </div>
            </div>
          `,
        });
      } catch (emailError) {
        console.error("Applicant email error:", emailError);
      }

      // Notification to admins
      const adminEmails = process.env.ADMIN_EMAILS?.split(",").map((e) =>
        e.trim()
      );
      if (adminEmails && adminEmails.length > 0) {
        try {
          await resend.emails.send({
            from: `금은동 시스템 <${clubEmail}>`,
            to: adminEmails,
            subject: `[금은동] 새로운 지원서 접수 - ${name}`,
            html: `
              <div style="font-family: 'Noto Sans KR', sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
                <div style="background: #0f1629; border-radius: 12px; padding: 40px; color: #e5e7eb;">
                  <h1 style="color: #d4af37; margin-bottom: 20px; font-size: 24px;">새로운 지원서가 접수되었습니다</h1>
                  <div style="background: #1a2240; border-radius: 8px; padding: 20px; margin-bottom: 16px;">
                    <p style="margin: 4px 0; color: white;"><strong>이름:</strong> ${name}</p>
                    <p style="margin: 4px 0; color: white;"><strong>학번:</strong> ${studentId}</p>
                    <p style="margin: 4px 0; color: white;"><strong>이메일:</strong> ${email}</p>
                    <p style="margin: 4px 0; color: white;"><strong>전화번호:</strong> ${phone}</p>
                    ${fileName ? `<p style="margin: 4px 0; color: white;"><strong>첨부파일:</strong> ${fileName}</p>` : ""}
                    ${fileUrl ? `<p style="margin: 4px 0;"><a href="${fileUrl}" style="color: #d4af37;">파일 다운로드</a></p>` : ""}
                  </div>
                  <hr style="border: none; border-top: 1px solid #243056; margin: 24px 0;" />
                  <p style="color: #6b7280; font-size: 13px;">금은동 지원 관리 시스템</p>
                </div>
              </div>
            `,
          });
        } catch (adminEmailError) {
          console.error("Admin email error:", adminEmailError);
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: "지원서가 성공적으로 제출되었습니다.",
    });
  } catch (error) {
    console.error("Application submit error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.",
      },
      { status: 500 }
    );
  }
}
