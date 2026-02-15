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
    <div className="group relative bg-dark-900 border border-white/5 rounded-xl p-8 hover:border-white/20 transition-all duration-300">
      <div className="w-12 h-12 bg-white/5 rounded-lg flex items-center justify-center mb-5 group-hover:bg-white/10 transition-colors">
        <Icon className="w-6 h-6 text-white" />
      </div>
      <h3 className="text-white text-lg font-semibold mb-3">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
}
