import { TrendingUp, BookOpen, Trophy } from "lucide-react";

const iconMap = {
  TrendingUp,
  BookOpen,
  Trophy,
} as const;

interface ActivityCardProps {
  title: string;
  description: string;
  icon: keyof typeof iconMap;
}

export default function ActivityCard({
  title,
  description,
  icon,
}: ActivityCardProps) {
  const Icon = iconMap[icon];

  return (
    <div className="group relative bg-navy-900/50 border border-white/5 rounded-xl p-8 hover:border-gold-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-gold-500/5">
      <div className="w-12 h-12 bg-gold-500/10 rounded-lg flex items-center justify-center mb-5 group-hover:bg-gold-500/20 transition-colors">
        <Icon className="w-6 h-6 text-gold-500" />
      </div>
      <h3 className="text-white text-lg font-semibold mb-3">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
