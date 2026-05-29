{% macro iceberg_time_travel(table_name, timestamp_literal) %}
    select *
    from {{ table_name }} for timestamp as of timestamp {{ timestamp_literal }}
{% endmacro %}
