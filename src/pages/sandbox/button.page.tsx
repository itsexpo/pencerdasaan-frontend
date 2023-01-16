import * as React from "react";

import Button from "@/components/buttons/Button";
import Layout from "@/layouts/Layout";

export default function ButtonSandbox() {
  return (
    <Layout>
      <section className="">
        <div className="layout min-h-screen py-20">
          <p>Button</p>
          <Button>Hallo</Button>
        </div>
      </section>
    </Layout>
  );
}
