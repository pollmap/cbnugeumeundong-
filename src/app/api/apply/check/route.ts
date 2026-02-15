import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

async function getSupabaseAdmin() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  const { createClient } = await import("@supabase/supabase-js");
  return createClient(url, key);
}

export async function POST(request: NextRequest) {
  try {
    const { name, phone } = await request.json();

    if (!name?.trim() || !phone?.trim()) {
      return NextResponse.json(
        { success: false, message: "이름과 연락처를 모두 입력해주세요." },
        { status: 400 }
      );
    }

    const supabase = await getSupabaseAdmin();
    if (!supabase) {
      return NextResponse.json(
        { success: false, message: "서버 설정 오류입니다." },
        { status: 500 }
      );
    }

    const phoneDigits = phone.replace(/\D/g, "");

    const { data, error } = await supabase
      .from("applications")
      .select("name, department, grade, created_at")
      .eq("name", name.trim())
      .eq("phone", phoneDigits)
      .order("created_at", { ascending: false })
      .limit(1);

    if (error) {
      console.error("DB query error:", error);
      return NextResponse.json(
        { success: false, message: "조회 중 오류가 발생했습니다." },
        { status: 500 }
      );
    }

    if (!data || data.length === 0) {
      return NextResponse.json({
        success: true,
        found: false,
      });
    }

    return NextResponse.json({
      success: true,
      found: true,
      application: {
        name: data[0].name,
        department: data[0].department,
        grade: data[0].grade,
        submittedAt: data[0].created_at,
      },
    });
  } catch (error) {
    console.error("Check error:", error);
    return NextResponse.json(
      { success: false, message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
