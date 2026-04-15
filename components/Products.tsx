import Image from "next/image";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { products } from "@/lib/content";

export function Products() {
  return (
    <section className="section-shell section-padding" aria-labelledby="productos-heading">
      <Container>
        <SectionHeading
          id="productos-heading"
          eyebrow="Productos"
          title="Selección de esenciales"
          subtitle="Una vidriera visual para destacar productos recomendados dentro de la experiencia del estudio."
        />
        <div className="grid gap-5 md:grid-cols-3 lg:gap-6">
          {products.map((product) => (
            <article key={product.name} className="card-surface overflow-hidden">
              <div className="relative aspect-[4/4.45] bg-[linear-gradient(180deg,rgba(255,255,255,0.7),rgba(242,236,229,0.95))]">
                <Image
                  src={product.image}
                  alt={product.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-6 sm:p-7">
                <p className="text-[0.7rem] uppercase tracking-[0.24em] text-muted">
                  {product.label}
                </p>
                <h3 className="mt-3 text-[1.1rem] font-semibold tracking-[-0.02em] text-text">
                  {product.name}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
