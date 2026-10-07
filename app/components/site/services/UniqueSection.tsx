import Container from "../../layout/Container";
import Grid from "../../layout/Grid";
import Section from "../../layout/Section";
import SectionHeading from "../blocks/SectionHeading";
import Card from "../../ui/Card";
import type { ServiceDef, UniqueSection as UniqueData } from "../../../content/services";

// The per-service section. Five presentation kinds, chosen by the content record.
export default function UniqueSection({ service }: { service: ServiceDef }) {
  const data = service.unique;
  const id = `${service.slug}-unique`;

  return (
    <Section tone="surface2" labelledBy={id}>
      <Container>
        <SectionHeading id={id} eyebrow="In depth" title={data.title} lead={data.intro} />
        <div className="mt-14">{renderKind(data)}</div>
      </Container>
    </Section>
  );
}

function renderKind(data: UniqueData) {
  switch (data.kind) {
    case "list":
      return (
        <Grid className="gap-y-6">
          {data.items.map((item) => (
            <div key={item.title} className="col-span-4 md:col-span-4 lg:col-span-4">
              <Card kind="service" as="div">
                <h3 className="type-h4 text-fg-primary">{item.title}</h3>
                <p className="type-small mt-3">{item.body}</p>
              </Card>
            </div>
          ))}
        </Grid>
      );

    case "beforeAfter":
      return (
        <Grid className="gap-y-6">
          <div className="col-span-4 md:col-span-4 lg:col-span-6">
            <Card kind="service" as="div">
              <p className="type-eyebrow text-fg-secondary">Before</p>
              <ol className="mt-4 list-decimal space-y-3 pl-5 type-small text-fg-primary">
                {data.before.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </Card>
          </div>
          <div className="col-span-4 md:col-span-4 lg:col-span-6">
            <Card kind="cta" as="div">
              <p className="type-eyebrow">After</p>
              <ol className="mt-4 list-decimal space-y-3 pl-5 type-small text-fg-primary">
                {data.after.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </Card>
          </div>
        </Grid>
      );

    case "comparison":
      return (
        <div className="overflow-x-auto rounded-card border border-line bg-canvas shadow-raised">
          <table className="w-full min-w-[560px] border-collapse text-left type-small">
            <caption className="sr-only">Custom CRM compared with off-the-shelf CRM</caption>
            <thead>
              <tr className="border-b border-line">
                <th scope="col" className="p-4 font-semibold text-fg-primary">Aspect</th>
                <th scope="col" className="p-4 font-semibold text-deep-blue">Custom CRM</th>
                <th scope="col" className="p-4 font-semibold text-fg-secondary">Off-the-shelf</th>
              </tr>
            </thead>
            <tbody>
              {data.rows.map((row) => (
                <tr key={row.aspect} className="border-b border-line last:border-0">
                  <th scope="row" className="p-4 font-semibold text-fg-primary">{row.aspect}</th>
                  <td className="p-4 text-fg-primary">{row.custom}</td>
                  <td className="p-4 text-fg-secondary">{row.offTheShelf}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );

    case "dashboard":
      return (
        <div>
          <p className="mb-6 inline-flex rounded-tag bg-gold/20 px-2 py-1 font-mono text-[12px] font-semibold text-fg-primary">
            ILLUSTRATIVE SAMPLE: NOT REAL DATA
          </p>
          <Grid className="gap-y-6">
            {data.panels.map((panel) => (
              <div key={panel.label} className="col-span-4 md:col-span-8 lg:col-span-4">
                <Card kind="metric" as="div">
                  <p className="type-small font-semibold text-fg-primary">{panel.label}</p>
                  <div role="img" aria-label={`${panel.label}: illustrative bar layout, no values shown`} className="mt-6 flex h-32 items-end gap-2">
                    {panel.bars.map((height, index) => (
                      <span
                        key={index}
                        aria-hidden="true"
                        className="flex-1 rounded-t-tag bg-gradient-to-t from-deep-blue to-purple"
                        style={{ height: `${height}%`, opacity: 0.55 + index * 0.05 }}
                      />
                    ))}
                  </div>
                </Card>
              </div>
            ))}
          </Grid>
        </div>
      );

    case "lifecycle":
      return (
        <ol className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {data.stages.map((stage, index) => (
            <li key={stage.name}>
              <Card kind="service" as="div">
                <p className="font-mono text-[12px] text-purple">STAGE {index + 1}</p>
                <h3 className="type-h4 mt-3 text-fg-primary">{stage.name}</h3>
                <p className="type-small mt-3">{stage.body}</p>
              </Card>
            </li>
          ))}
        </ol>
      );
  }
}
