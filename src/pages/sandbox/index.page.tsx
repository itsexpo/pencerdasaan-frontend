import ButtonLink from "@/components/links/ButtonLink";
import SEO from "@/components/SEO";
import Layout from "@/layouts/Layout";

export default function Home() {
  return (
    <Layout>
      <SEO title="Home" description="This is the home page" />
      <section>
        <div className="layout py-20">
          <p>Button</p>
          <ButtonLink href="/sandbox/button">Button</ButtonLink>
        </div>
      </section>
    </Layout>
  );
}
