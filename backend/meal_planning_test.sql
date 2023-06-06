\echo 'Delete and recreate meal_planning_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

-- Drop the test database if it exists
DROP DATABASE IF EXISTS meal_planning_test;

-- Create the test database
CREATE DATABASE meal_planning_test;

-- Connect to the test database
\connect meal_planning_test

-- Execute the necessary SQL statements to set up the test schema
\i meal_planning_schema_test.sql
