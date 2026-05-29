select
    account_id,
    count(*) as transaction_count,
    sum(amount) as total_amount,
    sum(case when is_high_risk then 1 else 0 end) as high_risk_events,
    max(transaction_ts) as latest_transaction_ts
from {{ ref('silver_transactions') }}
group by 1
