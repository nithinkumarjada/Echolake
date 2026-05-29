#!/usr/bin/env python3
"""Generate deterministic synthetic financial transactions for EchoLake."""

from __future__ import annotations

import argparse
import csv
import random
from datetime import datetime, timedelta, timezone
from pathlib import Path
from uuid import uuid4


MERCHANTS = ["Atlas Energy", "Bluefin Market", "Cedar Health", "Delta Travel", "Evergreen Cloud"]
CHANNELS = ["card_present", "card_not_present", "ach", "wire", "mobile_wallet"]
CURRENCIES = ["USD", "USD", "USD", "EUR", "GBP"]
STATUSES = ["posted", "posted", "posted", "pending", "reversed"]


def build_row(index: int, start: datetime) -> dict[str, str]:
    event_time = start + timedelta(minutes=index * random.randint(1, 9))
    amount = round(random.lognormvariate(3.2, 0.9), 2)
    status = random.choice(STATUSES)
    return {
        "transaction_id": str(uuid4()),
        "account_id": f"acct_{random.randint(10000, 99999)}",
        "customer_id": f"cust_{random.randint(1000, 9999)}",
        "merchant_name": random.choice(MERCHANTS),
        "transaction_ts": event_time.isoformat(),
        "amount": f"{amount:.2f}",
        "currency": random.choice(CURRENCIES),
        "channel": random.choice(CHANNELS),
        "status": status,
        "is_high_risk": str(amount > 500 or status == "reversed").lower(),
        "ingestion_date": event_time.date().isoformat(),
    }


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument("--rows", type=int, default=1000)
    parser.add_argument("--output", default="data/raw/transactions.csv")
    args = parser.parse_args()

    random.seed(42)
    output = Path(args.output)
    output.parent.mkdir(parents=True, exist_ok=True)
    start = datetime(2026, 1, 1, tzinfo=timezone.utc)
    rows = [build_row(i, start) for i in range(args.rows)]

    with output.open("w", newline="", encoding="utf-8") as handle:
      writer = csv.DictWriter(handle, fieldnames=list(rows[0].keys()))
      writer.writeheader()
      writer.writerows(rows)

    print(f"Wrote {len(rows)} rows to {output}")


if __name__ == "__main__":
    main()
