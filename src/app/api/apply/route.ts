import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const MOTIVATION_MIN = 500;

async function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  const { createClient } = await import("@supabase/supabase-js");
  return createClient(url, key);
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

    if (!/^\d+$/.test(studentId.trim())) {
      return NextResponse.json(
        { success: false, message: "학번은 숫자만 입력 가능합니다." },
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
