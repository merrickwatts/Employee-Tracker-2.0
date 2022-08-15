USE employees_db;
INSERT INTO departments (name)
VALUES ('Garden'),
  ('Furniture'),
  ('Tools');
INSERT INTO roles (title, salary, department_id)
VALUES ('Sales', 32.000, 2),
  ('Cashier', 17.000, 1),
  ('Returns', 22.000, 2),
  ('Management', 60.000, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Virginia', 'Woolf', 4, NULL),
  ('Piers', 'Gaveston', 2, 1),
  ('Charles', 'LeRoi', 2, 1),
  ('Katherine', 'Mansfield', 4, NULL),
  ('Dora', 'Carrington', 3, 4),
  ('Edward', 'Bellamy', 3, 4),
  ('Montague', 'Summers', 4, NULL),
  ('Octavia', 'Butler', 1, 7),
  ('Unica', 'Zurn', 1, 7);