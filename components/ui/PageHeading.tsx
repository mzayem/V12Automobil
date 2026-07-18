export default function PageHeading({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
}) {
  return (
    <header className="mx-auto max-w-4xl px-6 pb-16 pt-24 text-center">
      <p className="eyebrow mb-3">{eyebrow}</p>
      <h1 className="heading-display text-4xl text-bianco sm:text-5xl">
        {title}
      </h1>
      {intro && (
        <p className="mt-6 font-serif text-lg leading-relaxed text-bianco/85">
          {intro}
        </p>
      )}
    </header>
  );
}
