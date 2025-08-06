---
title: "CTE vs Subquery vs View: Which One Should You Use?"
description: "A comprehensive guide to understanding when to use Common Table Expressions (CTEs), subqueries, and views in SQL"
date: "07-08-2025"
tags: ["sql", "database", "performance", "optimization"]
---

# CTE vs Subquery vs View: Which One Should You Use?

Have you ever written an SQL query and wondered, _Wait should this be a subquery? Or maybe a view? Or is a CTE better?_

In this guide, we’ll break down the differences between the three, show working code examples, and help you understand when to use each one.

Here’s the database schema we’ll be using for the examples:

```sql
CREATE DATABASE company;

USE company;

CREATE TABLE customers (
  id INT PRIMARY KEY,

  name VARCHAR(255),
  email VARCHAR(255),
  phone VARCHAR(255)
);

CREATE TABLE orders (
  id INT PRIMARY KEY,

  customer_id INT,
  order_date DATE,
  total_amount DECIMAL(10, 2),
  FOREIGN KEY (customer_id) REFERENCES customers(id)
);


```

---

## Subquery

A **subquery** is a query inside another query,
often used to filter or calculate values for the outer one. You can use them in the `WHERE`, `FROM`, `SELECT`, or `HAVING` clauses.

Let’s find all customers who placed an order in January 2025 with a total over 100:

```sql
SELECT
  *
FROM customers
WHERE id IN (
  SELECT customer_id
  FROM orders
  WHERE total_amount > 100
  AND order_date >= '2025-01-01'
  AND order_date < '2025-02-01'
  );
```

The inner query fetches the IDs of customers who meet the condition. The outer query then selects customer data for those IDs.

This is easy to write for simple cases, but subqueries quickly become hard to read or maintain when things get more complex.

**✅ Good for**: One-off logic  
**❌ Bad for**: Reuse or deep nesting

---

## View

A **view** is a saved query that behaves like a virtual table. You define it once in your database and it's a database object that you can query like a regular table.

Here’s a view that lists customers who spent more than 100 in January 2025:

```sql
CREATE VIEW vw_top_customers_last_month AS
SELECT
  customers.id,
  customers.name,
  customers.email,
  customers.phone,
  SUM(orders.total_amount) AS total_amount
FROM
  customers
JOIN orders ON customers.id = orders.customer_id
WHERE
  orders.order_date >= '2025-01-01'
  AND orders.order_date < '2025-02-01'
  AND orders.total_amount > 100
GROUP BY customers.id, customers.name, customers.email, customers.phone;
```

Once created, you can query it like this:

```sql
SELECT
  *
FROM
  vw_top_customers_last_month;
```

This makes your queries cleaner and easier to reuse,
especially when your logic is shared across reports or dashboards.

**✅ Good for**: Reuse, abstraction, security (limiting columns)  
**❌ Bad for**: Logic used only once or that changes often

### Materialized View

A **materialized view** is like a regular view, but its results are **cached (stored on disk)**, so queries run much faster.

Unlike regular views that re-run their query on each access, materialized views store the results and need manual or scheduled refreshing.

Here’s how you create a materialized view for the same top customers example:

```sql
CREATE MATERIALIZED VIEW mv_top_customers_last_month AS
SELECT
  customers.id,
  customers.name,
  customers.email,
  customers.phone,
  SUM(orders.total_amount) AS total_amount
FROM
  customers
JOIN orders ON customers.id = orders.customer_id
WHERE
  orders.order_date >= '2025-01-01'
  AND orders.order_date < '2025-02-01'
  AND orders.total_amount > 100
GROUP BY customers.id, customers.name, customers.email, customers.phone;
```

To refresh it when data changes, run:

```sql
REFRESH MATERIALIZED VIEW mv_top_customers_last_month;
```

Materialized views are great when query speed is critical but the underlying data doesn't change very often, like in analytics and reporting.

**✅ Good for**: Performance optimization, heavy queries that don’t need real-time freshness  
**❌ Bad for**: Data that changes frequently or needs to be always current

---

## CTE (Common Table Expression)

A **CTE** is like a temporary named result set used only in the query it's defined in. You define it with the `WITH` keyword.

Here’s the same logic we used in the view, but as a CTE:

```sql
WITH top_customers_last_month AS (
  SELECT
    customers.id,
    customers.name,
    customers.email,
    customers.phone,
    SUM(orders.total_amount) AS total_amount
  FROM customers
  JOIN orders ON customers.id = orders.customer_id
  WHERE orders.order_date >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)
    AND orders.total_amount > 100
  GROUP BY customers.id, customers.name, customers.email, customers.phone
)
SELECT * FROM top_customers_last_month;
```

This is perfect for breaking a complex query into logical chunks that are easier to read and debug. Unlike views, CTEs exist only during the execution of the query.

---

### Example: Recursive CTE

Some queries require recursion, for example, generating a sequence of dates or traversing a tree structure.

Here’s a CTE that generates dates from Jan 1 to Jan 7, 2025:

```sql
WITH RECURSIVE date_sequence AS (
  SELECT DATE('2025-01-01') AS dt
  UNION ALL
  SELECT dt + INTERVAL 1 DAY
  FROM date_sequence
  WHERE dt < '2025-01-07'
)
SELECT * FROM date_sequence;
```

