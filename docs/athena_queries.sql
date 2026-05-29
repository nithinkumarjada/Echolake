-- Time-travel query against an Apache Iceberg table.
select *
from bronze_transactions for timestamp as of timestamp '2026-01-01 00:00:00 UTC'
limit 100;

-- Daily finance KPIs.
select
  ingestion_date,
  currency,
  transaction_count,
  gross_transaction_amount,
  high_risk_transaction_count
from gold_daily_finance_kpis
order by ingestion_date desc, currency;

-- Account risk leaderboard.
select *
from gold_account_risk
order by high_risk_events desc, total_amount desc
limit 50;
