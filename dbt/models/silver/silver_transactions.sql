with ranked as (
    select
        *,
        row_number() over (
            partition by transaction_id
            order by loaded_at desc
        ) as row_number
    from {{ ref('bronze_transactions') }}
),

cleaned as (
    select
        transaction_id,
        account_id,
        customer_id,
        merchant_name,
        transaction_ts,
        amount,
        upper(currency) as currency,
        lower(channel) as channel,
        lower(status) as status,
        is_high_risk,
        ingestion_date,
        loaded_at
    from ranked
    where row_number = 1
      and transaction_id is not null
      and account_id is not null
      and amount >= 0
)

select * from cleaned
