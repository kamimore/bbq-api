CREATE OR REPLACE PROCEDURE usp_user_create(IN arr user_insertion_type[])
LANGUAGE plpgsql
AS $$
DECLARE
	i user_insertion_type;
	currentUserId int;
BEGIN
	FOREACH i IN ARRAY arr
		LOOP
			SELECT id FROM "user" WHERE employee_code = i.employeeCode INTO currentUserId;
			RAISE NOTICE '%, %', i.employeeCode, currentUserId;
			IF currentUserId IS NULL THEN
				INSERT INTO "user"(
					employee_code, full_name, user_name, phone, role_id, user_type, created_at, updated_at)
				VALUES (i.employeeCode, i.fullName, i.userName, i.phone, i.roleId, 'employee', current_timestamp, current_timestamp);
			ELSE
				UPDATE "user" SET
					employee_code = i.employeeCode, full_name = i.fullName,
					user_name = i.userName, phone = i.phone,
					updated_at = current_timestamp
				WHERE id = currentUserId;
			END IF;
		END LOOP;
END
$$;