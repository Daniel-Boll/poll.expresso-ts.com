"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppStore } from "@/lib/store";

export default function Home() {
  const { currentCampaign } = useAppStore();

  return (
    <>
      {currentCampaign && (
        <Card className="w-[450px]">
          <CardHeader>
            <CardTitle>{currentCampaign.name}</CardTitle>
            <CardDescription>
              {currentCampaign.description ?? "Help us decide"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4">
              {currentCampaign.options.map((option) => (
                <Button key={option.name} variant="outline">
                  {option.name}
                </Button>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">Cancel</Button>
            <Button>Deploy</Button>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
