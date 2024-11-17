"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trophy } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  user: {
    name: string;
    avatar?: string;
    points: number;
  };
  recyclableCount: number;
  organicCount: number;
  electricCount: number;
}

const leaderboardData: LeaderboardEntry[] = [
  {
    rank: 1,
    user: {
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80",
      points: 2450,
    },
    recyclableCount: 85,
    organicCount: 62,
    electricCount: 23,
  },
  {
    rank: 2,
    user: {
      name: "John Doe",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80",
      points: 1850,
    },
    recyclableCount: 65,
    organicCount: 48,
    electricCount: 15,
  },
  {
    rank: 3,
    user: {
      name: "Maria Garcia",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&q=80",
      points: 1650,
    },
    recyclableCount: 55,
    organicCount: 42,
    electricCount: 18,
  },
  // Add more mock data as needed
];

export default function LeaderboardPage() {
  const [timeframe, setTimeframe] = useState("week");

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "text-yellow-500";
      case 2:
        return "text-gray-400";
      case 3:
        return "text-amber-600";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold mb-2">Leaderboard</h1>
            <p className="text-muted-foreground">
              Top recyclers in your community
            </p>
          </div>
          <Select value={timeframe} onValueChange={setTimeframe}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select timeframe" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {leaderboardData.slice(0, 3).map((entry) => (
            <Card
              key={entry.rank}
              className={`p-6 text-center ${
                entry.rank === 1 ? "bg-yellow-50 dark:bg-yellow-950/20" : ""
              }`}
            >
              <Trophy
                className={`w-8 h-8 mx-auto mb-4 ${getRankColor(entry.rank)}`}
              />
              <Avatar className="w-16 h-16 mx-auto mb-4">
                <AvatarImage src={entry.user.avatar} alt={entry.user.name} />
                <AvatarFallback>
                  {entry.user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <h3 className="font-semibold mb-1">{entry.user.name}</h3>
              <p className="text-2xl font-bold text-green-500">
                {entry.user.points}
              </p>
              <p className="text-sm text-muted-foreground">points</p>
            </Card>
          ))}
        </div>

        {/* Full Leaderboard */}
        <Card>
          <div className="divide-y">
            {leaderboardData.map((entry) => (
              <div
                key={entry.rank}
                className="flex items-center p-4 hover:bg-muted/50"
              >
                <span
                  className={`w-8 font-bold ${getRankColor(entry.rank)}`}
                >
                  #{entry.rank}
                </span>
                <Avatar className="h-10 w-10 mr-4">
                  <AvatarImage src={entry.user.avatar} alt={entry.user.name} />
                  <AvatarFallback>
                    {entry.user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-medium">{entry.user.name}</h4>
                  <div className="text-sm text-muted-foreground">
                    {entry.recyclableCount} recyclable · {entry.organicCount}{" "}
                    organic · {entry.electricCount} electric
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{entry.user.points}</div>
                  <div className="text-sm text-muted-foreground">points</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}