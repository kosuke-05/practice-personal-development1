"use client"

import { Dispatch, SetStateAction } from "react";
import { SearchType } from "../appBar/appBar";

export type SearchPropsType = {
  matchData: SearchType,
  setMatchData: Dispatch<SetStateAction<SearchType>>
};