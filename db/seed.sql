INSERT INTO department (dept_name)
VALUES ("Heaven"),
        ("Hell"),
        ("Men of Letters"),
        ("No Body Cares");

INSERT INTO roles (title, salary, department_id)
VALUES ("King of Hell", 666, 2),
        ("Hunter", 100, 3),
        ("Prophet", 50000, 1),
        ("Demon", 1000000, 2),
        ("Writer", 25000, 1),
        ("Lucifer's Vessel", 500, 3),
        ("Michael's Vessel", 350, 3);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("John", "Winchester",2),
        ("Dean", "Winchester",7),
        ("Sam", "Winchester",6),
        ("Crowley", "Crowley",1),
        ("Bobby", "Singer",2),
        ("Chuck", "Shurley",1),
        ("Kevin", "Tran",3);

UPDATE employee
SET manager_id = 5
WHERE id = 1;