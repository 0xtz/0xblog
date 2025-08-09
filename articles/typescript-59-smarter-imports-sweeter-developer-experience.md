---
title: "TypeScript 5.9: Smarter Imports, Sweeter Developer Experience"
category: "tech"
date: "09-08-2025"
---

# TypeScript 5.9: Smarter Imports, Sweeter Developer Experience

TypeScript **5.9** just dropped 🤯 with major dev improvements

- Minimal and updated `tsc --init`
- Support for `import defer`
- Support for `--module node20`
- Expandable Hovers (Preview) ➕
- And sooo much more...

All that in this article.

## TSC command

Previously, when you ran `tsc --init`, it created a full `tsconfig.json` bloated with settings commented out.

Now, in this new update, the `tsc --init` command creates a much cleaner config file because most of us have no patience to read all that, or just copy-paste a past config 🤷‍♂️.

```json title="tsconfig.json"
{
  // Visit https://aka.ms/tsconfig to read more about this file
  "compilerOptions": {
    // File Layout
    // "rootDir": "./src",
    // "outDir": "./dist",

    // Environment Settings
    // See also https://aka.ms/tsconfig_modules
    "module": "nodenext",
    "target": "esnext",
    "types": [],
    // For nodejs:
    // "lib": ["esnext"],
    // "types": ["node"],
    // and npm install -D @types/node

    // Other Outputs
    "sourceMap": true,
    "declaration": true,
    "declarationMap": true,

    // Stricter Typechecking Options
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,

    // Style Options
    // "noImplicitReturns": true,
    // "noImplicitOverride": true,
    // "noUnusedLocals": true,
    // "noUnusedParameters": true,
    // "noFallthroughCasesInSwitch": true,
    // "noPropertyAccessFromIndexSignature": true,

    // Recommended Options
    "strict": true,
    "jsx": "react-jsx",
    "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "noUncheckedSideEffectImports": true,
    "moduleDetection": "force",
    "skipLibCheck": true
  }
}
```

Microsoft also looked at some pain points when creating a new TS project. For example, modules. The new `tsconfig.json` comes with `"module": "nodenext"` and `"target": "esnext"`, making sure all your files are properly scoped.

## Support for `import defer`

This new `import defer` syntax allows you to defer the import of a module until it is needed.  
It means you can import a module without immediately executing it and its dependencies.

Let's take a look at this example:

```ts
import defer * as foo from "./bar.js";
import defer * as feature from "./some-feature.js";

foo.bar();
```

For now, this is the only way to defer the import of a module. If you are asking why not a named import — well, because the module is deferred until you access an exported value from the module.

So, let’s say you have a module called `some-feature.ts`.

```ts
initializationWithSideEffects();

function initializationWithSideEffects() {
  // ...
  specialConstant = 42;

  console.log("Side effects have occurred!");
}

export let specialConstant: number;
```

Without `import defer`, TypeScript will execute the `initializationWithSideEffects()` function immediately. That is one reason why some ESLint rules will throw an error if you are not using the import itself.

When using `import defer`, the `initializationWithSideEffects()` function will not be executed until you access a member of the module.

```ts
// ❌ Not allowed
import defer { doSomething } from "some-module";

// ❌ Not allowed
import defer defaultExport from "some-module";

// ✅ Only this syntax is supported for now
import defer * as feature from "some-module";
```

> ⚠️ Note: When you write `import defer`, the module and its dependencies are fully loaded and ready for execution. That means the module will need to exist and will be loaded from the file system or a network resource. The key difference between a regular import and `import defer` is that execution of statements and declarations is deferred until you access a property of the **imported namespace**.
> ⚠️ Make sure your Node or browser environment supports the `import defer` syntax.

## Support for `--module node20`

This version brings a stable alternative to `"nodenext"` — `"node20"`.  
This mode is designed to model the behavior of Node.js v20. It is unlikely to have new behaviors in the future [_according to Microsoft_](https://devblogs.microsoft.com/typescript/announcing-typescript-5-9/#support-for---module-node20).

It will imply a `--target` of `es2022` unless otherwise specified.

## Summary Descriptions in DOM APIs

This will be super helpful for people who actually read the docs 😎.  
Previously, when you hovered over many DOM APIs, you would only see a link to the MDN page.

Those links are kind of useful, but they do not provide a quick summary of the API and what it does.

Now, TypeScript includes a summary description of many DOM APIs based on the MDN docs. You can see more of those changes [here #1993](https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1993) and [here #1940](https://github.com/microsoft/TypeScript-DOM-lib-generator/pull/1940).

## Expandable Hovers (Preview)

This is also known as _Quick Info_ in VS Code or the _Editor Tooltip_. It can be very useful to peek at the type of a variable, function, type alias, etc., to see what they refer to.

But still, you could not go any deeper to get more details about the type.

```ts
export function foo(x: TFooOptions): void {
  // ...
}
```

When you hovered over `x`, you were left with a _parameter_ hover.

You needed to jump to the definition just to see what members this value had. Previously, that was the only way.

Now, in TypeScript 5.9, a preview feature called _Expandable Hovers_ or _"quick info verbosity"_ is available. If you use VS Code or any of its clones, you will see a **+** / **-** button on the left of these hover tooltips. This expands the hover to show more details about the type.

<video controls autoplay muted loop width="100%">
  <source src="https://devblogs.microsoft.com/typescript/wp-content/uploads/sites/11/2025/06/expandable-quick-info-1.mp4#t=0.1" type="video/mp4">
</video>

> ⚠️ This feature is still in preview. The TypeScript team is seeking feedback from VS Code users. [Read more here #59940](https://github.com/microsoft/TypeScript/pull/59940)

## Configurable Maximum Hover Length

Sometimes, quick info tooltips can become so long that TypeScript will truncate them to make them more readable. The downside is that often the most important information will be omitted from the tooltip, which can be frustrating.

To help with this, TypeScript 5.9’s language server supports a configurable hover length, which can be set in VS Code via the `js/ts.hover.maximumLength` setting.

Additionally, the new default hover length is substantially larger than before. This means that in TypeScript 5.9, you should see more information in your hover tooltips by default.

## What's next?

You might be wondering what’s next for TypeScript after 5.9 — **TypeScript 6.0**.

The TypeScript team has announced that 6.0 will act as a transitionary version, letting developers adjust their code base for **TypeScript 7.0** (the Go thing...). While 6.0 may still ship some updates and features, the team suggests most users should think of it as a readiness check for adopting **TypeScript 7.0**, with some deprecations and possibly small updates to type checking behavior.
