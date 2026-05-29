select
    ingestion_date,
    currency,
    count(*) as transaction_count,
    sum(amount) as gross_transaction_amount,
    avg(amount) as average_transaction_amount,
    sum(case when is_high_risk then 1 else 0 end) as high_risk_transaction_count,
    sum(case when status = 'posted' then amount else 0 end) as posted_amount,
    sum(case when status = 'reversed' then amount else 0 end) as reversed_amount
from {{ ref('silver_transactions') }}
group by 1, 2
