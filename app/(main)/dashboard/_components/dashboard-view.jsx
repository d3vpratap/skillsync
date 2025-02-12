"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  BriefcaseIcon,
  LineChart,
  TrendingUp,
  TrendingDown,
  Brain,
  Sparkles,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const DashboardView = ({ insights }) => {
 console.log(insights);
  const salaryData = insights.salaryRanges.map((range) => ({
    name: range.role,
    min: range.min / 1000,
    max: range.max / 1000,
    median: range.median / 1000,
  }));

  const getDemandLevelColor = (level) => {
    switch (level.toLowerCase()) {
      case "high":
        return "bg-emerald-500";
      case "medium":
        return "bg-amber-500";
      case "low":
        return "bg-rose-500";
      default:
        return "bg-slate-500";
    }
  };

  const getMarketOutlookInfo = (outlook) => {
    switch (outlook.toLowerCase()) {
      case "positive":
        return { icon: TrendingUp, color: "text-emerald-500" };
      case "neutral":
        return { icon: LineChart, color: "text-amber-500" };
      case "negative":
        return { icon: TrendingDown, color: "text-rose-500" };
      default:
        return { icon: LineChart, color: "text-slate-500" };
    }
  };

  const OutlookIcon = getMarketOutlookInfo(insights.marketOutlook).icon;

  const lastUpdatedDate = format(new Date(insights.lastUpdated), "dd/MM/yyyy");
  const nextUpdateDistance = formatDistanceToNow(
    new Date(insights.nextUpdate),
    {
      addSuffix: true,
    }
  );

  return (
    <div className="space-y-8 p-6 md:p-8">
      <div className="flex justify-between items-center">
        <Badge
          variant="outline"
          className="text-sm font-medium text-slate-300 border-slate-700"
        >
          Last updated: {lastUpdatedDate}
        </Badge>
        <Badge className="bg-slate-800 text-slate-300 hover:bg-slate-700">
          Next update {nextUpdateDistance}
        </Badge>
      </div>

      {/* Market Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-[#1A1A2E] border-slate-800 hover:border-slate-700 transition-all duration-300">
          <CardHeader className="flex items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium text-slate-200">
              Market Outlook
            </CardTitle>
            <OutlookIcon className="h-5 w-5 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-100">
              {insights.marketOutlook}
            </div>
            <div className="text-sm text-slate-400 mt-1">Market sentiment</div>
          </CardContent>
        </Card>

        <Card className="bg-[#1A1A2E] border-slate-800 hover:border-slate-700 transition-all duration-300">
          <CardHeader className="flex items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium text-slate-200">
              Industry Growth
            </CardTitle>
            <Sparkles className="h-5 w-5 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-100">
              {insights.growthRate.toFixed(1)}%
            </div>
            <Progress
              value={insights.growthRate}
              className="mt-2 bg-slate-700"
              indicatorclassname="bg-amber-500"
            />
          </CardContent>
        </Card>

        <Card className="bg-[#1A1A2E] border-slate-800 hover:border-slate-700 transition-all duration-300">
          <CardHeader className="flex items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium text-slate-200">
              Demand Level
            </CardTitle>
            <BriefcaseIcon className="h-5 w-5 text-violet-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-100">
              {insights.demandLevel}
            </div>
            <div
              className={`h-2 w-full rounded-full mt-2 ${getDemandLevelColor(
                insights.demandLevel
              )}`}
            />
          </CardContent>
        </Card>

        <Card className="bg-[#1A1A2E] border-slate-800 hover:border-slate-700 transition-all duration-300">
          <CardHeader className="flex items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-medium text-slate-200">
              Top Skills
            </CardTitle>
            <Brain className="h-5 w-5 text-cyan-500" />
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {insights.topSkills.map((skill) => (
                <Badge
                  key={skill}
                  variant="secondary"
                  className="bg-slate-800 text-slate-200 border-none hover:bg-slate-700"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Salary Ranges Chart */}
      <Card className="bg-[#1A1A2E] border-slate-800">
        <CardHeader>
          <CardTitle className="text-lg font-medium text-slate-200">
            Salary Ranges by Role
          </CardTitle>
          <CardDescription className="text-sm text-slate-400">
            Displaying minimum, median, and maximum salaries (in thousands)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salaryData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(148, 163, 184, 0.1)"
                />
                <XAxis
                  dataKey="name"
                  stroke="#94a3b8"
                  tick={{ fill: "#94a3b8" }}
                />
                <YAxis stroke="#94a3b8" tick={{ fill: "#94a3b8" }} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-slate-900 border border-slate-700 p-4 shadow-xl ">
                          <p className="font-medium text-slate-200">{label}</p>
                          {payload.map((item) => (
                            <p
                              key={item.name}
                              className="text-sm text-slate-300"
                            >
                              {item.name}: ${item.value}K
                            </p>
                          ))}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar
                  dataKey="min"
                  fill="#0ea5e9"
                  name="Min Salary (K)"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="median"
                  fill="#6366f1"
                  name="Median Salary (K)"
                  radius={[4, 4, 0, 0]}
                />
                <Bar
                  dataKey="max"
                  fill="#8b5cf6"
                  name="Max Salary (K)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Industry Trends */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-[#1A1A2E] border-slate-800 hover:border-slate-700 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-slate-200">
              Key Industry Trends
            </CardTitle>
            <CardDescription className="text-sm text-slate-400">
              Current trends shaping the industry
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {insights.keyTrends.map((trend, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="h-2 w-2 mt-2 rounded-full bg-violet-500" />
                  <span className="text-sm text-slate-300">{trend}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="bg-[#1A1A2E] border-slate-800 hover:border-slate-700 transition-all duration-300">
          <CardHeader>
            <CardTitle className="text-lg font-medium text-slate-200">
              Recommended Skills
            </CardTitle>
            <CardDescription className="text-sm text-slate-400">
              Skills to consider developing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              {insights.recommendedSkills.map((skill) => (
                <Badge
                  key={skill}
                  variant="outline"
                  className="border-slate-700 text-slate-200 hover:bg-slate-800"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardView;
