-- PROBLEM 1
SELECT email FROM customers;
-- PROBLEM 2
SELECT a.id FROM orders a WHERE a.customer_id = (SELECT id FROM customers WHERE fname = 'Elizabeth' AND lname = 'Crocker');
-- PROBLEM 3
SELECT SUM(num_cupcakes) num_cupcakes FROM orders WHERE processed = 'f';
-- PROBLEM 4
SELECT cupcakes.name, SUM(orders.num_cupcakes) FROM cupcakes LEFT JOIN orders ON cupcakes.id = orders.cupcake_id GROUP BY cupcakes.name ORDER BY cupcakes.name;
-- PROBLEM 5
SELECT a.email, SUM(b.num_cupcakes) FROM customers a, orders b WHERE a.id = b.customer_id GROUP BY a.email ORDER BY SUM(b.num_cupcakes) DESC;
-- PROBLEM 6
SELECT fname, lname, email FROM customers WHERE id = (SELECT customer_id FROM orders WHERE processed = 't' AND cupcake_id = 5 GROUP BY customer_id);