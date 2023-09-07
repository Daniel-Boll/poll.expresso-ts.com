import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const ExpressoTSLogo = () => (
  <Avatar>
    <AvatarImage src="https://github.com/expressots.png" />
    <AvatarFallback>ETS</AvatarFallback>
  </Avatar>
);
