
CREATE TABLE public.farm_plots (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  plot_index integer NOT NULL CHECK (plot_index >= 0 AND plot_index < 9),
  item_id text NOT NULL,
  item_type text NOT NULL DEFAULT 'seed',
  growth integer NOT NULL DEFAULT 0,
  max_growth integer NOT NULL DEFAULT 5,
  planted_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE (user_id, plot_index)
);

ALTER TABLE public.farm_plots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can CRUD own farm plots"
ON public.farm_plots FOR ALL
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);
