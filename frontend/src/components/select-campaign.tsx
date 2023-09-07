"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useAppStore } from "@/lib/store";

export function SelectCampaign() {
  const [open, setOpen] = useState(false);
  const { currentCampaign, setCurrentCampaign, campaigns, fetchCampaigns } =
    useAppStore();

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return (
    <div className="flex items-center space-x-4">
      <p className="text-sm text-muted-foreground">Campaign</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="justify-start">
            {currentCampaign ? (
              <>{currentCampaign.name}</>
            ) : (
              <>+ Choose a campaign to decide</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder="Change status..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>
                {campaigns.map((campaign) => (
                  <CommandItem
                    key={campaign.id}
                    onSelect={(value) => {
                      setCurrentCampaign(
                        campaigns.find(
                          (campaign) =>
                            campaign.name.toLocaleLowerCase() === value,
                        ),
                      );
                      setOpen(false);
                    }}
                  >
                    {campaign.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
