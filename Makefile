.PHONY: sample validate check

sample:
	python3 scripts/generate_synthetic_finance.py --rows 1000 --output data/raw/transactions.csv

validate:
	python3 scripts/validate_project.py

check: sample validate
