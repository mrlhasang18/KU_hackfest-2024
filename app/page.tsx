'use client'
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Leaf, Recycle, Battery, Trash } from "lucide-react";
import StatsChart from "@/components/stats-chart";
import Link from "next/link";
import { usePoints } from './PointContext';


interface CategoryCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  points: number;
  count: number;
}

export default function Home() {

  const { totalPoints } = usePoints();
  const nextRewardTier = 1485;

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Hero Section */}
      <section className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold tracking-tight">
          Welcome to <span className="text-green-500">RecycSmart</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Make recycling fun and rewarding. Scan, recycle, and earn points while helping the environment.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild>
            <Link href="/scan">Start Scanning</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/rewards">View Rewards</Link>
          </Button>
        </div>
      </section>

      {/* Points Overview */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Your Points</h2>
          <span className="text-3xl font-bold text-green-500">
            {totalPoints.toLocaleString()}
          </span>
        </div>
        <Progress 
          value={(totalPoints / nextRewardTier) * 100} 
          className="mb-2" 
        />
        <p className="text-sm text-muted-foreground">
          {nextRewardTier - totalPoints} points until your next reward tier
        </p>
      </Card>

      {/* Recycling Categories */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <CategoryCard
          icon={Recycle}
          title="Recyclable"
          points={20}
          count={45}
        />
        <CategoryCard
          icon={Leaf}
          title="Organic"
          points={15}
          count={32}
        />
        <CategoryCard
          icon={Battery}
          title="Electric"
          points={10}
          count={12}
        />
        <CategoryCard
          icon={Trash}
          title="Non-recyclable"
          points={5}
          count={28}
        />
      </div>

      {/* Statistics Chart */}
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Recycling History</h2>
        <StatsChart />
      </Card>
    </div>
  );
}

// CategoryCard component remains the same
function CategoryCard({ icon: Icon, title, points, count }: CategoryCardProps) {
  return (
    <Card className="p-4">
      <div className="flex flex-col items-center text-center space-y-2">
        <Icon className="h-8 w-8 text-green-500" />
        <h3 className="font-semibold">{title}</h3>
        <div className="text-sm text-muted-foreground">
          {points} points each
        </div>
        <div className="text-lg font-semibold">
          {count} items
        </div>
      </div>
    </Card>
  );
}