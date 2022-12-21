export function classNames(...args: (string|boolean)[]) {
    return args.filter(Boolean).join(" ");
}