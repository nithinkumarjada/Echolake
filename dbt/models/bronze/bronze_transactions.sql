select
    transaction_id,
    account_id,
    customer_id,
    merchant_name,
    transaction_ts,
    cast(amount as decimal(18, 2)) as amount,
    currency,
    channel,
    status,
    cast(is_high_risk as boolean) as is_high_risk,
    ingestion_date,
    loaded_at
from {{ source('raw', 'bronze_transactions') }}
