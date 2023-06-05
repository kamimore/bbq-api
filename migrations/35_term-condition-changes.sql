ALTER TABLE public."mst_term-condition" DROP COLUMN description;

ALTER TABLE public."mst_term-condition" ADD COLUMN is_deleted boolean;
	
