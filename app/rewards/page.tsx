"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
// import { useToast } from "@/components/ui/use-toast";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Gift, AlertCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { PointsProvider, usePoints } from "../PointContext"; // Import the PointsProvider and usePoints


interface Reward {
  id: string;
  name: string;
  description: string;
  points: number;
  image: string;
  stock: number;
}

const rewards: Reward[] = [
  {
    id: "1",
    name: "Eco-Friendly Water Bottle",
    description: "Stainless steel, double-walled water bottle",
    points: 1000,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&q=80",
    stock: 10,
  },
  {
    id: "2",
    name: "Local Coffee Shop Voucher",
    description: "$10 gift card for sustainable coffee",
    points: 750,
    image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=500&q=80",
    stock: 15,
  },
  {
    id: "3",
    name: "Eco-Friendly Water Bottle",
    description: "Stainless steel, double-walled water bottle",
    points: 1000,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&q=80",
    stock: 10,
  },
  {
    id: "4",
    name: "Local Coffee Shop Voucher",
    description: "$10 gift card for sustainable coffee",
    points: 750,
    image: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=500&q=80",
    stock: 15,
  },
];

export default function RewardsPage() {
  const { toast } = useToast();
  const { totalPoints, redeemPoints } = usePoints();

  const handleRedeem = (reward: Reward) => {
    if (totalPoints < reward.points) {
      toast({
        variant: "destructive",
        title: "Insufficient Points",
        description: `You need ${reward.points - totalPoints} more points to redeem this reward.`,
      });
      return;
    }

    // Redeem points
    redeemPoints(reward.points);

    toast({
      title: "Reward Redeemed!",
      description: `You've successfully redeemed ${reward.name}.`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Points Overview */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-semibold">Your Points</h2>
              <p className="text-muted-foreground">Redeem points for eco-friendly rewards</p>
            </div>
            <span className="text-3xl font-bold text-green-500">{totalPoints}</span>
          </div>
          <Progress value={65} className="mb-2" />
          <p className="text-sm text-muted-foreground">
            Keep recycling to earn more points!
          </p>
        </Card>

        {/* Rewards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rewards.map((reward) => (
            <RewardCard
              key={reward.id}
              reward={reward}
              userPoints={totalPoints}
              onRedeem={handleRedeem}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface RewardCardProps {
  reward: Reward;
  userPoints: number;
  onRedeem: (reward: Reward) => void;
}

function RewardCard({ reward, userPoints, onRedeem }: RewardCardProps) {
  const canRedeem = userPoints >= reward.points;

  return (
    <Card className="overflow-hidden">
      <div className="aspect-square relative">
        <img
          src={reward.image}
          alt={reward.name}
          className="object-cover w-full h-full"
        />
        {reward.stock < 5 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs">
            Low Stock: {reward.stock} left
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1">{reward.name}</h3>
        <p className="text-sm text-muted-foreground mb-4">{reward.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Gift className="h-4 w-4 text-green-500" />
            <span className="font-semibold">{reward.points} points</span>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant={canRedeem ? "default" : "outline"}
                className={cn(!canRedeem && "cursor-not-allowed")}
              >
                Redeem
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Redeem Reward</DialogTitle>
                <DialogDescription>
                  Are you sure you want to redeem {reward.name} for {reward.points} points?
                </DialogDescription>
              </DialogHeader>
              {!canRedeem && (
                <div className="flex items-center gap-2 text-destructive">
                  <AlertCircle className="h-4 w-4" />
                  <span>You need {reward.points - userPoints} more points</span>
                </div>
              )}
              <DialogFooter>
                <Button
                  variant={canRedeem ? "default" : "outline"}
                  onClick={() => onRedeem(reward)}
                  disabled={!canRedeem}
                >
                  Confirm Redemption
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </Card>
  );
}