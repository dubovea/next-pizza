"use client";
import React from "react";
import { AddressSuggestions } from "react-dadata";
import "react-dadata/dist/react-dadata.css";

interface Props {
  onChange?: (value?: string) => void;
}

export const AddressInput: React.FC<Props> = ({ onChange }) => {
  return (
    <AddressSuggestions
      token="430628cd72ee57271e1a5e8088471a32b74a73c1"
      onChange={(data) => onChange?.(data?.value)}
    />
  );
};
