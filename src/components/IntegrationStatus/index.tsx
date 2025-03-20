import React from "react";
import { StatusContainer, StatusItem, StatusIcon, StatusLabel } from "./styles";

const IntegrationStatus: React.FC = () => {
  const statuses = [
    { label: "API", icon: "apiIcon" },
    { label: "SMS", icon: "smsIcon" },
    { label: "Pixel", icon: "pixelIcon" },
    { label: "Rastreio", icon: "trackingIcon" },
  ];

  return (
    <StatusContainer>
      {statuses.map((status, index) => (
        <StatusItem key={index}>
          <StatusIcon src={status.icon} alt={status.label} />
          <StatusLabel>{status.label}</StatusLabel>
        </StatusItem>
      ))}
    </StatusContainer>
  );
};

export default IntegrationStatus;
