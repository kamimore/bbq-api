CREATE OR REPLACE PROCEDURE usp_import_item(IN allItems category_item_type[], IN uniqueItemCategory category_item_type[], IN uniqueProductGroup category_item_type[])
LANGUAGE plpgsql
AS $$
DECLARE
	item category_item_type;
	mstCategoryId int;
	mstItemCategoryId int;
	mstProductGroupId int;
	mstItemId int;
BEGIN
	FOREACH item IN ARRAY uniqueItemCategory
		LOOP
			SELECT id FROM "mst_category" WHERE code = item.DivisionCode LIMIT 1 INTO mstCategoryId;
			SELECT id FROM "mst_item_category" WHERE code = item.ItemCategoryCode LIMIT 1 INTO mstItemCategoryId;
			RAISE NOTICE '%, %', mstCategoryId, mstItemCategoryId;
			IF mstItemCategoryId IS NULL THEN
				INSERT INTO "mst_item_category" (
					code, name, category_id, created_at, updated_at)
				VALUES (item.ItemCategoryCode, item.Category, mstCategoryId, current_timestamp, current_timestamp);
			END IF;
		END LOOP;
	FOREACH item IN ARRAY uniqueProductGroup
		LOOP
			SELECT id FROM "mst_item_category" WHERE code = item.ItemCategoryCode LIMIT 1 INTO mstItemCategoryId;
			SELECT id FROM "mst_product_group" WHERE code = item.Code LIMIT 1 INTO mstProductGroupId;
			RAISE NOTICE '%, %', mstItemCategoryId, mstProductGroupId;
			IF mstProductGroupId IS NULL THEN
				INSERT INTO "mst_product_group" (
					code, name, item_category_id, created_at, updated_at)
				VALUES (item.Code, item.Description, mstItemCategoryId, current_timestamp, current_timestamp);
			END IF;
		END LOOP;
	FOREACH item IN ARRAY allItems
		LOOP
			SELECT id FROM "mst_product_group" WHERE code = item.Code LIMIT 1 INTO mstProductGroupId;
			SELECT id FROM "mst_item" WHERE code = item.ItemNo AND unit = item.BaseUnitOfMeasure LIMIT 1 INTO mstItemId;
			RAISE NOTICE '%, %', mstProductGroupId, mstItemId;
			IF mstItemId IS NULL THEN
				INSERT INTO "mst_item" (
					code, name, unit, product_group_id, tax, created_at, updated_at)
				VALUES (item.ItemNo, item.ItemName, item.BaseUnitOfMeasure, mstProductGroupId, item.tax, current_timestamp, current_timestamp);
			ELSE
				UPDATE "mst_item" SET code = item.ItemNo, name = item.ItemName, unit = item.BaseUnitOfMeasure,
                product_group_id = mstProductGroupId, tax = item.tax, updated_at = current_timestamp
				WHERE id = mstItemId;
			END IF;
		END LOOP;
END
$$;
