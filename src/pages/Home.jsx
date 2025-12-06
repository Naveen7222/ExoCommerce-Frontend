// src/pages/HomePage.jsx
import React from "react";
import { Card, CardHeader, CardBody, CardFooter } from "../components/ui/Card";
import { Button } from "../components/ui/Button";

export default function Home() {
  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader>Product 1</CardHeader>
        <CardBody>Some description for product 1.</CardBody>
        <CardFooter>
          <Button>Buy Now</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>Product 2</CardHeader>
        <CardBody>Some description for product 2.</CardBody>
        <CardFooter>
          <Button>Buy Now</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
