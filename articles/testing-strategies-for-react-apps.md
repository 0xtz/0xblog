---
title: "Testing Strategies for React Apps"
category: "testing"
date: "06-08-2025"
---

# Testing Strategies for React Apps

Writing tests for React apps doesn't have to be complex. A modern strategy involves a combination of **unit**, **integration**, and **end-to-end (E2E)** testing — each serving a distinct purpose.

This post outlines a simple but effective approach to testing React apps in 2025 using tools like **Vitest**, **Testing Library**, and **Playwright**.

---

## 🧪 1. Unit Tests — "Test your logic"

Use unit tests for pure functions, hooks, and small components without side effects.

**Tool:** `vitest`  
**Goal:** Fast feedback on isolated logic

```tsx
// hooks/useCounter.ts
export function useCounter() {
  const [count, setCount] = useState(0);
  const increment = () => setCount((c) => c + 1);
  return { count, increment };
}
```

```ts
// hooks/useCounter.test.ts
import { renderHook, act } from "@testing-library/react";
import { useCounter } from "./useCounter";

test("increments count", () => {
  const { result } = renderHook(() => useCounter());
  act(() => result.current.increment());
  expect(result.current.count).toBe(1);
});
```

✅ Keep unit tests **pure and isolated**. Avoid DOM or network unless mocked.

---

## 🔌 2. Integration Tests — "Test how components work together"

Test UI + logic + interactions, but keep external dependencies mocked.

**Tool:** `@testing-library/react` + `msw` (for mocking API)

**Goal:** Ensure components render and behave correctly with real user interactions.

```tsx
// components/UserList.tsx
export function UserList() {
  const { data } = useQuery(["users"], fetchUsers);
  return (
    <ul>
      {data?.map((user) => (
        <li key={user.id}>{user.name}</li>
      ))}
    </ul>
  );
}
```

```ts
// components/UserList.test.tsx
import { render, screen } from "@testing-library/react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserList } from "./UserList";

const server = setupServer(
  rest.get("/api/users", (_, res, ctx) =>
    res(ctx.json([{ id: 1, name: "Alice" }]))
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("renders fetched users", async () => {
  const queryClient = new QueryClient();
  render(
    <QueryClientProvider client={queryClient}>
      <UserList />
    </QueryClientProvider>
  );
  expect(await screen.findByText("Alice")).toBeInTheDocument();
});
```

✅ Focus on behavior, not implementation details. Simulate user flows, not component internals.

---

## 🧭 3. End-to-End Tests — "Test the app like a user"

E2E tests ensure everything works from a real user’s perspective: the app, APIs, routing, styles, etc.

**Tool:** `playwright`  
**Goal:** Catch real-world issues before users do.

```ts
// e2e/home.spec.ts
import { test, expect } from "@playwright/test";

test("homepage has welcome text", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await expect(page.getByText("Welcome")).toBeVisible();
});
```

✅ Write fewer E2E tests (only critical paths). They are slower, but valuable.

---

## 🎯 Strategy Summary

| Layer       | Tooling                  | Use case                      |
| ----------- | ------------------------ | ----------------------------- |
| Unit        | `vitest`                 | Pure functions, hooks         |
| Integration | `Testing Library`, `msw` | Components, user interactions |
| E2E         | `playwright`             | Full app, routing, backend    |

---

## 🔄 When to write tests?

- Write **unit tests** for business logic and custom hooks
- Add **integration tests** for user-facing components
- Use **E2E tests** for your most important user journeys
- Don’t over-test internal logic — aim for confidence, not coverage

---

## ✅ Final Thoughts

A well-tested React app balances **speed**, **reliability**, and **realism**.  
Don’t test everything — test what matters.

If a test gives you confidence your feature works and won’t break, it's a good test.

Happy testing 🔍
