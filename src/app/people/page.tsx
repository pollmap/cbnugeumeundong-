import type { Metadata } from "next";
import MemberCard from "@/components/MemberCard";
import { MEMBERS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "People",
};

export default function PeoplePage() {
  const executives = MEMBERS.filter((m) =>
    ["회장", "부회장", "총무", "운영진"].includes(m.role)
  );
  const members = MEMBERS.filter((m) => m.role === "부원");

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-gold-500 text-sm font-semibold tracking-widest uppercase mb-3">
            People
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
            멤버 소개
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            금은동을 이끌어가는 멤버들을 소개합니다.
          </p>
        </div>
      </section>

      {/* Executives */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">
            운영진
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {executives.map((member) => (
              <MemberCard
                key={member.name}
                name={member.name}
                role={member.role}
                generation={member.generation}
                image={member.image}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Members */}
      {members.length > 0 && (
        <section className="py-12 px-4 bg-navy-900/30">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              부원
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {members.map((member) => (
                <MemberCard
                  key={member.name}
                  name={member.name}
                  role={member.role}
                  generation={member.generation}
                  image={member.image}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
