import React from "react";
import Container from "@/components/common/Container";
import FormSkeleton from "@/components/placeholder/FormSkeleton";

type Props = {
  inputCount: number;
};

export default function HomeContactSkeleton({ inputCount }: Props) {
  return (
    <Container className="py-12">
      <FormSkeleton inputCount={inputCount} />
    </Container>
  );
}
