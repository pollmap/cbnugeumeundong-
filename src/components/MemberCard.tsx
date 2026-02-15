import { User } from "lucide-react";

interface MemberCardProps {
  name: string;
  role: string;
  generation: string;
  image: string | null;
}

export default function MemberCard({
  name,
  role,
  generation,
  image,
}: MemberCardProps) {
  return (
    <div className="group bg-navy-900/50 border border-white/5 rounded-xl overflow-hidden hover:border-gold-500/30 transition-all duration-300">
      <div className="aspect-square bg-navy-800 flex items-center justify-center">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <User className="w-16 h-16 text-navy-600" />
        )}
      </div>
      <div className="p-4 text-center">
        <h3 className="text-white font-semibold">{name}</h3>
        <p className="text-gold-500 text-sm mt-1">{role}</p>
        <p className="text-gray-500 text-xs mt-0.5">{generation}</p>
      </div>
    </div>
  );
}
