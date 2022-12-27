import { memo } from "preact/compat";
function Hero() {
  return (
    <>
      <div class="flex flex-col align-middle items-center gap-2">
        <img
          src="/logo.jpg"
          alt="Logo"
          class="col-span-1 mt-2 shadow-2xl rounded-full h-[140px] border-8 border-slate-300"
        />
        <h1 class="text-5xl text-center tracking-wide font-['Bebas_neue']">
          LiveDOM NG
        </h1>
      </div>

      <p>
        Enter HTML markup below and compare how it is parsed by various parsers
        and sanitizers.
      </p>
    </>
  );
}

export default memo(Hero);
