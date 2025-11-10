-- FuelEU Maritime Database Schema
-- This file creates all tables needed for the application

-- Drop existing tables (for fresh setup)
DROP TABLE IF EXISTS pool_members CASCADE;
DROP TABLE IF EXISTS pools CASCADE;
DROP TABLE IF EXISTS bank_entries CASCADE;
DROP TABLE IF EXISTS ship_compliance CASCADE;
DROP TABLE IF EXISTS routes CASCADE;

-- Table 1: Routes
CREATE TABLE routes (
    id SERIAL PRIMARY KEY,
    route_id VARCHAR(50) NOT NULL UNIQUE,
    vessel_type VARCHAR(100) NOT NULL,
    fuel_type VARCHAR(50) NOT NULL,
    year INTEGER NOT NULL,
    ghg_intensity NUMERIC(10, 2) NOT NULL,
    fuel_consumption NUMERIC(10, 2) NOT NULL,
    distance_km NUMERIC(10, 2) NOT NULL,
    total_emissions NUMERIC(10, 2) NOT NULL,
    is_baseline BOOLEAN NOT NULL DEFAULT FALSE
);

-- Indexes for routes table
CREATE INDEX idx_routes_vessel_type ON routes(vessel_type);
CREATE INDEX idx_routes_fuel_type ON routes(fuel_type);
CREATE INDEX idx_routes_year ON routes(year);
CREATE INDEX idx_routes_is_baseline ON routes(is_baseline);

-- Table 2: Ship Compliance
CREATE TABLE ship_compliance (
    id SERIAL PRIMARY KEY,
    ship_id VARCHAR(100) NOT NULL,
    year INTEGER NOT NULL,
    cb_gco2eq NUMERIC(15, 2) NOT NULL,
    UNIQUE(ship_id, year)
);

CREATE INDEX idx_ship_compliance_ship_year ON ship_compliance(ship_id, year);

-- Table 3: Bank Entries
CREATE TABLE bank_entries (
    id SERIAL PRIMARY KEY,
    ship_id VARCHAR(100) NOT NULL,
    year INTEGER NOT NULL,
    amount_gco2eq NUMERIC(15, 2) NOT NULL
);

CREATE INDEX idx_bank_entries_ship_id ON bank_entries(ship_id);
CREATE INDEX idx_bank_entries_ship_year ON bank_entries(ship_id, year);

-- Table 4: Pools
CREATE TABLE pools (
    id SERIAL PRIMARY KEY,
    year INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_pools_year ON pools(year);

-- Table 5: Pool Members
CREATE TABLE pool_members (
    id SERIAL PRIMARY KEY,
    pool_id INTEGER NOT NULL REFERENCES pools(id) ON DELETE CASCADE,
    ship_id VARCHAR(100) NOT NULL,
    cb_before NUMERIC(15, 2) NOT NULL,
    cb_after NUMERIC(15, 2) NOT NULL
);

CREATE INDEX idx_pool_members_pool_id ON pool_members(pool_id);
CREATE INDEX idx_pool_members_ship_id ON pool_members(ship_id);
