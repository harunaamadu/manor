export const website_name = process.env.NEXT_PUBLIC_WEBSITE_NAME;

const Logo = () => {
  return (
    <div className="flex items-center gap-1.5 md:gap-3 group">
      <h2 className="flex size-6 md:size-8 lg:size-10 items-center justify-center bg-zinc-800 dark:bg-foreground text-base font-semibold font-heading text-zinc-50 dark:text-background group-hover:bg-primary group-hover:text-primary-foreground transition-all">
        M
      </h2>
      <div className="flex flex-col">
        <span className="text-base font-semibold uppercase tracking-[0.2em] text-foreground">
          {website_name}
        </span>
        <span className="hidden md:flex text-xs md:text-[9.4px] text-foreground">
          Style & essentials
        </span>
      </div>
    </div>
  );
};

export default Logo;
