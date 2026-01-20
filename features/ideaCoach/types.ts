export interface EstimatedTime {
  days: string;
  dailyEffort: string;
}

export interface Project {
  title: string;
  problemStatement?: string;
  problemSolved?: string;
  features?: string[];
  whatYouWillLearn?: string[];
  estimatedTime?: EstimatedTime;
  buildRoadmap?: string[];
  designTradeoffs?: string[];
}
