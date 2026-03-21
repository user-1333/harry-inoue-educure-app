-- DELETE FROM approval_status ;
-- DELETE FROM roles ;
-- DELETE FROM leave_type ;
INSERT INTO approval_status (id,status) VALUES (1,'pending'), (2,'approved'), (3,'rejected');
INSERT INTO roles (id,name) VALUES (1,'ADMIN'), (2,'MANAGER'), (3,'EMPLOYEE');
INSERT INTO leave_type (id,name) VALUES (1,'Paid Leave'),
                                        (2,'Sick Leave'),
                                        (3,'Unpaid Leave'),
                                        (4,'Maternity Leave'),
                                        (5,'Paternity Leave'),
                                        (6,'Bereavement Leave'),
                                        (7,'Compensatory Leave'),
                                        (8,'Study Leave');