Recursive CTEs are super handy when you don’t have a calendar table or need to walk through parent-child hierarchies.

**✅ Good for**: Multi-step queries, breaking complexity, recursion  
**❌ Bad for**: Reuse across different queries or modules

---

## Performance Comparison

| Method            | Read Speed | Write Impact  | Memory Usage | Best For        |
| ----------------- | ---------- | ------------- | ------------ | --------------- |
| Subquery          | Medium     | None          | Low          | Simple filters  |
| CTE               | Fast       | None          | Medium       | Complex queries |
| View              | Medium     | None          | Low          | Reusable logic  |
| Materialized View | Very Fast  | Slower writes | High         | Analytics       |

---

## ⚠️ Common Pitfalls

- **Subqueries**: Don't nest more than 2-3 levels deep -> they become unreadable
- **Views**: Avoid view-on-view chains -> they're performance killers and hard to debug
- **CTEs**: Don't use for cross-query reuse -> use views instead
- **Materialized Views**: Remember to refresh them when data changes!

---

## When to Use What?

### ✅ Use a **Subquery** when:

- Ideal when you're applying a simple filter or transformation that's only used once.
- Useful for small helper logic inside a _SELECT_, _WHERE_, or _JOIN_ clause.
- Great when performance isn't critical and readability is more important than reuse.

🛑 Avoid subqueries when:

- The logic gets nested or involves multiple joins. It quickly becomes unreadable.
- The same logic is reused across different queries. You’ll end up copy-pasting.
- You want to debug part of the logic. Subqueries can be hard to isolate and test.

### ✅ Use a **View** when:

- Use views to **abstract complex joins and logic** that you want to reuse in multiple places.
- They help **decouple raw data structure from how it's queried**, especially in analytics and reporting.
- Views can **limit access to sensitive columns** or internal logic, making them useful for data security and permissions.

🛑 Avoid views when:

- The logic is only used in one place. A CTE might be simpler and more localized.
- You're building views **on top of other views**. This leads to dependency hell, performance issues, and hard-to-debug logic.
- Your team is managing views collaboratively, and people start nesting them. It becomes messy fast, and hard to know where logic lives.

### ✅ Use a **CTE** when:

- Perfect when you want to **break down a complex query into multiple readable steps**.
- Lets you **reuse intermediate results** within the same query without repetition.
- Easier to **debug**, since you can test or comment out one step at a time.
- CTEs support **recursion**, which is useful for hierarchical data or generating sequences.

🛑 Avoid CTEs for cross-query reuse, use views instead.

**Bonus**: Use a CTE when you’re building logic that might later be promoted to a view, but you're not ready yet. It keeps things flexible 😉.

---

## 🏪 Real-World Example: E-commerce Analytics

Let's see how you might use all three approaches for the same business problem:

**Problem**: Find customers who spent more than $500 in the last 3 months, with their total spend and order count.

### As a Subquery (Simple but limited):

```sql
SELECT
  c.name,
  c.email,
  (SELECT COUNT(*) FROM orders WHERE customer_id = c.id) as order_count,
  (SELECT SUM(total_amount) FROM orders WHERE customer_id = c.id) as total_spent
FROM customers c
WHERE c.id IN (
  SELECT customer_id
  FROM orders
  WHERE order_date >= DATE_SUB(CURDATE(), INTERVAL 3 MONTH)
  GROUP BY customer_id
  HAVING SUM(total_amount) > 500
);
```

### As a View (Reusable across reports):

```sql
CREATE VIEW vw_customer_analytics AS
SELECT
  c.id,
  c.name,
  c.email,
  COUNT(o.id) as order_count,
  SUM(o.total_amount) as total_spent,
  MAX(o.order_date) as last_order_date
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id
GROUP BY c.id, c.name, c.email;

-- Then query it:
SELECT * FROM vw_customer_analytics
WHERE total_spent > 500
AND last_order_date >= DATE_SUB(CURDATE(), INTERVAL 3 MONTH);
```

### As a CTE (Complex multi-step logic):

```sql
WITH customer_totals AS (
  SELECT
    customer_id,
    COUNT(*) as order_count,
    SUM(total_amount) as total_spent
  FROM orders
  WHERE order_date >= DATE_SUB(CURDATE(), INTERVAL 3 MONTH)
  GROUP BY customer_id
  HAVING SUM(total_amount) > 500
),
customer_details AS (
  SELECT
    c.id,
    c.name,
    c.email,
    ct.order_count,
    ct.total_spent
  FROM customers c
  JOIN customer_totals ct ON c.id = ct.customer_id
)
SELECT * FROM customer_details
ORDER BY total_spent DESC;
```

---

## 🧠 : Conclusion

There’s no one-size-fits-all answer, it depends on what you’re trying to achieve:

> Use a **subquery** for _one-off, simple logic inside another query_.
> Use a **view** to _abstract and reuse logic across multiple queries_.
> Use a **CTE** to _break down complex queries into smaller, more manageable parts_.

---

Let me know what you'd like covered next!
