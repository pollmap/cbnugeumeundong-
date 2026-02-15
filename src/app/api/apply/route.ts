import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

const MOTIVATION_MIN = 500;

async function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  const { createClient } = await import("@supabase/supabase-js");
  return createClient(url, key);
}

function getResend() {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

async function sendEmails(data: {
  name: string;
  studentId: string;
  department: string;
  grade: string;
  phone: string;
  email: string;
  experience: string;
  industry1: string;
  industry2: string;
  company1: string;
  company2: string;
}) {
  const resend = getResend();
  if (!resend) return;

  const adminEmails = process.env.ADMIN_EMAILS?.split(",").map((e) => e.trim()).filter(Boolean);
  if (!adminEmails?.length) return;

  const now = new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });

  // 관리자 알림 이메일
  try {
    await resend.emails.send({
      from: "CUFA <onboarding@resend.dev>",
      to: adminEmails,
      subject: `[CUFA] 새 지원서 접수 - ${data.name} (${data.department})`,
      html: `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;color:#222">
          <h2 style="font-size:18px;font-weight:700;margin-bottom:20px">새로운 지원서가 접수되었습니다</h2>
          <table style="width:100%;border-collapse:collapse;font-size:14px">
            <tr><td style="padding:8px 12px;background:#f8f8f8;font-weight:600;width:100px;border:1px solid #eee">이름</td><td style="padding:8px 12px;border:1px solid #eee">${data.name}</td></tr>
            <tr><td style="padding:8px 12px;background:#f8f8f8;font-weight:600;border:1px solid #eee">학번</td><td style="padding:8px 12px;border:1px solid #eee">${data.studentId}</td></tr>
            <tr><td style="padding:8px 12px;background:#f8f8f8;font-weight:600;border:1px solid #eee">학과</td><td style="padding:8px 12px;border:1px solid #eee">${data.department}</td></tr>
            <tr><td style="padding:8px 12px;background:#f8f8f8;font-weight:600;border:1px solid #eee">학년</td><td style="padding:8px 12px;border:1px solid #eee">${data.grade}</td></tr>
            <tr><td style="padding:8px 12px;background:#f8f8f8;font-weight:600;border:1px solid #eee">연락처</td><td style="padding:8px 12px;border:1px solid #eee">${data.phone}</td></tr>
            <tr><td style="padding:8px 12px;background:#f8f8f8;font-weight:600;border:1px solid #eee">이메일</td><td style="padding:8px 12px;border:1px solid #eee">${data.email}</td></tr>
            <tr><td style="padding:8px 12px;background:#f8f8f8;font-weight:600;border:1px solid #eee">투자 경험</td><td style="padding:8px 12px;border:1px solid #eee">${data.experience}</td></tr>
            <tr><td style="padding:8px 12px;background:#f8f8f8;font-weight:600;border:1px solid #eee">관심 산업</td><td style="padding:8px 12px;border:1px solid #eee">${data.industry1}, ${data.industry2}</td></tr>
            <tr><td style="padding:8px 12px;background:#f8f8f8;font-weight:600;border:1px solid #eee">관심 기업</td><td style="padding:8px 12px;border:1px solid #eee">${data.company1}, ${data.company2}</td></tr>
          </table>
          <p style="font-size:12px;color:#999;margin-top:16px">접수 시각: ${now}</p>
          <p style="font-size:12px;color:#999">전체 지원 내용은 Supabase 대시보드에서 확인하세요.</p>
        </div>
      `,
    });
  } catch (e) {
    console.error("Admin email failed:", e);
  }

  // 지원자 확인 이메일
  try {
    await resend.emails.send({
      from: "CUFA <onboarding@resend.dev>",
      to: [data.email],
      subject: "[CUFA] 지원서가 정상적으로 접수되었습니다",
      html: `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:520px;margin:0 auto;padding:32px 24px;color:#222">
          <h2 style="font-size:18px;font-weight:700;margin-bottom:8px">지원서 접수 완료</h2>
          <p style="font-size:14px;color:#555;margin-bottom:24px">충북대학교 가치투자학회 CUFA에 지원해주셔서 감사합니다.</p>
          <div style="background:#f8f8f8;border-radius:8px;padding:20px;margin-bottom:24px">
            <p style="font-size:14px;margin:0 0 8px"><strong>${data.name}</strong>님의 지원서가 정상적으로 접수되었습니다.</p>
            <p style="font-size:13px;color:#666;margin:0">${data.department} · ${data.grade}</p>
          </div>
          <div style="font-size:13px;color:#555;line-height:1.8">
            <p style="font-weight:600;margin-bottom:8px">전형 절차</p>
            <p style="margin:0">1. 온라인 지원서 제출 ✅</p>
            <p style="margin:0">2. 서류 심사</p>
            <p style="margin:0">3. 면접</p>
            <p style="margin:0">4. 최종 합격</p>
          </div>
          <p style="font-size:13px;color:#555;margin-top:24px">서류 합격자에 한해 면접 일정을 개별 안내드리겠습니다.</p>
          <hr style="border:none;border-top:1px solid #eee;margin:24px 0" />
          <p style="font-size:11px;color:#aaa;margin:0">본 메일은 발신 전용입니다. CUFA 충북대학교 가치투자학회</p>
        </div>
      `,
    });
  } catch (e) {
    console.error("Applicant email failed:", e);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      name,
      studentId,
      department,
      grade,
      phone,
      email,
      canCommit,
      isEnrolled,
      experience,
      motivation,
      deepDive,
      industry1,
      industry2,
      company1,
      company2,
    } = body;

    // Validation
    if (
      !name?.trim() ||
      !studentId?.trim() ||
      !department?.trim() ||
      !grade?.trim() ||
      !phone?.trim() ||
      !email?.trim() ||
      !canCommit ||
      !isEnrolled ||
      !experience ||
      !motivation?.trim() ||
      !deepDive?.trim() ||
      !industry1?.trim() ||
      !industry2?.trim() ||
      !company1?.trim() ||
      !company2?.trim()
    ) {
      return NextResponse.json(
        { success: false, message: "필수 항목을 모두 입력해주세요." },
        { status: 400 }
      );
    }

    if (motivation.trim().length < MOTIVATION_MIN) {
      return NextResponse.json(
        {
          success: false,
          message: `지원 동기는 ${MOTIVATION_MIN}자 이상 작성해주세요. (현재 ${motivation.trim().length}자)`,
        },
        { status: 400 }
      );
    }

    if (!/^\d{10}$/.test(studentId.trim())) {
      return NextResponse.json(
        { success: false, message: "학번은 10자리 숫자로 입력해주세요." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json(
        { success: false, message: "올바른 이메일을 입력해주세요." },
        { status: 400 }
      );
    }

    const supabase = await getSupabaseAdmin();
    if (!supabase) {
      console.error("Supabase not configured");
      return NextResponse.json(
        { success: false, message: "서버 설정 오류입니다. 관리자에게 문의해주세요." },
        { status: 500 }
      );
    }

    const { error } = await supabase.from("applications").insert({
      name: name.trim(),
      student_id: studentId.trim(),
      department: department.trim(),
      grade,
      phone: phone.replace(/\D/g, ""),
      email: email.trim(),
      can_commit: canCommit,
      is_enrolled: isEnrolled,
      experience,
      motivation: motivation.trim(),
      deep_dive: deepDive.trim(),
      industry1: industry1.trim(),
      industry2: industry2.trim(),
      company1: company1.trim(),
      company2: company2.trim(),
    });

    if (error) {
      console.error("DB insert error:", error);
      return NextResponse.json(
        { success: false, message: "저장에 실패했습니다. 다시 시도해주세요." },
        { status: 500 }
      );
    }

    // 이메일 발송 (실패해도 지원 접수는 성공 처리)
    sendEmails({
      name: name.trim(),
      studentId: studentId.trim(),
      department: department.trim(),
      grade,
      phone: phone.replace(/\D/g, ""),
      email: email.trim(),
      experience,
      industry1: industry1.trim(),
      industry2: industry2.trim(),
      company1: company1.trim(),
      company2: company2.trim(),
    }).catch((e) => console.error("Email send error:", e));

    return NextResponse.json({
      success: true,
      message: "지원서가 정상적으로 접수되었습니다.",
    });
  } catch (error) {
    console.error("Application error:", error);
    return NextResponse.json(
      { success: false, message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
