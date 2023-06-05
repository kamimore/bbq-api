DROP TYPE category_item_type CASCADE;

create type category_item_type as (
	BaseUnitOfMeasure text,
	Category text,
	Code text,
	Description text,
	Division text,
	DivisionCode text,
	ItemCategoryCode text,
	ItemName text,
	ItemNo text,
	SuperCategory text,
    tax numeric(10, 2)
);

