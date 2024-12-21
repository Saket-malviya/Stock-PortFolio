/*
  # Create stocks table

  1. New Tables
    - `stocks`
      - `id` (uuid, primary key)
      - `name` (text)
      - `ticker` (text)
      - `quantity` (integer)
      - `buy_price` (decimal)
      - `current_price` (decimal, nullable)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `stocks` table
    - Add policies for authenticated users to manage their stocks
*/

CREATE TABLE IF NOT EXISTS stocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  ticker text NOT NULL,
  quantity integer NOT NULL CHECK (quantity >= 0),
  buy_price decimal(10,2) NOT NULL CHECK (buy_price >= 0),
  current_price decimal(10,2),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE stocks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read their stocks"
  ON stocks
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert their stocks"
  ON stocks
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update their stocks"
  ON stocks
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Users can delete their stocks"
  ON stocks
  FOR DELETE
  TO authenticated
  USING (true);