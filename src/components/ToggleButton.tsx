import React from "react";
import Button from "./Button";
import { useContent } from "../context/ListContext";

type Props = {};

export default function ToggleButton({}: Props) {
  const { dispatch, list } = useContent();
  return (
    <Button onClick={() => dispatch({ type: "toggleAll" })}>Toggle All</Button>
  );
}
