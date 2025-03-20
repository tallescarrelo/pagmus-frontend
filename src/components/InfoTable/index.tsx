import React from "react";
import { InfoTableBox, InfoTableComponent, InfoTableDescription, InfoTablePosition, InfoTableResult, InfoTableTitle } from "./styles";
import { InfoTableProps } from "./types";

const InfoTable: React.FC<InfoTableProps> = ({title,position,descripition,result }) => {
  return (
    <InfoTableComponent>
        <InfoTableTitle>{title}</InfoTableTitle>
        <InfoTableBox>
             <InfoTablePosition>{position}</InfoTablePosition>
             <InfoTableDescription>{descripition}</InfoTableDescription>
             <InfoTableResult>{result}</InfoTableResult>
        </InfoTableBox>
    </InfoTableComponent>
        

  );
};

export default InfoTable;