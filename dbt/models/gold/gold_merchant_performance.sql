select
    merchant_name,
    currency,
    count(*) as transaction_count,
    sum(amount) as total_amount,
    avg(amount) as average_amount,
    sum(case when status = 'posted' then 1 else 0 end) as posted_transactions
from {{ ref('silver_transactions') }}
group by 1, 2
